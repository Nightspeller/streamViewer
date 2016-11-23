import {StreamsActions, IPayloadAction} from '../actions/actions';
import { StreamState } from '../declarations/declarations'

export interface IStreams extends Array<StreamState>{}

export const STREAMS_INITIAL_STATE: IStreams = [
    {id: 0, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null},
    {id: 1, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null},
    {id: 2, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null},
    {id: 3, position: '', title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null}
];

export function streamsReducer (state: IStreams = STREAMS_INITIAL_STATE, action: IPayloadAction): IStreams {
    switch(action.type) {
        case StreamsActions.ADD_NEW_STREAM:
            return [...state.slice(0, action.payload.id),
                Object.assign({}, action.payload, {
                position: action.payload.position === '' ?
                    (state[action.payload.id].position !== '' ? state[action.payload.id].position : 'OVERVIEW')
                    : action.payload.position}),
                ...state.slice(action.payload.id + 1)
            ];
        case StreamsActions.DELETE_STREAM:
            return [...state.slice(0, action.payload),
                {id: action.payload, position: (state[action.payload].position === 'OMNI' ? 'OMNI' : ''), title: '', subtitle: '', description: '', playerHtml: null, chatHtml: null},
                ...state.slice(action.payload + 1)
            ];
        case StreamsActions.MOVE_TO_OVERVIEW:
            return [...state.slice(0, action.payload),
                Object.assign({}, state[action.payload], {position: 'OVERVIEW'}),
                ...state.slice(action.payload + 1)
            ];
        case StreamsActions.MOVE_TO_MAIN:
            return state.map((stream, i) => {
                if (i === action.payload) {
                    return Object.assign({}, stream, {position: 'MAIN'});
                } else {
                    if (stream.position === 'MAIN') {
                        return Object.assign({}, stream, {position: 'OVERVIEW'});
                    } else {
                        return stream
                    }
                }
            });
        case StreamsActions.MOVE_TO_PREVIEW:
            return state.map((stream, i) => {
                if (i === action.payload) {
                    return Object.assign({}, stream, {position: 'PREVIEW'});
                } else {
                    if (stream.position === 'PREVIEW') {
                        return Object.assign({}, stream, {position: 'OVERVIEW'});
                    } else {
                        return stream
                    }
                }
            });
        case StreamsActions.MOVE_TO_QUICK_PREVIEW:
            return state.map((stream, i) => {
                if (i === action.payload) {
                    return Object.assign({}, stream, {position: 'QUICK_PREVIEW'});
                } else {
                    return stream
                }
            });
        case StreamsActions.SWAP_MAIN_AND_PREVIEW:
            return state.map((stream) => {
                if (stream.position === 'MAIN') {
                    return Object.assign({}, stream, {position: 'PREVIEW'});
                } else if (stream.position === 'PREVIEW') {
                    return Object.assign({}, stream, {position: 'MAIN'});
                } else {
                    return stream
                }
            });
        case StreamsActions.MOVE_TO_OMNI:
            return state.map((stream) => {
                return Object.assign({}, stream, {position: 'OMNI'});
            });
        case StreamsActions.EXIT_OMNI:
            return state.map((stream) => {
                return Object.assign({}, stream, {position: 'OVERVIEW'});
            });
        default:
            return state;
    }
}