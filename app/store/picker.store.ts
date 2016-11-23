import { IPayloadAction, PickerActions } from '../actions/actions';
import { PickerDisplayGroup } from '../declarations/declarations'

export interface IPicker {
    pickerShown: boolean;
    pickerForStream: number;
    pickerCurrentState: string;
    pickerPreviousState: string;
    pickerData: PickerDisplayGroup[];
}

export const PICKER_INITIAL_STATE: IPicker = {
    pickerShown: false,
    pickerForStream: 0,
    pickerCurrentState: '',
    pickerPreviousState: '',
    pickerData: []
};

export function pickerDataReducer(state: IPicker = PICKER_INITIAL_STATE, action: IPayloadAction): IPicker {
    let newState: IPicker = {pickerData: [], pickerShown: false, pickerForStream: 0, pickerCurrentState: '', pickerPreviousState: ''};
    switch(action.type) {
        case  PickerActions.PICK_NEW_STREAM:
            return Object.assign({}, newState, action.payload, {pickerShown: true});
        case  PickerActions.CLOSE_PICKER:
            return Object.assign({}, PICKER_INITIAL_STATE);
        default:
            return state;
    }
}