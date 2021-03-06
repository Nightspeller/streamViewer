import {LayoutActions, IPayloadAction} from '../actions/actions';
import { ContainerPosition } from '../declarations/declarations'

export interface ILayout {
    overviewsContainers: ContainerPosition[]
    mainContainer: ContainerPosition
    previewContainer: ContainerPosition,
    showChat: boolean,
    showOverview: boolean
}

export const LAYOUT_INITIAL_STATE: ILayout = {
    overviewsContainers: [
        {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0},
        {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0},
        {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0},
        {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0}
    ],
    mainContainer: {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0},
    previewContainer: {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0},
    showChat: true,
    showOverview: true
};

export function layoutReducer(state: ILayout = LAYOUT_INITIAL_STATE, action: IPayloadAction): ILayout {
    switch (action.type) {
        case  LayoutActions.UPDATE_LAYOUT:
            let topContainer: HTMLElement = action.payload;
            let overviewsContainers = topContainer.getElementsByClassName('sv-preview');
            let screenContainer = topContainer.getElementsByClassName('sv-screen')[0];

            let tempOverviewsContainers: ContainerPosition[] = [];
            if (state.showOverview) {
                for (let i = 0; i < overviewsContainers.length; i++) {
                    tempOverviewsContainers.push(overviewsContainers[i].getBoundingClientRect())
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    tempOverviewsContainers.push({top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0})
                }
            }

            return {
                overviewsContainers: tempOverviewsContainers,
                mainContainer: screenContainer.getBoundingClientRect(),
                previewContainer: calculatePreviewSize(screenContainer.getBoundingClientRect()),
                showChat: state.showChat,
                showOverview: state.showOverview
            };
        case  LayoutActions.TOGGLE_CHAT:
            return Object.assign({}, state, {showChat: !state.showChat});
        case  LayoutActions.TOGGLE_OVERVIEW:
            return Object.assign({}, state, {showOverview: !state.showOverview});
        default: return state;
    }
}

function calculatePreviewSize(screenSize: ContainerPosition) :ContainerPosition {
    let ratio = 16 / 9;

    let screenWidth = screenSize.width;
    let screenHeight = screenSize.height;
    let videoWidth = 0;
    let videoHeight = 0;

    if (screenWidth >= 2 * screenHeight * ratio) {
        videoHeight = screenHeight;
        videoWidth = screenHeight * ratio;
    }

    if (screenHeight * ratio > screenWidth / 2 && screenHeight * ratio < screenWidth) {
        videoWidth = screenWidth * (0.5 + 0.1 * ((screenHeight * ratio * 2 - screenWidth) / (screenHeight * ratio)));
        videoHeight = videoWidth / ratio;
    }

    if (screenHeight * ratio >= screenWidth) {
        videoWidth = screenWidth * (0.5 - 0.3 + 0.4 * (1 / (screenWidth / (screenHeight * ratio))));
        videoHeight = videoWidth / ratio;
    }

    if (screenHeight >= 2 * screenWidth / ratio) {
        videoWidth = screenWidth;
        videoHeight = screenWidth / ratio;
    }

    return {top: screenSize.top, bottom: screenSize.top + videoHeight, left: screenSize.left, right: screenSize.left + videoHeight, width: videoWidth, height: videoHeight}
}
