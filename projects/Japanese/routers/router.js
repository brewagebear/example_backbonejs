var app = app || {};
(function() {
    'use strict';
    var views = app.view = app.view || {};

    app.Router = Backbone.Router.extend({
        routes: {
            '*home': 'homeRoute',
            'about': 'aboutRoute',
            'contact': 'contactRoute'
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
})();
