import { WelcomePage } from './../welcome/welcome';
import { HomePage } from './../home/home';
import { Observable } from 'rxjs';
import { FirebaseAuthState } from 'angularfire2';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { UserServiceProvider } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';

/**
* Generated class for the SignupPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  signupForm: FormGroup
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }



  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    formUser.photo = '';
    //this.userService.userExists(username).take(1).subscribe(

    this.userService.userExists(username).first().subscribe(
      (userExists: boolean) => {
        if (!userExists) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
            delete formUser.password;
            let uuid: string = authState.auth.uid;
            this.userService.create(formUser, uuid).then(() => {
              console.log('usuario cadastrado');
              this.navCtrl.setRoot(HomePage);
              loading.dismiss();
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });

          });
          console.log("testando form");
        } else {
          this.showAlert('o username já está sendo utilizado em outra conta');
          loading.dismiss();
        }
      });

  }//fim do método onSubmit

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }


  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    return loading;
  }



}
