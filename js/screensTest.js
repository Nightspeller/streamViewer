var ratio = 16/9;
window.addEventListener("resize", onResize);

function onResize(){
    var screenWidth = document.getElementsByClassName('mainScreen')[0].offsetWidth;
    var screenHeight = document.getElementsByClassName('mainScreen')[0].offsetHeight;
    console.log(screenWidth,screenHeight);


    var videoWidth = 800;
    var videoHeight = 800/ratio;

    if (screenWidth >= 2*screenHeight*ratio) {
        videoHeight = screenHeight;
        videoWidth = screenHeight*ratio;
        console.log('here1');
    }

    if (screenHeight * ratio > screenWidth/2 && screenHeight * ratio < screenWidth) {
        videoWidth = screenWidth*(0.5+0.1*((screenHeight*ratio*2 - screenWidth)/(screenHeight*ratio)));
        videoHeight = videoWidth/ratio;
    }

    if (screenHeight * ratio > screenWidth ) {
        videoWidth = screenWidth*(0.5-0.3 + 0.4*(1/(screenWidth/(screenHeight*ratio))));
        videoHeight = videoWidth/ratio;
    }

    if (screenHeight >= 2*screenWidth/ratio) {
        videoWidth = screenWidth;
        videoHeight = screenWidth/ratio;
    }

    document.getElementsByClassName('active')[0].style.width = videoWidth+'px';
    document.getElementsByClassName('active')[0].style.height = videoHeight+'px';

    document.getElementsByClassName('preview')[0].style.width = videoWidth+'px';
    document.getElementsByClassName('preview')[0].style.height = videoHeight+'px';
}
onResize();