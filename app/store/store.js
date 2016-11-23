"use strict";
var redux_1 = require('redux');
var streams_store_1 = require('./streams.store');
var layout_store_1 = require('./layout.store');
var picker_store_1 = require('./picker.store');
exports.INITIAL_STATE = {
    streams: streams_store_1.STREAMS_INITIAL_STATE,
    layout: layout_store_1.LAYOUT_INITIAL_STATE,
    picker: picker_store_1.PICKER_INITIAL_STATE
};
exports.rootReducer = redux_1.combineReducers({
    streams: streams_store_1.streamsReducer,
    layout: layout_store_1.layoutReducer,
    picker: picker_store_1.pickerDataReducer
});
//# sourceMappingURL=store.js.map