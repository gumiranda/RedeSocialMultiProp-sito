import { User } from './../../models/user.model';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';

//import * as firebase from 'firebase';
/*
  Generated class for the UserProvider provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider extends BaseService {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(public af: AngularFire,
    /*@Inject(FirebaseApp) public firebaseApp: firebase.app.App*/
    @Inject(FirebaseApp) public firebaseApp: any,  public http: Http) {
    super();
    // nao precisa mais   this.users = this.af.database.list(`/users`);
    this.listenAuthState();
    console.log('Hello UserProvider Provider');
  }

  private listenAuthState(): void {
    this.af.auth.subscribe(
      (authState: FirebaseAuthState) => {
        if (authState) {
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
          this.setUsers(authState.auth.uid);
        }
      }
    );
  }

  private setUsers(uidToExclude: string): void {
    this.users = <FirebaseListObservable<User[]>>this.af.database.list(`users`, {
      query: {
        orderByChild: 'name'
      }
    }).map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  get(userId: string): FirebaseObjectObservable<User> {
    return <FirebaseObjectObservable<User>>this.af.database.object(`/users/${userId}`)
      .catch(this.handleObservableError);
  }

  create(user: User, uuid: string): firebase.Promise<void> {
    //   return this.af.database.list(`/users`).push(user);
    //return this.users.push(user); 
    return this.af.database.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }
edit(user:{name:string,username:string,photo:string}) : firebase.Promise<void>{
  return this.currentUser.update(user).catch(this.handlePromiseError);
}

uploadPhoto(file:File,userId:string) :firebase.storage.UploadTask {
  return this.firebaseApp.storage().ref().child(`/users/${userId}`).put(file);
}

  /* // OUTRO MODO DE FAZER
  ref = firebase.database().ref('users/');
  
  create(user:User) {
   let newData = this.ref.push();
   newData.set(user);
  }
  
  
  */
  userExists(username: string): Observable<boolean> {
    return this.af.database.list(`/users`, {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }
}
