import { BotchatPage } from './../pages/botchat/botchat';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { MessageServiceProvider } from './../providers/message/message.service';
import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize/capitalize';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { SignupPage } from './../pages/signup/signup';
import { ClienteLoginPage } from './../pages/clienteLogin/clientelogin';
import { WelcomePage } from './../pages/welcome/welcome';
import { HomePage } from './../pages/home/home';
import { AuthServiceProvider } from './../providers/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'; 

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import {AuthProviders,AuthMethods} from 'angularfire2';

import { UserServiceProvider } from '../providers/user/user.service';
import { ProfissionalLoginPage } from '../pages/profissionalLogin/profissionallogin';
import { BaseComponent } from '../components/base.component';
import { ChatServiceProvider } from '../providers/chat/chat.service';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserInfoComponent } from '../components/user-info/user-info';
import { SpottedPage } from '../pages/spotted/spotted';
import { SpottedServiceProvider } from '../providers/spotted/spotted.service';

const firebaseAppConfig : FirebaseAppConfig = {
  apiKey: "AIzaSyDBQl4HG_lqovYTg-ATndA3Co4JnUdoyiM",
  authDomain: "spottedagrvai.firebaseapp.com",
  databaseURL: "https://spottedagrvai.firebaseio.com",
 // projectId: "spottedagrvai",
  storageBucket: "spottedagrvai.appspot.com",
  messagingSenderId: "832356265521"
};

const firebaseAuthConfig = {
  provider : AuthProviders.Custom,
  method : AuthMethods.Password
};


@NgModule({
  declarations: [
    UserProfilePage,BotchatPage,SpottedPage,ProgressBarComponent,MessageBoxComponent,UserInfoComponent,UserMenuComponent,CustomLoggedHeaderComponent,CapitalizePipe,ChatPage,MyApp,HomePage,ClienteLoginPage,ProfissionalLoginPage,SignupPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAppConfig,firebaseAuthConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,HomePage,SpottedPage,BotchatPage,UserProfilePage,ClienteLoginPage,ProfissionalLoginPage,SignupPage,ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    MessageServiceProvider,

    AuthServiceProvider,
    ChatServiceProvider,
    SpottedServiceProvider,
  ]
})
export class AppModule {}
