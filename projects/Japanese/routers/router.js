var app = app || {};
(function() {
    'use strict';
    var views = app.view = app.view || {};

    app.Router = Backbone.Router.extend({
        routes: {
            'about': 'aboutRoute',
            'contact': 'contactRoute',
            '*home': 'homeRoute'
        },
        _bindRoutes: function() {
          if (!this.routes) return;
          this.routes = _.result(this, 'routes');
          var route, routes = _.keys(this.routes);
          while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
          }
        },
        initialize: function() {
            // create the layout once here
            this.layout = new views.Application({
                el: 'body',
            });
        },
        homeRoute: function() {
            var view = new views.Home();
            this.layout.setContent(view);
        },
        aboutRoute: function() {
            var view = new views.About();
            this.layout.setContent(view);
        },
        contactRoute: function() {
            var view = new views.Contact();
            this.layout.setContent(view);
        }
      });
      var router = new app.Router();
      Backbone.history.start();
})();
