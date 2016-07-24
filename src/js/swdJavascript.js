var swdModule = swdModule || {};

swdModule.init = (function () {

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
                var endLocation = anchor.offsetTop - 80;
                var distance = endLocation - startLocation;
                var increments = distance/(duration/18);
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

            var owl = function () {
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

            var owlLogos = function () {
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
                            margin: 20
                        }
                    }

                });
            }


            var animate = function (oldContent, newContent) {
    
                oldContent.className = oldContent.className + ' cc__removing';

                var fadeIn = newContent.animate({
                    opacity: [1, 1]
                }, 300);

                fadeIn.onfinish = function() {
                    oldContent.parentNode.removeChild(oldContent);
                };
            }

            return {
                owl: owl,
                owlLogos: owlLogos,
                animate: animate,
                clickedId: init,
                clickedClass: loopClasses,
                scroll: scroll,
                hasClass: hasClass,
                addClass: addClass,
                removeClass: removeClass
            };
        }
    }());

    $(document).ready(function() {
        
        if( $(".swd-header").size() > 0) {
            if (document.createStyleSheet){
                document.createStyleSheet('//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css');
                document.createStyleSheet('css/defer.min.css');
            } else {
                $("head").append($("<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css'>"));
                $("head").append($("<link rel='stylesheet' href='css/defer.min.css'>"));
            }
        }

        swdModule.init.owl();

        if($(".owl-example-logos")) {
            swdModule.init.owlLogos();
        }

         wow = new WOW({
             mobile: false
         });

         wow.init();
         
         //$('#contactForm').parsley();

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
        
        var touchElements = document.querySelectorAll('.swdTouch-js');
        
        [].forEach.call(touchElements, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('touchstart touchend', function(element) {
                if (swdModule.init.hasClass(element, 'swdTouchHover')) {
                    swdModule.init.removeClass(element, 'swdTouchHover');
                } else {
                    swdModule.init.addClass(element, 'swdTouchHover');
                }
            }, false);
        });
        
        swdModule.init.clickedId('#swd-cancelForm-js', {
            toggleClass: 'swd-hidden',
            toToggle: '#swd-contactForm-js',
            secondToggleClass: 'swd-hidden',
            secondToToggle: '#swd-talkToUs-js'
        });

        swdModule.init.scroll({
            toggleClass: 'swd-hidden',
            toToggle: '#swd-contactForm-js'
        });
        
        var validations = document.querySelectorAll('[data-parsley-trigger]');
        
        [].forEach.call(validations, function(element) {
            
            element.addEventListener('keypress', function(e) {
                
                var validation = element.getAttribute('data-parsley-trigger'),
                    isEmailValid;
                    
                if(!this.value) {
                    $(this).addClass('parsley-error');
                    
                } else {
                    
                    $(this).removeClass('parsley-error');

                    if (validation === 'email') {
                        
                        isEmailValid = swdModule.validation.validateEmail(this.value);
                        
                        if (!isEmailValid) {
                            $(this).addClass('parsley-error');
                        } else {
                            $(this).removeClass('parsley-error');
                        }
                    }
                }
            });
        });
        
        document.getElementById('swd-contactBtn_js').addEventListener('click', function (e) {
            
            e.preventDefault();
            var data = $( '#contantForm' ).serialize();
            
            var isValid = swdModule.validateForm('#contantForm');
            
            if(isValid) {
                swdModule.ajax.post('http://www.saywebdesign.co.uk/process.php', data).success(function(data) {
                    $('#contantForm').fadeOut(function () {
                        var element             = document.getElementById('contantForm');
                        element.innerHTML   = "<div class='pure-u-1-1 swd-footer-title-section'><p>Thanks you for getting in touch. We will get back to you ASAP!</p></div>";
                        $(this).fadeIn();
                    });

                });
            }
        });
        
        window.onscroll = function () {
            // called when the window is scrolled.
            var scrollTop   = document.documentElement.scrollTop || document.body.scrollTop;
            
            if (scrollTop > 150) {
                // object is offset more
                // than 10 pixels from its parent
                if (!swdModule.init.hasClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active')) {
                    swdModule.init.addClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active');
                    swdModule.init.addClass(document.querySelector('#swd-header-social-js'), '_show');
                }
            } else {
                if (swdModule.init.hasClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active')) {
                    swdModule.init.removeClass(document.querySelector('#swd-logo-js'), 'swdBoxSlider-active');
                    swdModule.init.removeClass(document.querySelector('#swd-header-social-js'), '_show');
                }
            }
        };

        document.querySelector('.c-nav__mobile').addEventListener('click', function(e) {

            var menu = document.querySelector('.js-nav-toBeToggled'),
                menuLink = document.querySelectorAll('.js-nav-toBeToggled a'),
                toogleClass = 'c-nav__showMobile',
                constains = menu.classList.contains(toogleClass);
            e.preventDefault();

            if(constains) {
                menu.classList.remove(toogleClass);
                [].forEach.call(menuLink, function (val) {
                    val.classList.remove('c-nav__link--animate');
                });
            }

            if(!constains) {
                menu.classList.add(toogleClass);
                [].forEach.call(menuLink, function (val) {
                    val.classList.add('c-nav__link--animate');
                });
            }
        });
 
        
    });

swdModule.validateForm = (function () {
    
   validateForm = function (element) {
        //Validates that form elements are not empty
        var ele         = document.querySelector(element),
            eleElements = ele.elements,
            eleLength   = ele.elements.length,
            i,
            isVaild     = true,
            validation,
            isEmailValid;
        
        for(i=0; i < eleLength; i++) {
            
            validation = eleElements[i].getAttribute('data-parsley-trigger');
            
            if (validation === 'email') {
                        
                isEmailValid = swdModule.validation.validateEmail(eleElements[i].value);

                if (!isEmailValid) {
                    $(eleElements[i]).addClass('parsley-error');
                    isVaild = false;
                }
            } else {
                
                if(eleElements[i].value === null ||
                    eleElements[i].value === "") {

                     if(!eleElements[i].value) {
                         $(eleElements[i]).addClass('parsley-error');
                     }

                     isVaild = false;
                 }
            }
        }
        
        return isVaild;
    };
    
    return validateForm;
})();

swdModule.ajax = (function() {

    var parse = function(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function(type, url, data) {
        var methods = {
            success: function(callback) {
                this.success = callback;
                return this;
            },
            error: function(callback) {
                this.error = callback;
                return this;
            }
        };
        var XHR = XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    methods.success.apply(methods, parse(request));
                } else {
                    methods.error.apply(methods, parse(request));
                }
            }
        };
        request.send(data);
        return methods;
    };

    return {
        get: function(url) {
            return xhr('GET', url);
        },
        post: function(url, data) {
            return xhr('POST', url, data);
        }
    };

})();

swdModule.validation = (function () {
    
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    
    return {
        validateEmail: validateEmail
    };
})();