import { SpottedServiceProvider } from './../../providers/spotted/spotted.service';
import { BotchatPage } from './../botchat/botchat';
import { ChatServiceProvider } from './../../providers/chat/chat.service';
import { Chat } from './../../models/chat.model';
import { ChatPage } from './../chat/chat';
import { WelcomePage } from './../welcome/welcome';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from './../../models/user.model';
import { UserServiceProvider } from './../../providers/user/user.service';
import { FirebaseListObservable } from 'angularfire2';
import { HttpModule } from '@angular/http';
import firebase from 'firebase';
import 'rxjs/add/operator/first';
import { Spotted } from '../../models/spotted.model';
import { SpottedPage } from '../spotted/spotted';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  chats: FirebaseListObservable<Chat[]>;
  users: FirebaseListObservable<User[]>;
  spotteds: FirebaseListObservable<Spotted[]>;

  view: string = 'spotteds';

  constructor(public menuCtrl: MenuController, public spottedService:SpottedServiceProvider,public chatService: ChatServiceProvider, public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;
    this.users = this.userService.users;
//    this.spotteds = this.spottedService.getAllSpotteds();
this.spotteds = this.spottedService.spotteds;  
console.log(this.spotteds);
    this.menuCtrl.enable(true, 'user-menu');
    console.log(this.chats);
    console.log('oxi');

  }
  onChatCreate(recipientUser: User): void {
    this.userService.currentUser.first().subscribe(
      (currentUser: User) => this.chatService.getDeepChat(currentUser.$key, recipientUser.$key).
        first().subscribe((chat: Chat) => {
          console.log("username do recipient user", recipientUser);

          if (chat.hasOwnProperty(`$value`)) {
            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;
            let chat1 = new Chat('', timestamp, recipientUser.name, '');
            this.chatService.create(chat1, currentUser.$key, recipientUser.$key);
            let chat2 = new Chat('', timestamp, currentUser.name, '');
            this.chatService.create(chat1, recipientUser.$key, currentUser.$key);
          }
        })
    )
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }



  onLogout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(WelcomePage);
  }
  openSpotted() : void{
    this.navCtrl.push(SpottedPage);
    console.log('Your message here');

  }
  openChatBot() : void{
    this.navCtrl.push(BotchatPage);
  }
  
  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;
    console.log(searchTerm);
    this.chats = this.chatService.chats;
    this.users = this.userService.users;
    this.spotteds = this.spottedService.spotteds;
    if (searchTerm) {
      switch (this.view) {
        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>>this.chats.map(
            (chats: Chat[]) => {
              return chats.filter(
                (chat: Chat) => {
                  return (chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
                });
            });
          break;
        case 'users':
          this.users = <FirebaseListObservable<User[]>>this.users.map(
            (users: User[]) => {
              return users.filter(
                (user: User) => {
                  return (user.name.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
                });
            });
          break;
          case 'spottteds':
          this.spotteds = <FirebaseListObservable<Spotted[]>>this.spotteds.map(
            (spotteds: Spotted[]) => {
              return spotteds.filter(
                (spotted: Spotted) => {
                  return (spotted.conteudo.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
                });
            });
          break;
      }
    }
  }


  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;
    this.userService.get(recipientUserId).first().subscribe(
      (user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });
      }
    );
  }

  onSpottedOpen(spotted: Spotted): void {
    let recipientUserId: string = spotted.$key;
    this.userService.get(recipientUserId).first().subscribe(
      (user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });
      }
    );
  }
}
