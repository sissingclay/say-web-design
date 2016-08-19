/**
 * Created by claysissing on 18/08/2016.
 */
import { SwdAjax } from './swd.ajax';
//import { ValidateForm } from './swd.validation';
import { SwdHead } from './swd.head';
import { SwdOwl, SwdOwlLogo } from './swd.owl';
import { ReadMore } from './swd.readmore';
import { SwdHeader } from './swd.header';

$(document).ready(function() {
    
    let wow;
    
    SwdHead();
    SwdOwl();
    SwdOwlLogo();
    
    wow = new WOW({
        mobile: false
    });

    wow.init();
    ReadMore();
    
    SwdHeader();

//
//    var touchElements = document.querySelectorAll('.swdTouch-js');
//
//    [].forEach.call(touchElements, function (toggle) {
//
//        // When the smooth scroll link is clicked
//        toggle.addEventListener('touchstart touchend', function(element) {
//            if (swdModule.init.hasClass(element, 'swdTouchHover')) {
//                swdModule.init.removeClass(element, 'swdTouchHover');
//            } else {
//                swdModule.init.addClass(element, 'swdTouchHover');
//            }
//        }, false);
//    });
//
//    swdModule.init.clickedId('#swd-cancelForm-js', {
//        toggleClass: 'swd-hidden',
//        toToggle: '#swd-contactForm-js',
//        secondToggleClass: 'swd-hidden',
//        secondToToggle: '#swd-talkToUs-js'
//    });
//
//    swdModule.init.scroll({
//        toggleClass: 'swd-hidden',
//        toToggle: '#swd-contactForm-js'
//    });
//
//    var validations = document.querySelectorAll('[data-parsley-trigger]');
//
//    [].forEach.call(validations, function(element) {
//
//        element.addEventListener('keypress', function(e) {
//
//            var validation = element.getAttribute('data-parsley-trigger'),
//                isEmailValid;
//
//            if(!this.value) {
//                $(this).addClass('parsley-error');
//
//            } else {
//
//                $(this).removeClass('parsley-error');
//
//                if (validation === 'email') {
//
//                    isEmailValid = swdModule.validation.validateEmail(this.value);
//
//                    if (!isEmailValid) {
//                        $(this).addClass('parsley-error');
//                    } else {
//                        $(this).removeClass('parsley-error');
//                    }
//                }
//            }
//        });
//    });
//
//    document.getElementById('swd-contactBtn_js').addEventListener('click', function (e) {
//
//        e.preventDefault();
//        var data = $( '#contantForm' ).serialize();
//
//        var isValid = swdModule.validateForm('#contantForm');
//
//        if(isValid) {
//            swdModule.ajax.post('http://www.saywebdesign.co.uk/process.php', data).success(function(data) {
//                $('#contantForm').fadeOut(function () {
//                    var element             = document.getElementById('contantForm');
//                    element.innerHTML   = "<div class='pure-u-1-1 swd-footer-title-section'><p>Thanks you for getting in touch. We will get back to you ASAP!</p></div>";
//                    $(this).fadeIn();
//                });
//
//            });
//        }
//    });
//
//
//
//    document.querySelector('.c-nav__mobile').addEventListener('click', function(e) {
//
//        var menu = document.querySelector('.js-nav-toBeToggled'),
//            menuLink = document.querySelectorAll('.js-nav-toBeToggled a'),
//            toogleClass = 'c-nav__showMobile',
//            constains = menu.classList.contains(toogleClass);
//        e.preventDefault();
//
//        if(constains) {
//            menu.classList.remove(toogleClass);
//            [].forEach.call(menuLink, function (val) {
//                val.classList.remove('c-nav__link--animate');
//            });
//        }
//
//        if(!constains) {
//            menu.classList.add(toogleClass);
//            [].forEach.call(menuLink, function (val) {
//                val.classList.add('c-nav__link--animate');
//            });
//        }
//    });
    
    
});