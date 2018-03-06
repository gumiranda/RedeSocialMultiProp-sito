import { Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from '../base.service';
import { Message } from '../../models/message.model';
import { BehaviorSubject, Subject } from 'rxjs';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessageServiceProvider extends BaseService {
private nbObjects: BehaviorSubject<any> = new BehaviorSubject<any>(33);
//public nbObjects: Subject<any>;
  
constructor(public http: Http,public af : AngularFire){//public platform:Platform) {
    super();
/*    this.platform.ready().then(() => {
		  this.nbObjects.next(40);
		});
  */
      this.nbObjects.next(this.nbObjects.getValue() + 2);
  }
  loadMoreObjects() : void {
		this.nbObjects.next(this.nbObjects.getValue() + 15); 
	}
getMessages(userId1: string,userId2:string): FirebaseListObservable<Message[]>{
return <FirebaseListObservable<Message[]>> this.af.database.list(`/messages/${userId1}-${userId2}`,{
  query :{
    orderByChild: 'timestamp',
    limitToLast : this.nbObjects  //limita o numero de mensagens que ira aparecer na tela
  }
}).catch(this.handleObservableError); 
}

create(message : Message, listMessages : FirebaseListObservable<Message[]>): firebase.Promise<void>{
  return listMessages.push(message).catch(this.handlePromiseError);
}


}
