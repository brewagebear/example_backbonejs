var app = app || {};
(function() {
    'use strict';
    //views linitalize
    var views = app.view = app.view || {};
    views.Application = Backbone.View.extend({
        initialize: function() {
            // caching the jQuery object on init
            this.$content = this.$('#content');
            this.$loading = this.$('#loading');
        },
        setContent: function(view) {
            var content = this.content;
            if (content) content.remove();
            this.showSpinner();
            content = this.content = view;
            //content rednering
            this.$content.html(content.render().el, this.hideSpinner());
        },
        showSpinner: function() {
          this.$loading.show();
        },
        hideSpinner: function() {
          this.$loading.hide();
        },
    });
    views.Home = Backbone.View.extend({
    });
    views.About = Backbone.View.extend({
      initialize: function(){
        this.render();
        alert('어바웃 페이지입니다.');
      },
      render: function(){
        var template =  _.template("<strong>About page</strong>");
      }
    });
    views.Contact = Backbone.View.extend({
      my_template: _.template("<strong>Contact page</strong>"),
    });
})();
