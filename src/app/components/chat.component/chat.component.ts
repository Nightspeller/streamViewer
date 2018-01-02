import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';

import { StreamState} from '../../declarations/declarations'

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sv-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.styl']
})
export class ChatComponent implements OnInit {

  private chatElements: SafeHtml[] = [];
  private shownChat = 0;

    constructor(
        private ngRedux: NgRedux<any>,
        private domSanitizer: DomSanitizer) { }

    ngOnInit(): void {
        for (let i = 0; i < 4; i++) {
            let stream: Observable<StreamState> = this.ngRedux.select(state => state.streams[i]);
            stream.subscribe((streamState: StreamState) => {

                if (JSON.stringify(this.chatElements[i]) !== JSON.stringify(this.domSanitizer.bypassSecurityTrustHtml(streamState.chatHtml))) {
                    this.chatElements[i] = this.domSanitizer.bypassSecurityTrustHtml(streamState.chatHtml);
                }

                if (streamState.position === 'MAIN') {
                  this.shownChat = i;
                }

            });
        }
    }

    selectChat(index: number):void {
        this.shownChat = index;
    }
}
