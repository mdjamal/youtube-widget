define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  
VideoCollection=Backbone.Collection.extend({
 url: function () {
      return 'https://gdata.youtube.com/feeds/api/playlists/PL5E6FCBCECB6B7946?&v=2&start-index='+this.page+'&max-results=12&alt=jsonc&orderby=reversedPosition'          
    },


    initialize : function(){
            this.sort_order='desc';
           
        },
    
    
        parse: function(response) {
          //console.log(response.data.totalItems);
          $('#video-count').html(response.data.totalItems);

            //modify view count to be more readable
            $.each(response.data.items, function(i,val) {

                val.video.viewCount=val.video.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              });

            //truncate title
            $.each(response.data.items, function(i,val) {
                var string=val.video.title; 
                var length=21; 
                val.video.title=string.length > length ? string.substring(0, length - 3) + "..." : string.substring(0, length);
                
              });
            return response.data.items;
        },
        // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
          
          pass_url=this.url();
          console.log(pass_url);
            var that=this;
                var params=_.extend({
                    type: 'GET',
                    dataType: 'json',
                    url: pass_url,
                    processData: true
                }, options);

            return $.ajax(params);
        },
        comparator: function(video) {
            var position=video.get('position');
            return this.sort_order == 'desc'
                ? -position
                : position     
        },
        reverse: function() {
            this.sort_order=this.sort_order == 'desc' ? 'asc' : 'desc';
            this.sort();
        },
        page:1,

    });





  return VideoCollection;
});
