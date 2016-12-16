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
            //view.test();

            this.$content.html(content.render().el, this.hideSpinner());
            //this.$content.on('render', this.hideSpinner());
        },
        loadSubMenu: function(){
          var slidemenu = new views.slideMenu();
          slidemenu.render();
        },
        showSpinner: function() {
          this.$loading.show();
        },
        hideSpinner: function() {
          this.$loading.hide();
        }
    });
    // make a view for each sub-page
    views.slideMenu = Backbone.View.extend({
      initialize: function(){
        this.model = app.Models;
        this.$slideMenu = this.$('#menu');
        this.render();
      },
      render : function(){
        this.$slideMenu.html(menu.get('title'));
        //this.$el.html(this.template(this.model.toJSON())).appendTo('body');
      }
    });
    views.Home = Backbone.View.extend({
      initialize: function(){

      },
      test : function(){
       console.log("홈페이지입니다.");
     }
    });

    views.About = Backbone.View.extend({
      my_template: _.template("<strong>About 페이지입니다.</strong>"),
      //this.$el.render();
    });
    views.Contact = Backbone.View.extend({
      my_template: _.template("<strong>Contact 페이지입니다.</strong>"),
      //this.$el.render();
    });
})();
