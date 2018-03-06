import { BotchatPage } from './../botchat/botchat';
import { SignupPage } from './../signup/signup';
import { HomePage } from './../home/home';
import { ProfissionalLoginPage } from './../profissionalLogin/profissionallogin';
import { ClienteLoginPage } from './../clienteLogin/clientelogin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule } from '@angular/http'; 

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
irCliente() : void{
  this.navCtrl.push(ClienteLoginPage);
}
irChatBot() : void{
  this.navCtrl.push(BotchatPage);
}
irCadastro() : void{
  this.navCtrl.push(SignupPage);
}
irHome() : void{
  this.navCtrl.push(HomePage);
}
irProfissional() : void{
  this.navCtrl.push(ProfissionalLoginPage);
}
}
