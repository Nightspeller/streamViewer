"use strict";
var actions_1 = require('../actions/actions');
exports.PICKER_INITIAL_STATE = {
    pickerShown: false,
    pickerForStream: 0,
    pickerCurrentState: '',
    pickerPreviousState: '',
    pickerData: []
};
function pickerDataReducer(state, action) {
    if (state === void 0) { state = exports.PICKER_INITIAL_STATE; }
    var newState = { pickerData: [], pickerShown: false, pickerForStream: 0, pickerCurrentState: '', pickerPreviousState: '' };
    switch (action.type) {
        case actions_1.PickerActions.PICK_NEW_STREAM:
            return Object.assign({}, newState, action.payload, { pickerShown: true });
        case actions_1.PickerActions.CLOSE_PICKER:
            return Object.assign({}, exports.PICKER_INITIAL_STATE);
        default:
            return state;
    }
}
exports.pickerDataReducer = pickerDataReducer;
//# sourceMappingURL=picker.store.js.map