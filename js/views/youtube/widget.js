define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/youtube',
  'text!templates/youtube/list.html',
  
], function($, _, Backbone, Vm, YoutubeCollection, YoutubeListTemplate){
  var YoutubeWidget=Backbone.View.extend({
    el: '.youtube-widget',
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading=false;
      this.videoLoading = false;

      this.youtubeCollection=new YoutubeCollection();
      that=this;
         $(window).scroll(function() {
            that.checkScroll(); //change "this" to "that"
        });

    },
    render: function () {
      this.loadResults();
    },
  
    loadResults: function () {
      var that=this;
      console.log(that.videoLoading);
      if (that.videoLoading == false){
      $('body').addClass('stop-scrolling');
      that.videoLoading = true;
      // we are starting a new load of results so set isLoading to true
      this.isLoading=true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.youtubeCollection.fetch({ 
        success: function (feeds) {
          
         $(that.el).append(_.template(YoutubeListTemplate, {feeds: feeds.toJSON()}));
          // Now we have finished loading set isLoading back to false
          that.isLoading=false;
          that.videoLoading = false;
          that.image_fade();
          $('body').removeClass('stop-scrolling');
        }
      });      
      }
    },


 

image_fade:function () {

    $('img').bind('load', function () {
     
     $("ul[data-liffect] li .youtube-img").each(function (i) {
        $(this).attr("style", "-webkit-animation-delay:" + 200 + "ms;"
                + "-moz-animation-delay:" + 200 + "ms;"
                + "-o-animation-delay:" +  200 + "ms;"
                + "animation-delay:" +  200 + "ms;");
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
      
      if (totalVideoLoaded != totalVideoCount){

      if  ($(window).scrollTop() == $(document).height() - $(window).height()){
          $('#loader').removeClass('hide');
          this.youtubeCollection.page += 12; // Load next page
         this.loadResults();
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
