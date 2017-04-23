import { Component, OnInit } from '@angular/core';
import * as Pusher from 'pusher-js';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.css']
})
export class SmsListComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    var pusher = new Pusher('bda0aff2ffa75d90e73a', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('sms-reader');
    channel.bind('new-sms', data => {
      this.smsList.push(data.data);
      console.log(this.smsList);
    });
  }

  smsList :Object[] = []

}
