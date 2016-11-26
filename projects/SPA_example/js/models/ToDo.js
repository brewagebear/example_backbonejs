app.models.Todo = Backbone.Model.extend({
  defaults: {
    title: "Todo",
    archived: false,
    done: false
  }
});
