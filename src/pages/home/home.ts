import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  username: string = '';

  constructor(private fire: AngularFireAuth,
    public alertCtrl: AlertController, public navCtrl: NavController) {

  }

  ErrorAlert() {
  let alert = this.alertCtrl.create({
    title: 'Error :',
    subTitle: 'Try Again!',
    buttons: ['Dismiss']
  });
  alert.present();
}

  logInwithfb() {
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    .then( () => {
      this.fire.auth.getRedirectResult().then( res => {
        console.log('loggedIn Using facebook!');
        this.username = res.user.displayName;
        this.navCtrl.push(ChatPage, {
          user: this.username
        }).catch( err => {
          alert(err);
        });
      });
    });
  }

  logInwithgoogle() {
    this.fire.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then( () => {
      this.fire.auth.getRedirectResult().then( res => {
        console.log('loggedIn Using Google!');
          this.username = res.user.displayName;
          this.navCtrl.push(ChatPage, {
            user: this.username
          }).catch( err => {
            alert(err);
          });
      });
    });
  }

  logInwithtwitter() {
    this.fire.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    .then( () => {
      this.fire.auth.getRedirectResult().then( res => {
        console.log('loggedIn Using twitter!');
          this.username = res.user.displayName;
          this.navCtrl.push(ChatPage, {
            user: this.username
          }).catch( err => {
            alert(err);
          })
      })
    })
  }

  /*logIn() {
    this.navCtrl.push(ChatPage, {
      user: this.username
    });
  }*/
  }
