import { WelcomePage } from './../welcome/welcome';
import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'clientelogin.html',
})
export class ClienteLoginPage {
  signinForm: FormGroup;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authService: AuthServiceProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    this.authService.signinWithEmail(this.signinForm.value).then(
      (isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }
    ).catch(
      (error: any) => {
        loading.dismiss();
        this.showAlert(error);
      });
  }

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage).then(
      (hasAccess: boolean) => {
        console.log('Autorizado : ', hasAccess);
      }
    ).catch(err => {
      console.log('Não Autorizado : ', err);
    });
  }


  onLogout(): void {
    this.authService.logout();
  }

}
