define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/youtube',
  'text!templates/youtube/list.html',
  'socialite',

], function($, _, Backbone, Vm, YoutubeCollection, YoutubeListTemplate){
  var YoutubeWidget=Backbone.View.extend({
    el: '.youtube-widget',
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading=false;

      this.youtubeCollection=new YoutubeCollection();
      that=this;
         $(window).scroll(function() {
            that.checkScroll(); //change "this" to "that"
        });

    },
    render: function () {
      this.loadResults();
    },
    //    events : {
    //     'mouseenter li' : 'loadSocialite',
    //     // 'scroll #video-container': 'checkScroll'
    // },
    loadSocialite: function(){
   //Socialite.load($(this)[0]);
   Socialite.load();
    },

   

    loadResults: function () {
      var that=this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading=true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.youtubeCollection.fetch({ 
        success: function (feeds) {
          
         $(that.el).append(_.template(YoutubeListTemplate, {feeds: feeds.toJSON()}));
          // Now we have finished loading set isLoading back to false
          that.image_fade();
          that.loadSocialite();
          that.isLoading=false;
        }
      });      
    },



image_fade:function () {

    $('img').bind('load', function () {
     
     $("ul[data-liffect] li").each(function (i) {
        $(this).attr("style", "-webkit-animation-delay:" + i * 200 + "ms;"
                + "-moz-animation-delay:" + i * 300 + "ms;"
                + "-o-animation-delay:" + i * 300 + "ms;"
                + "animation-delay:" + i * 300 + "ms;");
        if (i == $("ul[data-liffect] li").size() -1) {
            $("ul[data-liffect]").addClass("play")
        }
    });
 

     });
},
    
    checkScroll: function () {
      $('#loader').addClass('hide');
      var totalVideoCount=$('#video-count').text();
      var totalVideoLoaded=$('.youtube-widget li').size();
      console.log( totalVideoCount + '/'+ totalVideoLoaded);

      if (totalVideoLoaded != totalVideoCount){

      if  ($(window).scrollTop() == $(document).height() - $(window).height()){
          $('#loader').removeClass('hide');
          this.youtubeCollection.page += 12; // Load next page
          this.loadResults();
          this.loadSocialite();
          this.image_fade();
          
          
        }
      
     }
     else
     {
                $('#complete').removeClass('hide');
     }
    }
  });
  return YoutubeWidget;
});
