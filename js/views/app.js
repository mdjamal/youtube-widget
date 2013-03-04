define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
	'events',
  'text!templates/layout.html' 
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView=Backbone.View.extend({
    el: '#video-container',
    initialize: function () {
      $("#back-top").hide();
      $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
      } else {
        $('#back-top').fadeOut();
      }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });
      
    },
    render: function () {
			var that=this;

      $(this.el).html(layoutTemplate);
      Backbone.history.start();
		},
       events : {
        'click .reverse' : 'reverse',
        // 'scroll #video-container': 'checkScroll'
    },
        reverse : function() {
        var list=$('ul');
        var listItems=list.children('li');
        list.html(listItems.get().reverse());
    },
	});
  return AppView;
});
