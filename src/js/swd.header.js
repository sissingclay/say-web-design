/**
 * Created by claysissing on 18/08/2016.
 */

export function SwdHeader() {
    
    let logoJs = document.querySelector('#swd-logo-js'),
        logoJsCl = logoJs.classList;
    
    window.onscroll = function () {
        // called when the window is scrolled.
        var scrollTop   = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > 150) {
            // object is offset more
            // than 10 pixels from its parent
            if (!logoJsCl.contains('swdBoxSlider-active')) {
                logoJsCl.add('swdBoxSlider-active');
                document.querySelector('#swd-header-social-js').classList.add('_show');
            }
        } else {
            if (logoJsCl.contains('swdBoxSlider-active')) {
                logoJsCl.remove('swdBoxSlider-active');
                document.querySelector('#swd-header-social-js').classList.remove('_show');
            }
        }
    };
}