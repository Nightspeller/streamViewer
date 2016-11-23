"use strict";
var PICKER_STATES = {
    'closed': {
        previousState: 'closed',
        groups: []
    },
    'initial': {
        previousState: 'closed',
        groups: [
            { name: 'twitch-featured-games', headerLeadsTo: 'twitch-games', itemLeadsTo: 'twitch-streams-for-game' },
            { name: 'twitch-featured-streams', headerLeadsTo: 'twitch-streams', itemLeadsTo: 'picking-done' },
            { name: 'youtube-featured-videos', headerLeadsTo: 'youtube-videos', itemLeadsTo: 'picking-done' }
        ]
    },
    'twitch-games': {
        previousState: 'initial',
        groups: [
            { name: 'twitch-games', headerLeadsTo: '', itemLeadsTo: 'twitch-streams-for-game' },
        ]
    },
    'twitch-streams': {
        previousState: 'initial',
        groups: [
            { name: 'twitch-streams', headerLeadsTo: '', itemLeadsTo: 'twitch-streams-for-game' },
        ]
    }
};
//# sourceMappingURL=declarations.js.map