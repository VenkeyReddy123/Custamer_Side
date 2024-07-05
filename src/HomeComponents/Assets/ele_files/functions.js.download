!(function (e) {
    "use strict";
    var t,a, n,
    i = e("body"), 
    o = e(window);
    (n = e("#site-navigation")) && (t = n.find(".menu-toggle")) && (((a = n.find(".mega-menu")) && a.children().length) || t.hide()),
     o.on("hashchange.templatemela", function () {
      var e = document.getElementById(location.hash.substring(1));
      e && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus(), window.scrollBy(0, -80));
     }),
     e(function () {
      if (o.width() > 781) {
       var t, a,
        n = e("#masthead").height();
       n > 48 && i.removeClass("masthead-fixed"),
        i.is(".header-image") &&
         ((t = i.is(".admin-bar") ? e("#wpadminbar").height() : 0),
         (a = e("#masthead").offset().top - t),
         o.on("scroll.templatemela", function () {
          window.scrollY > a && n < 49 ? i.addClass("masthead-fixed") : i.removeClass("masthead-fixed");
         }));
      }
      e(".primary-navigation, .secondary-navigation")
       .find("a")
       .on("focus.templatemela blur.templatemela", function () {
        e(this).parents().toggleClass("focus");
       });
     }),
     e.isFunction(e.fn.masonry) &&
      e("#footer-sidebar").masonry({
       itemSelector: ".widget",
       columnWidth: function (e) {
        return e / 4;
       },
       gutterWidth: 0,
       isResizable: !0,
       isRTL: e("body").is(".rtl"),
      }),
     o.load(function () {
      i.is(".slider") && e(".featured-content").featuredslider({ selector: ".featured-content-inner > article", controlsContainer: ".featured-content" });
     });
   })(jQuery);
   