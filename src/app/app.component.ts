import { FirebaseAuthState } from 'angularfire2';
import { AuthServiceProvider } from './../providers/auth/auth.service';
import { User } from './../models/user.model';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user/user.service';

/*
const config = {
  apiKey: "AIzaSyDBQl4HG_lqovYTg-ATndA3Co4JnUdoyiM",
  authDomain: "spottedagrvai.firebaseapp.com",
  databaseURL: "https://spottedagrvai.firebaseio.com",
  projectId: "spottedagrvai",
  storageBucket: "spottedagrvai.appspot.com",
  messagingSenderId: "832356265521"
};
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  currentUser :User;
  rootPage: any = 'WelcomePage';

  pages: Array<{title: string, component: any}>;

  constructor(authService:AuthServiceProvider,userService:UserServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   authService.auth.subscribe(
     (authState:FirebaseAuthState) =>{
       if(authState){
         userService.currentUser.subscribe(
           (user:User) =>{
             this.currentUser = user;
           }
         );
       }
     }
   );
   
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
