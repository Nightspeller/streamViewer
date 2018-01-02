import { Component, OnInit } from '@angular/core';

import { StreamState} from '../../declarations/declarations'

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { StreamsActions, LayoutActions } from '../../actions/actions';

const fullScreenLib: any = require('../../../assets/vendor/js/screenfull.js');

@Component({
    selector: 'sv-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.styl']
})
export class ScreenComponent implements OnInit {

    @select() streams: Observable<StreamState[]>;
    @select() layout: Observable<any>;

    private showControls: boolean;
    private fullScreenMode: boolean;
    private omniMode: boolean;

    constructor(
        private ngRedux: NgRedux<any>,
        private streamsActions: StreamsActions,
        private layoutActions: LayoutActions
    ) { }

    ngOnInit(): void {
        this.streams.subscribe((streamsState: StreamState[]) => {
            streamsState[0].position === 'OMNI' ? this.omniMode = true : this.omniMode = false;
            /*this.adjustContainer(this.ngRedux.getState().layout, streamsState);

            if (this.videoCode !== streamsState[this.videoContainerId].videoCode) {
                this.source = streamsState[this.videoContainerId].source;
                this.videoCode = streamsState[this.videoContainerId].videoCode;
                if (this.source === 'twitch') this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${this.videoCode}`);
                if (this.source === 'youtube') this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoCode}`);
            }*/
        });

        /*this.layout.subscribe((layout: any) => {
            this.adjustContainer(layout, this.ngRedux.getState().streams)
        })*/

        if (fullScreenLib.enabled) {
            document.addEventListener(fullScreenLib.raw.fullscreenchange, () => {
                this.fullScreenMode = fullScreenLib.isFullscreen;
            });
        }
    }

    toggleControls(): void {
        this.showControls = !this.showControls
    }

    toggleOverviewList(): void {
        this.layoutActions.toggleOverview();
    }

    toggleChat(): void {
        this.layoutActions.toggleChat();
    }

    swapMainAndPreview(): void {
        this.streamsActions.swapMainAndPreview();

    }

    toggleFullScreen(): void {
        if (fullScreenLib.enabled) {
            fullScreenLib.toggle();
        }
    }

    showAllStreams(): void {
        this.omniMode ? this.streamsActions.exitOmni() : this.streamsActions.moveToOmni();
    }

    showAbout(): void {
        alert('StreamViewer for Web by Serg Nigths. Feedback is welcomed: serj.nights@live.com');
    }
}
