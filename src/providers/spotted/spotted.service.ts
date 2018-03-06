import { Spotted } from './../../models/spotted.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { ApiAiClient } from 'api-ai-javascript';
import { environment } from './../environment';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the SpottedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SpottedServiceProvider extends BaseService {
  spotteds: FirebaseListObservable<Spotted[]>;
  currentSpotted: FirebaseObjectObservable<Spotted>;


  constructor(public af: AngularFire, public http: Http, @Inject(FirebaseApp) public firebaseApp: any) {
    super();
    console.log('Hello SpottedProvider Provider');
    this.setSpotteds();
  }


  getAllSpotteds(): FirebaseListObservable<Spotted[]>{
    return <FirebaseListObservable<Spotted[]>> this.af.database.list(`spotteds`,{
      query :{
        orderByChild: 'timestamp',
        //limita o numero de mensagens que ira aparecer na tela
      }
    }).catch(this.handleObservableError); 
    }


    private setChats(): void {
      this.spotteds = <FirebaseListObservable<Spotted[]>>this.af.database.list(`spotteds`, {
              query: {
                orderByChild: 'timestamp'
              }
            }).map((spotteds: Spotted[]) => {
              return spotteds.reverse();
            }).catch(this.handleObservableError);
    }





  getSpotteds(userId1: string): FirebaseListObservable<Spotted[]>{
    return <FirebaseListObservable<Spotted[]>> this.af.database.list(`/spotteds/${userId1}`,{
      query :{
        orderByChild: 'timestamp',
        //limita o numero de mensagens que ira aparecer na tela
      }
    }).catch(this.handleObservableError); 
    }
    /*
    create(spotted : Spotted, listMessages : FirebaseListObservable<Spotted[]>,userId:string): firebase.Promise<void>{
      return listMessages.push(spotted).catch(this.handlePromiseError);
    }
*/
    create(spotted: Spotted): firebase.Promise<void> {
      return this.af.database.list(`/spotteds`).push(spotted).catch(this.handlePromiseError);
    }




//  create(spotted: Spotted, userId: string): firebase.Promise<void> {
 
    //return this.af.database.object(`/chats/${userId1}/${userId2}`).set(chat).catch(this.handlePromiseError);

   //    return this.af.database.object(`/spotteds/${userId}`).set(spotted).catch(this.handlePromiseError);
 // }







edit(spotted:{titulo:string,conteudo:string,photo:string}) : firebase.Promise<void>{
  return this.currentSpotted.update(spotted).catch(this.handlePromiseError);
}
delete(spotted:Spotted,/*userId:string*/) : firebase.Promise<void>{
  return this.af.database.object(`/spotteds/${spotted.$key}`).remove().catch(this.handlePromiseError);
}
uploadPhoto(file:File,userId:string) :firebase.storage.UploadTask {
  return this.firebaseApp.storage().ref().child(`/spotteds/${userId}`).put(file);
}

  /*
  getDeepSpotted(userId1: string): FirebaseObjectObservable<Spotted> {
    return <FirebaseObjectObservable<Spotted>>this.af.database
      .object(`/spotteds/${userId1}/${userId2}`)
      .catch(this.handleObservableError);
  }
  */
  private setSpotteds(): void {
    this.af.auth.subscribe(
      (authState: FirebaseAuthState) => {
        if (authState) {
          this.spotteds = <FirebaseListObservable<Spotted[]>>this.af.database.list(`/spotteds`, {
            query: {
              orderByChild: 'timestamp'
            }
          }).map((spotteds: Spotted[]) => {
            return spotteds.reverse();
          }).catch(this.handleObservableError);
        }
      }
    );
  }
  updatePhoto(spotted: FirebaseObjectObservable<Spotted>, spottedPhoto: string, recipientUserPhoto: string): firebase.Promise<boolean> {
    if (spottedPhoto != recipientUserPhoto) {
      return spotted.update({
        photo: recipientUserPhoto
      }).then(() => {
        return true;
      }).catch(this.handlePromiseError);
    }
    return Promise.resolve(false);
  }


}

