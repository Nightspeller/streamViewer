"use strict";
var actions_1 = require('../actions/actions');
exports.LAYOUT_INITIAL_STATE = {
    overviewsContainers: [
        { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
        { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
        { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
        { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }
    ],
    mainContainer: { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
    previewContainer: { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
    showChat: true,
    showOverview: true
};
function layoutReducer(state, action) {
    if (state === void 0) { state = exports.LAYOUT_INITIAL_STATE; }
    switch (action.type) {
        case actions_1.LayoutActions.UPDATE_LAYOUT:
            var topContainer = action.payload;
            var overviewsContainers = topContainer.getElementsByClassName('sv-preview');
            var screenContainer = topContainer.getElementsByClassName('sv-screen')[0];
            var tempOverviewsContainers = [];
            if (state.showOverview) {
                for (var i = 0; i < overviewsContainers.length; i++) {
                    tempOverviewsContainers.push(overviewsContainers[i].getBoundingClientRect());
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    tempOverviewsContainers.push({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
                }
            }
            return {
                overviewsContainers: tempOverviewsContainers,
                mainContainer: screenContainer.getBoundingClientRect(),
                previewContainer: calculatePreviewSize(screenContainer.getBoundingClientRect()),
                showChat: state.showChat,
                showOverview: state.showOverview
            };
        case actions_1.LayoutActions.TOGGLE_CHAT:
            return Object.assign({}, state, { showChat: !state.showChat });
        case actions_1.LayoutActions.TOGGLE_OVERVIEW:
            return Object.assign({}, state, { showOverview: !state.showOverview });
        default: return state;
    }
}
exports.layoutReducer = layoutReducer;
function calculatePreviewSize(screenSize) {
    var ratio = 16 / 9;
    var screenWidth = screenSize.width;
    var screenHeight = screenSize.height;
    var videoWidth = 0;
    var videoHeight = 0;
    if (screenWidth >= 2 * screenHeight * ratio) {
        videoHeight = screenHeight;
        videoWidth = screenHeight * ratio;
    }
    if (screenHeight * ratio > screenWidth / 2 && screenHeight * ratio < screenWidth) {
        videoWidth = screenWidth * (0.5 + 0.1 * ((screenHeight * ratio * 2 - screenWidth) / (screenHeight * ratio)));
        videoHeight = videoWidth / ratio;
    }
    if (screenHeight * ratio > screenWidth) {
        videoWidth = screenWidth * (0.5 - 0.3 + 0.4 * (1 / (screenWidth / (screenHeight * ratio))));
        videoHeight = videoWidth / ratio;
    }
    if (screenHeight >= 2 * screenWidth / ratio) {
        videoWidth = screenWidth;
        videoHeight = screenWidth / ratio;
    }
    return { top: screenSize.top, bottom: screenSize.top + videoHeight, left: screenSize.left, right: screenSize.left + videoHeight, width: videoWidth, height: videoHeight };
}
//# sourceMappingURL=layout.store.js.map