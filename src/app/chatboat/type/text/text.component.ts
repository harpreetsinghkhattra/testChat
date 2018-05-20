import { Component, OnInit } from '@angular/core';
import { TextChatModel } from './text.chat.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  public dataSet: TextChatModel;
  messages : any[] = [
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
      {recieverId : '12', senderId : '2', groupId : 'aklsd', imagePath : '', name : 'hello one', time : 'afadd'},
  ]
  constructor() { }

  ngOnInit() {
  }

}
