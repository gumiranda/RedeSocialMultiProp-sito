import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Spotted } from '../../models/spotted.model';
import { UserServiceProvider } from './../../providers/user/user.service';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import {NavController, NavParams, MenuController } from 'ionic-angular';
import { SpottedServiceProvider } from '../../providers/spotted/spotted.service';
import { User } from '../../models/user.model';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'profissionallogin.html',
})
export class ProfissionalLoginPage {
 
}