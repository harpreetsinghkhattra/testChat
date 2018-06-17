import { NgModule } from '@angular/core';
import { ChildRoutes } from './chat-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { TextComponent } from './type/text/text.component';
import { ChatComponent } from './chat/chat.component';
import { VideoComponent } from './type/video/video.component';

@NgModule({
    declarations: [ChatComponent, TextComponent, VideoComponent],
    imports: [CommonModule, ChildRoutes],
    exports: [RouterModule]
})
export class ChatModule {

}