import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

import { StreamState} from '../../declarations/declarations'

import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import {ILayout} from "../../store/layout.store";
import {IStreams} from "../../store/streams.store";

@Component({
    selector: 'sv-video-container',
    templateUrl: 'video-container.component.html',
    styleUrls: ['video-container.component.styl']
})
export class VideoContainerComponent implements OnInit {

    @select() streams: Observable<StreamState[]>;
    @select() layout: Observable<any>;

    @Input() videoContainerId: number;

    private position: string;
    private shown: boolean;
    private top: number;
    private left: number;
    private width: number;
    private height: number;
    private videoElement: SafeHtml;


    constructor(
        private ngRedux: NgRedux<any>,
        private domSanitizer : DomSanitizer
    ) { }

    ngOnInit(): void {
        this.streams.subscribe((streamsState: StreamState[]) => {
            console.log(streamsState);
            this.adjustContainer(this.ngRedux.getState().layout, streamsState);

           if (JSON.stringify(this.videoElement) !== JSON.stringify(this.domSanitizer.bypassSecurityTrustHtml(streamsState[this.videoContainerId].playerHtml))) {
                this.videoElement = this.domSanitizer.bypassSecurityTrustHtml(streamsState[this.videoContainerId].playerHtml);
           }
        });

        this.layout.subscribe((layout: ILayout) => {
            this.adjustContainer(layout, this.ngRedux.getState().streams)
        })
    }

    adjustContainer(layout: ILayout, streamsState: IStreams): void {

        this.position = streamsState[this.videoContainerId].position;

        let doubleVideoMode :boolean = false;
        let conditionCounter = 0;
        for (let i = 0; i < 4; i++) {if (streamsState[i].position === 'MAIN' || streamsState[i].position === 'PREVIEW' || streamsState[i].position === 'QUICK_PREVIEW') conditionCounter++;}
        if (conditionCounter > 1) doubleVideoMode = true;

        switch (this.position){
            case '':
            case 'OVERVIEW':
                if (layout.showOverview) {
                    this.shown = true;
                    this.top = layout.overviewsContainers[this.videoContainerId].top;
                    this.left = layout.overviewsContainers[this.videoContainerId].left;
                    this.width = layout.overviewsContainers[this.videoContainerId].width-2;
                    this.height = layout.overviewsContainers[this.videoContainerId].height-2;
                } else {
                    this.shown = false;
                }
                break;
            case 'MAIN':
                if (doubleVideoMode) {
                    this.top = layout.mainContainer.bottom - layout.previewContainer.height-2;
                    this.left = layout.mainContainer.right - layout.previewContainer.width-2;
                    this.width = layout.previewContainer.width-2;
                    this.height = layout.previewContainer.height-2;
                } else {
                    this.top = layout.mainContainer.top;
                    this.left = layout.mainContainer.left;
                    this.width = layout.mainContainer.width-2;
                    this.height = layout.mainContainer.height-2;
                }
                break;
            case 'QUICK_PREVIEW':
            case 'PREVIEW':
                if (doubleVideoMode) {
                    this.top = layout.previewContainer.top;
                    this.left = layout.previewContainer.left;
                    this.width = layout.previewContainer.width-2;
                    this.height = layout.previewContainer.height-2;
                } else {
                    this.top = layout.mainContainer.top;
                    this.left = layout.mainContainer.left;
                    this.width = layout.mainContainer.width-2;
                    this.height = layout.mainContainer.height-2;
                }
                break;
            case 'OMNI':
                this.shown = true;
                this.top = layout.mainContainer.top + layout.mainContainer.height/2*Math.floor(this.videoContainerId/2);
                this.left = layout.mainContainer.left + layout.mainContainer.width/2*(this.videoContainerId%2);
                this.width = layout.mainContainer.width/2-2;
                this.height = layout.mainContainer.height/2-2;
                break;
        }
    }
}
