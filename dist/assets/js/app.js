window.onload = function () {
    if (window.jQuery) {
        // jQuery is loaded  
        console.log('loaded in app nigga!!!')
        wtf('Alvin');
        getMachines();
    } else {
        // jQuery is not loaded
        console.log('not loaded')
    }
}