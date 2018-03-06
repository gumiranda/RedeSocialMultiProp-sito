import { SpottedServiceProvider } from './../../providers/spotted/spotted.service';
import { WelcomePage } from './../welcome/welcome';
import { HomePage } from './../home/home';
import { Observable } from 'rxjs';
import { FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { UserServiceProvider } from './../../providers/user/user.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import firebase from 'firebase';
import { HttpModule } from '@angular/http';
import { User } from '../../models/user.model';
import { Spotted } from '../../models/spotted.model';
/**
* Generated class for the SpottedPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
  selector: 'page-spotted',
  templateUrl: 'spotted.html',
})
export class SpottedPage {
  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  spottedForm: FormGroup;
  currentUser: User;
  private filePhoto: File;
  uploadProgress: number;
  spotted: Spotted;
  spotteds: FirebaseListObservable<Spotted[]>;


  constructor(public loadingCtrl: LoadingController,
    public cd: ChangeDetectorRef,
    public spottedService: SpottedServiceProvider,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.spottedForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      conteudo: ['', [Validators.required, Validators.minLength(10)]]
    });

  }
  openSpotted(): void {

  }
  ionViewDidLoad() {
    this.userService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    )
    console.log('ionViewDidLoad SpottedPage');
  }



  onSubmit(): void {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      let photo:string = '';
      let loading: Loading = this.showLoading();
      let formSpotted = this.spottedForm.value;
      let usernameId: string = this.currentUser.$key;
      let titulo: string = formSpotted.titulo;
      let conteudo: string = formSpotted.conteudo;
      this.spotted = new Spotted(titulo, conteudo,photo,this.currentUser.$key,this.currentUser.name,this.currentUser.photo,currentTimestamp);
      //this.spotteds = this.spottedService.getSpotteds(this.currentUser.$key);
     // this.spotteds = this.spottedService.getAllSpotteds();
//      this.spottedService.create(this.spotted,this.spotteds,usernameId).then(() => {
  this.spottedService.create(this.spotted).then(() => {
console.log('spotted criado');
        this.filePhoto = undefined;
        this.uploadProgress = 0;
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
      console.log("testando form");
      //   this.editSpotted();

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