var swdModule=swdModule||{};swdModule.init=function(){"use strict";if("querySelector"in document&&"addEventListener"in window&&Array.prototype.forEach){var e=function(e){var t=e.charAt(0);return"."===t?loopElements(document.querySelectorAll(e)):document.querySelector(e)},t=function(t,o){var o=o||{},s=e(t),n=o.toggleClass,d=e(o.toToggle);if(o.secondToToggle)var a=e(o.secondToToggle),l=o.secondToggleClass;s&&s.addEventListener("click",function(e){e.preventDefault(),r(d,n),o.secondToToggle&&r(a,l)})},o=function(t,o){[].forEach.call(document.querySelectorAll(t),function(t){t.addEventListener("click",function(t){t.preventDefault(),toggleClass=o.toggleClass,toToggle=e(o.toToggle),r(toToggle,toggleClass)})})},s=function(e,t){var o,s=window.pageYOffset,n=e.offsetTop-80,r=n-s,d=r/(t/18),a=function(){window.scrollBy(0,d),o()};o=d>=0?function(){var e=window.pageYOffset;(e>=n-d||window.innerHeight+e>=document.body.offsetHeight)&&clearInterval(l)}:function(){var e=window.pageYOffset;(n||0)>=e&&clearInterval(l)};var l=setInterval(a,12)},n=function(t){var o=document.querySelectorAll(".swd-scroll"),n=document.querySelector("#swd-talkToUs-js"),r=e(t.toToggle),d=t.toggleClass;[].forEach.call(o,function(e){e.addEventListener("click",function(t){t.preventDefault();{var o=e.getAttribute("href"),c=e.getAttribute("data-swd-speed"),i=e.getAttribute("data-swd-element");document.querySelector(i)}if(o)var u=document.querySelector(o);u?(s(u,c||700),a(n,"swd-hidden"),l(r,d)):(a(n,"swd-hidden"),l(r,d))},!1)})},r=function(e,t){d(e,t)?l(e,t):a(e,t)},d=function(e,t){return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},a=function(e,t){d(e,t)||(e.className+=" "+t)},l=function(e,t){if(d(e,t)){var o=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(o," ")}};return{clickedId:t,clickedClass:o,scroll:n,hasClass:d,addClass:a,removeClass:l}}}(),$(document).ready(function(){$(".swd-header").size()>0&&(document.createStyleSheet?(document.createStyleSheet("//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css"),document.createStyleSheet("dist/css/defer.min.css")):($("head").append($("<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css'>")),$("head").append($("<link rel='stylesheet' href='dist/css/defer.min.css'>")))),$(".owl-carousel").owlCarousel({items:1,nav:!0,center:!0,navText:["",""],loop:!0}),wow=new WOW({mobile:!1}),wow.init(),swdModule.init.clickedId("#swd-readBtn",{toggleClass:"swd-hidden",toToggle:"#swd-readMore"}),document.querySelector("#swd-readBtn").addEventListener("click",function(e){e.preventDefault(),swdModule.init.hasClass(document.querySelector("#swd-readBtn"),"arrow-box_down")?(swdModule.init.removeClass(document.querySelector("#swd-readBtn"),"arrow-box_down"),swdModule.init.addClass(document.querySelector("#swd-readBtn"),"arrow-box_up"),$(".swd-readBtn_more").hide(),$(".swd-readBtn_less").fadeIn()):(swdModule.init.removeClass(document.querySelector("#swd-readBtn"),"arrow-box_up"),swdModule.init.addClass(document.querySelector("#swd-readBtn"),"arrow-box_down"),$(".swd-readBtn_less").hide(),$(".swd-readBtn_more").fadeIn())},!1);var e=document.querySelectorAll(".swdTouch-js");[].forEach.call(e,function(e){e.addEventListener("touchstart touchend",function(e){swdModule.init.hasClass(e,"swdTouchHover")?swdModule.init.removeClass(e,"swdTouchHover"):swdModule.init.addClass(e,"swdTouchHover")},!1)}),swdModule.init.clickedId("#swd-cancelForm-js",{toggleClass:"swd-hidden",toToggle:"#swd-contactForm-js",secondToggleClass:"swd-hidden",secondToToggle:"#swd-talkToUs-js"}),swdModule.init.scroll({toggleClass:"swd-hidden",toToggle:"#swd-contactForm-js"});var t=document.querySelectorAll("[data-parsley-trigger]");[].forEach.call(t,function(e){e.addEventListener("keypress",function(t){var o,s=e.getAttribute("data-parsley-trigger");this.value?($(this).removeClass("parsley-error"),"email"===s&&(o=swdModule.validation.validateEmail(this.value),o?$(this).removeClass("parsley-error"):$(this).addClass("parsley-error"))):$(this).addClass("parsley-error")})}),document.getElementById("swd-contactBtn_js").addEventListener("click",function(e){e.preventDefault();var t=$("#contantForm").serialize(),o=swdModule.validateForm("#contantForm");o&&swdModule.ajax.post("http://www.saywebdesign.co.uk/process.php",t).success(function(e){$("#contantForm").fadeOut(function(){var e=document.getElementById("contantForm");e.innerHTML="<div class='pure-u-1-1 swd-footer-title-section'><p>Thanks you for getting in touch. We will get back to you ASAP!</p></div>",$(this).fadeIn()})})}),window.onscroll=function(){var e=document.documentElement.scrollTop||document.body.scrollTop;e>150?swdModule.init.hasClass(document.querySelector("#swd-logo-js"),"swdBoxSlider-active")||(swdModule.init.addClass(document.querySelector("#swd-logo-js"),"swdBoxSlider-active"),swdModule.init.addClass(document.querySelector("#swd-header-social-js"),"_show")):swdModule.init.hasClass(document.querySelector("#swd-logo-js"),"swdBoxSlider-active")&&(swdModule.init.removeClass(document.querySelector("#swd-logo-js"),"swdBoxSlider-active"),swdModule.init.removeClass(document.querySelector("#swd-header-social-js"),"_show"))}}),swdModule.validateForm=function(){return validateForm=function(e){var t,o,s,n=document.querySelector(e),r=n.elements,d=n.elements.length,a=!0;for(t=0;d>t;t++)o=r[t].getAttribute("data-parsley-trigger"),"email"===o?(s=swdModule.validation.validateEmail(r[t].value),s||($(r[t]).addClass("parsley-error"),a=!1)):(null===r[t].value||""===r[t].value)&&(r[t].value||$(r[t]).addClass("parsley-error"),a=!1);return a},validateForm}(),swdModule.ajax=function(){var e=function(e){var t;try{t=JSON.parse(e.responseText)}catch(o){t=e.responseText}return[t,e]},t=function(t,o,s){var n={success:function(e){return this.success=e,this},error:function(e){return this.error=e,this}},r=XMLHttpRequest||ActiveXObject,d=new r("MSXML2.XMLHTTP.3.0");return d.open(t,o,!0),d.setRequestHeader("Content-type","application/x-www-form-urlencoded"),d.onreadystatechange=function(){4===d.readyState&&(200===d.status?n.success.apply(n,e(d)):n.error.apply(n,e(d)))},d.send(s),n};return{get:function(e){return t("GET",e)},post:function(e,o){return t("POST",e,o)}}}(),swdModule.validation=function(){function e(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)}return{validateEmail:e}}();