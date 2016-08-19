var swdModule = swdModule || {};

swdModule.init = (function () {

    'use strict';

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        var ce = function (selector) {

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
                toggleElement   = ce(selector),
                toggleClass     = data.toggleClass,
                toToggle        = ce(data.toToggle);

            if(data.secondToToggle) {
                var secondToToggle  = ce(data.secondToToggle),
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
                    toToggle        = ce(data.toToggle);
                    toggle(toToggle, toggleClass);
                });
            });
        };

        var scroll = function (data) {

            var scrollToggle    = document.querySelectorAll('.swd-scroll'),
                toggleContent   = document.querySelector('#swd-talkToUs-js'),
                toToggle        = ce(data.toToggle),
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

                    console.log('dataID', dataID);

                    // If the anchor exists
                    if (dataID) {
                        // Scroll to the anchor
                        $("html, body").animate({ scrollTop: $(dataID).offset().top }, 700);

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

        var allLoaded = function() {

            var allLinks = document.getElementsByTagName('A'),
                template, menu;

            [].forEach.call(allLinks, function(val) {

                if (val.hostname === '/* @echo HOSTNAME */') {

                    val.addEventListener('click', function(e) {

                        e.preventDefault();

                        if (this.pathname !== window.location.pathname) {
                            if (this.pathname === '/') {
                                getTemplate('index.html');
                            }

                            if (this.pathname !== '/') {
                                template = this.pathname.replace('/', '');
                                getTemplate(template);
                            }
    
                            window.history.pushState({}, '', this.href);
                            
                            if(typeof ga !== 'undefined') {
                                ga('set', 'page', this.pathname);
                                ga('send', 'pageview');
                            }
    
                            menu = document.querySelectorAll('.c-nav a');
                            
                            [].forEach.call(menu, function(val) {
                                val.classList.remove('c-nav__link--active');
                                if (val.href === window.location.href) {
                                    val.classList.add('c-nav__link--active');
                                }
                            });
                        }
                    });
                }
            });

            function getTemplate(templateName) {

                nunjucks.render(templateName, function(err, res) {

                    $('html, body').animate({ scrollTop: 0 }, 250,
                        function() {
                            document.querySelector('.slider').classList.add('slider-overlay');
                        });

                    /* Listen for a transition! */
                    $('.slider').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                        
                        document.querySelector('main').innerHTML = res;
                        swdModule.init.owl();

                        if($(".owl-example-logos")) {
                            swdModule.init.owlLogos();
                        }

                        swdModule.init.scroll({
                            toggleClass: 'swd-hidden',
                            toToggle: '#swd-contactForm-js'
                        });

                        swdModule.init.clickedId('#swd-readBtn', {
                            toggleClass: 'swd-hidden',
                            toToggle: '#swd-readMore'
                        });

                        var readMore = document.querySelector('#swd-readBtn');

                        if (readMore) {
                            readMore.addEventListener('click', function (ele) {

                                ele.preventDefault();
                                if (swdModule.init.hasClass(document.querySelector('#swd-readBtn'), 'arrow-box_down')) {
                                    swdModule.init.removeClass(document.querySelector('#swd-readBtn'), 'arrow-box_down');
                                    swdModule.init.addClass(document.querySelector('#swd-readBtn'), 'arrow-box_up');
                                    $('.swd-readBtn_more').hide();
                                    $('.swd-readBtn_less').fadeIn();
                                } else {
                                    swdModule.init.removeClass(document.querySelector('#swd-readBtn'), 'arrow-box_up');
                                    swdModule.init.addClass(document.querySelector('#swd-readBtn'), 'arrow-box_down');
                                    $('.swd-readBtn_less').hide();
                                    $('.swd-readBtn_more').fadeIn();
                                }
                            }, false);
                        }

                        var menu = document.querySelector('.js-nav-toBeToggled'),
                            menuLink = document.querySelectorAll('.js-nav-toBeToggled a'),
                            toogleClass = 'c-nav__showMobile',
                            constains = menu.classList.contains(toogleClass);

                        if(constains) {
                            menu.classList.remove(toogleClass);
                            [].forEach.call(menuLink, function (val) {
                                val.classList.remove('c-nav__link--animate');
                            });
                        }

                        if(document.querySelector('.slider').classList.contains('slider-overlay')) {
                            document.querySelector('.slider').classList.remove('slider-overlay');
                        }
                    });
                });
            }
        };

        return {
            owl: owl,
            owlLogos: owlLogos,
            clickedId: init,
            clickedClass: loopClasses,
            scroll: scroll,
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            allLoaded: allLoaded
        };
    }
})();