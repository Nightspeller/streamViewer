import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { StreamState} from '../../declarations/declarations'

import { LayoutActions } from '../../actions/actions';

@Component({
    selector: 'sv-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.styl']
})
export class AppComponent implements OnInit {

    @select() streams: Observable<StreamState[]>;
    @select() layout: Observable<any>;

    private showOverview = true;
    private showChat = true;

    constructor (
        private layoutActions: LayoutActions,
        private element: ElementRef
    ) { }


    ngOnInit(): void {
        this.layoutActions.layoutChanged(this.element.nativeElement);

        this.layout.subscribe((layout: any) => {
            if (this.showChat !== layout.showChat) {
                this.showChat = layout.showChat;
                setTimeout(() => {
                    this.layoutActions.layoutChanged(this.element.nativeElement);
                }, 0);
            }
            if (this.showOverview !== layout.showOverview) {
                this.showOverview = layout.showOverview;
                setTimeout(() => {
                    this.layoutActions.layoutChanged(this.element.nativeElement);
                }, 0);
            }
        });
    }

    onResize(): void {
        this.layoutActions.layoutChanged(this.element.nativeElement);
    }
}
