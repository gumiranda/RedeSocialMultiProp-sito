import { ChatServiceProvider } from './../../providers/chat/chat.service';
import { Chat } from './../../models/chat.model';
import { MessageServiceProvider } from './../../providers/message/message.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { User } from './../../models/user.model';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user/user.service';
import { Message } from '../../models/message.model';
import firebase from 'firebase';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
/*
 <ion-infinite-scroll (ionInfinite) = "doInfinite($event)">
    <ion-infinite-scroll-content> 
      </ion-infinite-scroll-content>
  </ion-infinite-scroll>
*/
export class ChatPage {
  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  scrou : number = 8;
  podeir:number = 1;
  @ViewChild(Content) content :Content;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;
  recipient: User;
  constructor(public menuCtrl:MenuController,public chatService: ChatServiceProvider, public messageService: MessageServiceProvider, public userService: UserServiceProvider, public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  /*
       <message-box  *ngFor="let m of messages | async" [message]="m" [isFromSender]="(m.userId == sender.$key)">{{m.text}}
       </message-box>
  */
  ionViewWillLeave() {
    this.menuCtrl.enable(true,'user-menu');
  }
  ionViewDidLoad() {
    this.menuCtrl.enable(false,'user-menu');

    console.log('ionViewDidLoad ChatPage');
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser: User) => {
      this.sender = currentUser;
      
      this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
      this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);
this.chat1.first().subscribe((chat:Chat)=>{
  this.chatService.updatePhoto(this.chat1,chat.photo,this.recipient.photo);
});
      

      let doSubscription = () =>{
        this.messages.subscribe((messages:Message[])=>{
           this.scrollToBottom();          
          });
      };
    
     
      this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);
      this.messages.first().subscribe((messages: Message[]) => {
        if (messages.length === 0) {
          this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
        doSubscription();
          
        }
        else{
            doSubscription();
            }
      });
    });
//    this.scrou = 1;

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }
  sendMessage(newMessage: string): void {
    console.log(newMessage);
    if (newMessage) {
      console.log(newMessage);
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      console.log(this.messages);

      this.messageService.create(new Message(this.sender.$key, newMessage, currentTimestamp), this.messages).
      then(
        () =>{
          this.chat1.update({
            lastMessage : newMessage,
            timestamp: currentTimestamp
          });
          this.chat2.update({
            lastMessage : newMessage,
            timestamp: currentTimestamp
          });
        });
      console.log(this.messages);

    }
  }

  private scrollToBottom(duration ?:number):void{
    setTimeout(()=>{
      if(this.content._scroll){
        this.content.scrollToBottom(duration || 0);
      }
    },50);
  }
  private scrollToTop(duration ?:number):void{
    setTimeout(()=>{
      if(this.content._scroll){
        this.content.scrollToTop(duration || 0);
      }
    },50);
  }

 
  
 doInfinite(infiniteScroll) {


  if(infiniteScroll){
   
		setTimeout(() => {
   
  this.userService.currentUser.first().subscribe((currentUser: User) => {
    this.sender = currentUser;
    this.messageService.loadMoreObjects();
    this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);
    this.messages.first().subscribe((messages: Message[]) => {
  if (messages.length === 0) {
    this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
  }
  else{
  }
});
});

      infiniteScroll.complete();
		}, 900);
  }     

}
  
/*
      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
</ion-infinite-scroll>

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
      

        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }
  */

/*
doInfinite(infiniteScroll){
  setTimeout(()=>{
   
    infiniteScroll.complete();
  },500);
}
*/
}
