var app = app || {};
(function() {
    'use strict';
    //views linitalize
    var views = app.view = app.view || {};
    views.Application = Backbone.View.extend({
        initialize: function() {
            // caching the jQuery object on init
            this.$content = this.$('#content');
            //this.$loading = this.$('#loading');
        },
        setContent: function(view) {
            var content = this.content;
            if (content) content.remove();
            content = this.content = view;
            //content rednering
            this.$content.html(content.render().el);
        },
        showSpinner: function() {
          this.$loading.show();
        },
        hideSpinner: function() {
          this.$loading.hide();
        }
    });
    views.Home = Backbone.View.extend({
      render: function() {
       var template = _.template("<strong><% print('Hello ' + page); %></strong>");
       var pageTxt = {page: "Home"};
       var html = template(pageTxt);
       this.$el.html(html);
       return this;
      }
    });
    views.About = Backbone.View.extend({
      render: function() {
       var template = _.template("<strong><% print('Hello ' + page); %></strong>");
       var pageTxt = {page: "About"};
       var html = template(pageTxt);
       this.$el.html(html);
       return this;
      }
    });
    views.Contact = Backbone.View.extend({
      render: function() {
       var template = _.template("<strong><% print('Hello ' + page); %></strong>");
       var pageTxt = {page: "Contact"};
       var html = template(pageTxt);
       this.$el.html(html);
       return this;
      }
    });
})();
