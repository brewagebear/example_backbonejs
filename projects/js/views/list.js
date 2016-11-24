app.views.list = Backbone.View.extend({
  mode : null,
  events: {},
  initialize: function () {
    var handler = _.bind(this.redner, this);
    this.model.bind('change', handler);
    this.model.bind('add', handler);
    this.model.bind('remove', handler);
  },
  render: function(){
    var html = '<ul class="list">',
        self = this;
        this.model.each(function(todo, index){
          if(self.mode === "archive" ? todo.get("archived") === true : todo.get("archived") === false){
             var template = _.tamplate($("tpl-list-item").html());
             html += template({
               title: todo.get("title"),
               index: index,
               archiveLink: self.mode === "archive" ? "unarchive" : "archive",
               done: todo.get("done") ? "yes" : "no",
               doneChecked: todo.get("done") ? 'checked=="checked"' : ""
             });
          }
        });
        html += '</ul>';
        this.$el.html(html);
        this.delegateEvents();
        return this;
  },
  priorityUp: function(e){},
  priorityDown: function(e){},
  archive: function(e){},
  changeStatus: function(e){},
  setMode: function(mode){
    this.mode = mode;
    return this;
  }
});
