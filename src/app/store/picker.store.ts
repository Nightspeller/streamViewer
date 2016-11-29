import { IPayloadAction, PickerActions } from '../actions/actions';
import { PickerDisplayGroup } from '../declarations/declarations'

export interface IPicker {
    pickerShown: boolean;
    pickerForStream: number;
    pickerStatesStack: PickerDisplayGroup[][];
    twitchUserName: string;
}

export const PICKER_INITIAL_STATE: IPicker = {
    pickerShown: false,
    pickerForStream: 0,
    pickerStatesStack: [],
    twitchUserName: ''
};

export function pickerDataReducer(state: IPicker = PICKER_INITIAL_STATE, action: IPayloadAction): IPicker {

    switch(action.type) {
        case  PickerActions.PICK_NEW_STREAM:
            return {pickerShown: true, pickerForStream: action.payload.pickerForStream, pickerStatesStack: [action.payload.pickerData], twitchUserName: action.payload.twitchUserName};
        case  PickerActions.PUSH_NEW_STATE:
            return Object.assign({}, state, {pickerStatesStack: [...state.pickerStatesStack, action.payload]});
        case  PickerActions.GO_BACK:
            if (state.pickerStatesStack.length > 1) {
                return Object.assign({}, state, {pickerStatesStack: state.pickerStatesStack.slice(0, -1)});
            } else {
                return state;
            }
        case  PickerActions.ADD_TWITCH_USERNAME:
            return Object.assign({}, state, {twitchUserName: action.payload});
        case  PickerActions.CLOSE_PICKER:
            return Object.assign({}, PICKER_INITIAL_STATE);
        default:
            return state;
    }
}
