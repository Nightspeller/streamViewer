"use strict";
var actions_1 = require('../actions/actions');
exports.PICKER_INITIAL_STATE = {
    pickerShown: false,
    pickerForStream: 0,
    pickerStatesStack: [],
    twitchUserName: ''
};
function pickerDataReducer(state, action) {
    if (state === void 0) { state = exports.PICKER_INITIAL_STATE; }
    switch (action.type) {
        case actions_1.PickerActions.PICK_NEW_STREAM:
            return { pickerShown: true, pickerForStream: action.payload.pickerForStream, pickerStatesStack: [action.payload.pickerData], twitchUserName: action.payload.twitchUserName };
        case actions_1.PickerActions.PUSH_NEW_STATE:
            return Object.assign({}, state, { pickerStatesStack: state.pickerStatesStack.concat([action.payload]) });
        case actions_1.PickerActions.GO_BACK:
            if (state.pickerStatesStack.length > 1) {
                return Object.assign({}, state, { pickerStatesStack: state.pickerStatesStack.slice(0, -1) });
            }
            else {
                return state;
            }
        case actions_1.PickerActions.ADD_TWITCH_USERNAME:
            return Object.assign({}, state, { twitchUserName: action.payload });
        case actions_1.PickerActions.CLOSE_PICKER:
            return Object.assign({}, exports.PICKER_INITIAL_STATE);
        default:
            return state;
    }
}
exports.pickerDataReducer = pickerDataReducer;
//# sourceMappingURL=picker.store.js.map
