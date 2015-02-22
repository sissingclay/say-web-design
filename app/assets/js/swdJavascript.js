var swdModule = (function () {

        'use strict';

        // Feature Test
        if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

            var $$ = function (selector) {

                var firstCharacter = selector.charAt(0);

                if (firstCharacter === '.') {
                    return loopElements(document.querySelectorAll(selector));
                }

                return document.querySelector(selector);
            };
            
            /**
             * swdModule.clickedClass('.twitter', {
             *      toggleClass: 'swd-hidden',
             *      toToggle: '#swd-contactForm-js'
             * });
             */
            var init = function (selector, data) {
                
                var data            = data || {},
                    toggleElement   = $$(selector),
                    toggleClass     = data.toggleClass,
                    toToggle        = $$(data.toToggle);
            
                if(data.secondToToggle) {
                    var secondToToggle  = $$(data.secondToToggle),
                        secondToggle    = data.secondToggleClass;
                }

                if (toggleElement) {
  
                    toggleElement.addEventListener('click', function(element) {
                        element.preventDefault();
                        toggle(toToggle, toggleClass);
                        
                        if(data.secondToToggle) {
                            toggle(secondToToggle, secondToggle);
                        }
                    });
                }
            };


            var loopClasses = function (selector, data) {

                [].forEach.call(document.querySelectorAll(selector), function (elements) {

                    elements.addEventListener('click', function(element) {

                        element.preventDefault();
                        toggleClass     = data.toggleClass;
                        toToggle        = $$(data.toToggle);
                        toggle(toToggle, toggleClass);
                    });
                });
            };
            
            var smoothScroll = function (anchor, duration) {

                // Calculate how far and how fast to scroll
                var startLocation = window.pageYOffset;
                var endLocation = anchor.offsetTop;
                var distance = endLocation - startLocation;
                var increments = distance/(duration/16);
                var stopAnimation;

                // Scroll the page by an increment, and check if it's time to stop
                var animateScroll = function () {
                    window.scrollBy(0, increments);
                    stopAnimation();
                };

                // If scrolling down
                if ( increments >= 0 ) {
                    // Stop animation when you reach the anchor OR the bottom of the page
                    stopAnimation = function () {
                        var travelled = window.pageYOffset;
                        if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                            clearInterval(runAnimation);
                        }
                    };
                }
                // If scrolling up
                else {
                    // Stop animation when you reach the anchor OR the top of the page
                    stopAnimation = function () {
                        var travelled = window.pageYOffset;
                        if ( travelled <= (endLocation || 0) ) {
                            clearInterval(runAnimation);
                        }
                    };
                }

                // Loop the animation function
                var runAnimation = setInterval(animateScroll, 12);

            };
            
            var scroll = function (data) {
                
                var scrollToggle    = document.querySelectorAll('.swd-scroll'),
                    toggleContent   = document.querySelector('#swd-talkToUs-js'),
                    toToggle        = $$(data.toToggle),
                    toggleClass     = data.toggleClass;
                
                // For each smooth scroll link
                [].forEach.call(scrollToggle, function (toggle) {

                    // When the smooth scroll link is clicked
                    toggle.addEventListener('click', function(e) {

                        // Prevent the default link behavior
                        e.preventDefault();

                        // Get anchor link and calculate distance from the top
                        var dataID          = toggle.getAttribute('href');
                        var dataSpeed       = toggle.getAttribute('data-swd-speed');
                        var dataElement     = toggle.getAttribute('data-swd-element');
                        var elementTarget   = document.querySelector(dataElement);

                        if (dataID) {
                            var dataTarget = document.querySelector(dataID);
                        }

                        // If the anchor exists
                        if (dataTarget) {
                            // Scroll to the anchor
                            smoothScroll(dataTarget, dataSpeed || 700);
                            
                            addClass(toggleContent, 'swd-hidden');

                            // Check if element has class
                            removeClass(toToggle, toggleClass);
                        } else {
                            addClass(toggleContent, 'swd-hidden');
                            
                            // Check if element has class
                            removeClass(toToggle, toggleClass);
                        }

                    }, false);
                });
            };
            
            var toggle = function (toToggle, toggleClass) {

                if (hasClass(toToggle, toggleClass)) {
                    removeClass(toToggle, toggleClass);
                } else {
                    addClass(toToggle, toggleClass);
                }
            };
            
            // This checks if element has class
            var hasClass = function (toToggle, toggleClass) {
                return toToggle.className.match(new RegExp('(\\s|^)' + toggleClass + '(\\s|$)'));
            };


            // This adds class to element
            var addClass = function (toToggle, toggleClass) {
                if (!hasClass(toToggle, toggleClass)) toToggle.className += " " + toggleClass;
            };


            // This removes class from element
            var removeClass = function (toToggle, toggleClass) {
                if (hasClass(toToggle, toggleClass)) {
                    var reg = new RegExp('(\\s|^)' + toggleClass + '(\\s|$)');
                    toToggle.className = toToggle.className.replace(reg, ' ');
                }
            };


            return {
                clickedId: init,
                clickedClass: loopClasses,
                scroll: scroll,
                hasClass: hasClass,
                addClass: addClass,
                removeClass: removeClass
            };
        }
    }());

    document.addEventListener('DOMContentLoaded', function() {
         $('.owl-carousel').owlCarousel({
             items: 1,
             center: true
         });

         wow = new WOW({
             mobile: false
         });

         wow.init();
         
         $('#contactForm').parsley();

        swdModule.clickedId('#swd-readBtn', {
            toggleClass: 'swd-hidden',
            toToggle: '#swd-readMore'
        });
        
        document.querySelector('#swd-readBtn').addEventListener('click', function (ele) {
            
            ele.preventDefault();
            if (swdModule.hasClass(document.querySelector('#swd-readBtn'), 'swd-activeBtn')) {
                swdModule.removeClass(document.querySelector('#swd-readBtn'), 'swd-activeBtn');
            } else {
                swdModule.addClass(document.querySelector('#swd-readBtn'), 'swd-activeBtn');
            }
        }, false);
        
        swdModule.clickedId('#swd-cancelForm-js', {
            toggleClass: 'swd-hidden',
            toToggle: '#swd-contactForm-js',
            secondToggleClass: 'swd-hidden',
            secondToToggle: '#swd-talkToUs-js'
        });

        swdModule.scroll({
            toggleClass: 'swd-hidden',
            toToggle: '#swd-contactForm-js'
        });
        
        
        
        window.onscroll = function () {
            // called when the window is scrolled.
            var scrollTop   = document.documentElement.scrollTop || document.body.scrollTop;
            
            if (scrollTop > 1) {
                // object is offset more
                // than 10 pixels from its parent
                if (!swdModule.hasClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active')) {
                    swdModule.addClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active');
                }
            } else {
                if (swdModule.hasClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active')) {
                    swdModule.removeClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active');
                }
            }
        };
 
        
    });