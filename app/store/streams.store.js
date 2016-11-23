"use strict";
var actions_1 = require('../actions/actions');
exports.STREAMS_INITIAL_STATE = [
    { id: 0, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null },
    { id: 1, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null },
    { id: 2, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null },
    { id: 3, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null }
];
function streamsReducer(state, action) {
    if (state === void 0) { state = exports.STREAMS_INITIAL_STATE; }
    switch (action.type) {
        case actions_1.StreamsActions.ADD_NEW_STREAM:
            return state.slice(0, action.payload.id).concat([Object.assign({}, action.payload, {
                position: action.payload.position === '' ?
                    (state[action.payload.id].position !== '' ? state[action.payload.id].position : 'OVERVIEW')
                    : action.payload.position })], state.slice(action.payload.id + 1));
        case actions_1.StreamsActions.DELETE_STREAM:
            return state.slice(0, action.payload).concat([{ id: action.payload, position: (state[action.payload].position === 'OMNI' ? 'OMNI' : ''), title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null }], state.slice(action.payload + 1));
        case actions_1.StreamsActions.MOVE_TO_OVERVIEW:
            return state.slice(0, action.payload).concat([Object.assign({}, state[action.payload], { position: 'OVERVIEW' })], state.slice(action.payload + 1));
        case actions_1.StreamsActions.MOVE_TO_MAIN:
            return state.map(function (stream, i) {
                if (i === action.payload) {
                    return Object.assign({}, stream, { position: 'MAIN' });
                }
                else {
                    if (stream.position === 'MAIN') {
                        return Object.assign({}, stream, { position: 'OVERVIEW' });
                    }
                    else {
                        return stream;
                    }
                }
            });
        case actions_1.StreamsActions.MOVE_TO_PREVIEW:
            return state.map(function (stream, i) {
                if (i === action.payload) {
                    return Object.assign({}, stream, { position: 'PREVIEW' });
                }
                else {
                    if (stream.position === 'PREVIEW') {
                        return Object.assign({}, stream, { position: 'OVERVIEW' });
                    }
                    else {
                        return stream;
                    }
                }
            });
        case actions_1.StreamsActions.MOVE_TO_QUICK_PREVIEW:
            return state.map(function (stream, i) {
                if (i === action.payload) {
                    return Object.assign({}, stream, { position: 'QUICK_PREVIEW' });
                }
                else {
                    return stream;
                }
            });
        case actions_1.StreamsActions.SWAP_MAIN_AND_PREVIEW:
            return state.map(function (stream) {
                if (stream.position === 'MAIN') {
                    return Object.assign({}, stream, { position: 'PREVIEW' });
                }
                else if (stream.position === 'PREVIEW') {
                    return Object.assign({}, stream, { position: 'MAIN' });
                }
                else {
                    return stream;
                }
            });
        case actions_1.StreamsActions.MOVE_TO_OMNI:
            return state.map(function (stream) {
                return Object.assign({}, stream, { position: 'OMNI' });
            });
        case actions_1.StreamsActions.EXIT_OMNI:
            return state.map(function (stream) {
                return Object.assign({}, stream, { position: 'OVERVIEW' });
            });
        default:
            return state;
    }
}
exports.streamsReducer = streamsReducer;
//# sourceMappingURL=streams.store.js.map