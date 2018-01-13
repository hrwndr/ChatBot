import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {

  username: string = '';
  message: string = '';
  sub;
  messages: object[] = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.username = this.navParams.get('user');
    this.sub = this.db.list('/chat').valueChanges().subscribe( data => {
    this.messages = data;
    });
}
  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    });
  this.message = '';
  if(this.message = '') {
    //alert
  }
  }
  ionViewWillLeave() {
    console.log('User Just Left!');
    this.sub.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} left`
    });
  }
  ionViewDidEnter() {
    //
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} joined`
    });
  }
}
