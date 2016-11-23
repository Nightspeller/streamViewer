export interface StreamState {
    id: number;
    position: string;
    title: string;
    subtitle: string;
    description: string;
    playerHtml: string;
    chatHtml: string;
}

export interface ContainerPosition {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}

export interface PickerDisplayGroup {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    headerLeadsTo: string;
    itemLeadsTo: string;
    items: PickerGroupItem[];
}

export interface PickerGroupItem {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    code: string;
    playerHtml: string;
    chatHtml: string;
}

export type IGroupCodes = 'tw-games-list' | 'tw-streams-list' | 'yt-featured-list';

export type IPickerStates = 'closed' | 'initial' | 'twitch-games' | 'twitch-streams' | 'youtube-videos';

const PICKER_STATES = {
    'closed': {
        previousState: 'closed',
        groups: <any>[]
    },
    'initial': {
        previousState: 'closed',
        groups: [
            {name: 'twitch-featured-games', headerLeadsTo: 'twitch-games', itemLeadsTo: 'twitch-streams-for-game'},
            {name: 'twitch-featured-streams', headerLeadsTo: 'twitch-streams', itemLeadsTo: 'picking-done'},
            {name: 'youtube-featured-videos', headerLeadsTo: 'youtube-videos', itemLeadsTo: 'picking-done'}
        ]
    },
    'twitch-games': {
        previousState: 'initial',
        groups: [
            {name: 'twitch-games', headerLeadsTo: '', itemLeadsTo: 'twitch-streams-for-game'},
        ]
    },
    'twitch-streams': {
        previousState: 'initial',
        groups: [
            {name: 'twitch-streams', headerLeadsTo: '', itemLeadsTo: 'twitch-streams-for-game'},
        ]
    }
};