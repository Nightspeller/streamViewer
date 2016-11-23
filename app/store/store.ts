import { combineReducers } from 'redux';
import { IStreams, streamsReducer, STREAMS_INITIAL_STATE } from './streams.store';
import { ILayout, layoutReducer, LAYOUT_INITIAL_STATE } from './layout.store';
import { IPicker, pickerDataReducer, PICKER_INITIAL_STATE } from './picker.store';

export { IStreams, ILayout, IPicker}

export interface IAppState {
    streams: IStreams;
    layout: ILayout;
    picker: IPicker;
}

export const INITIAL_STATE: IAppState = {
    streams: STREAMS_INITIAL_STATE,
    layout: LAYOUT_INITIAL_STATE,
    picker: PICKER_INITIAL_STATE
};

export const rootReducer = combineReducers<IAppState>({
    streams: streamsReducer,
    layout: layoutReducer,
    picker: pickerDataReducer
});



