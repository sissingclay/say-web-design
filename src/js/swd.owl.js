/**
 * Created by claysissing on 18/08/2016.
 */
export function SwdOwl () {
    $('.owl-carousel-org').owlCarousel({
        items: 1,
        nav:true,
        center: true,
        navText: ['',''],
        loop: true,
        autoplay:true,
        autoplayTimeout:3300,
        autoplayHoverPause:true
    });
};

export function SwdOwlLogo() {
    
    if($(".owl-example-logos")) {
    
        $(".owl-example-logos").owlCarousel({
            
            navText: ['', ''],
            autoplay: true,
            autoplayTimeout:2500,
            autoplayHoverPause: true,
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: true,
                },
                1000: {
                    items: 6,
                    nav: true,
                    loop: false,
                    margin: 40
                }
            }
            
        });
    }
};