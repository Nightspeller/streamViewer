import { Action } from 'redux';
import { StreamsActions } from './streams.actions'
import { LayoutActions } from './layout.actions'
import { PickerActions } from './picker.actions'

export interface IPayloadAction extends Action {
    payload?: any;
}

export { StreamsActions, LayoutActions, PickerActions }