var app = app || {};
(function() {
    'use strict';
    var views = app.view = app.view || {};
    views.Application = Backbone.View.extend({
        initialize: function() {
            // caching the jQuery object on init
            this.$content = this.$('#content');
        },
        setContent: function(view) {
            var content = this.content;
            if (content) content.remove();
            content = this.content = view;
            this.$content.html(content.render().el);
        },
    });

    // make a view for each sub-page
    views.Home = Backbone.View.extend({
     /* ... */
   });
    views.About = Backbone.View.extend({
    /* ... */
  });
    views.Contact = Backbone.View.extend({
    /* ... */
  });
})();
