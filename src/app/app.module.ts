import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { NgRedux } from 'ng2-redux'

import { IAppState, INITIAL_STATE, rootReducer } from './store/store';
import { StreamsActions, LayoutActions, PickerActions } from './actions/actions';

import { AppComponent }   from './components/app.component/app.component';
import { ScreenComponent } from './components/screen.component/screen.component';
import { OverviewComponent } from './components/overview.component/overview.component';
import { ChatComponent } from './components/chat.component/chat.component';
import { VideoContainerComponent } from './components/video-container.component/video-container.component';
import { PickerComponent } from './components/picker.component/picker.component';
import { TwitchService } from './services/twitch.service';
import { YoutubeService } from './services/youtube.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, OverviewComponent, ScreenComponent, ChatComponent, VideoContainerComponent, PickerComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ TwitchService, YoutubeService, NgRedux, StreamsActions, LayoutActions, PickerActions ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE,[], (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__() );
  }
}
