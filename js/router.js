// Filename: router.js
define([
  'jquery',

  'underscore',
  'backbone',
  'vm',
  'bootstrap',

], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
     // '*actions': 'defaultAction', // All urls will trigger this route
        "": "home",
        "video/:id": "urlFilter"
    },

    urlFilter: function(id) {
        showModal(id);
    },

    home: function() {
      closeModal();
    }
  });


var video_id = '';
var modal = '<div id="myModal" class="modal fade"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h3 id="myModalLabel">Enjoy the video</h3></div><div class="modal-body"><iframe width="550" height="309" src="" frameborder="0" allowfullscreen></iframe></div><div class="modal-footer"></div></div>';
var iframe_src = '';
 

function showModal(id) {
  $('body').append(modal);
  $('#myModal').modal();
  iframe_src = 'http://www.youtube.com/embed/'+id+'?rel=0&showinfo=0&iv_load_policy=3';
  $('iframe').attr('src', iframe_src);
}

function closeModal() {
  $('#myModal').modal('hide');
}


  // close and remove modal
  $(document).on('hidden', '#myModal', function(){
    $('#myModal').modal('hide');

    $('#myModal').remove();
    appRouter.navigate("/", {trigger: true});
  });


var appRouter = new AppRouter();

  var initialize = function(options){

		var appView = options.appView;
    var router = new AppRouter(options);

		
			require(['views/youtube/widget'], function (YoutubeWidget) {
        var youtubeWidget = Vm.create(appView, 'YoutubeWidget', YoutubeWidget);
        youtubeWidget.render();
      });
		
 
    

  };
  return {
    initialize: initialize
  };
});
