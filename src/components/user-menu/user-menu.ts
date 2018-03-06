import { User } from './../../models/user.model';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth.service';
import { UserProfilePage } from '../../pages/user-profile/user-profile';

/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

@Input('user') currentUser : User; 
  constructor(public alertCtrl: AlertController, public authService: AuthServiceProvider,
    public app: App, public menuCtrl: MenuController) {
super(alertCtrl,authService,app,menuCtrl);
    }
    onProfile() : void{
      this.navCtrl.push(UserProfilePage);
    }

}
