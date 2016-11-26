var app = (function(){

    var api = {
      views: {},
      models: {},
      collections: {},
      content: null,
      router: null,
      todos: null,
      init: function(){
        this.content = $("#content");
        this.todos = new api.collcetions.ToDos();
        ViewsFactory.menu();
        return this;
      },
      changeContent: function(el){
        this.content.empty().append(el);
        return this;
      },
      title: function(str){
        $("#h1").text(str);
        return this;
      }
    };
    var ViewsFactory = {
      menu: function(){
        if(!this.menuView){
          this.menuView = new api.views.menu({
            el: $("#menu")
          });
        }
        return this.menuView;
      },
      list: function(){
        if(!this.listView){
          this.listView = new api.views.list({
            modle: api.todos
          });
        }
        return this.listView;
      }
    };
    var Router = Backbone.Router.extend({
      routes:{
        "archive" : "archive",
        "new" : "newTodo",
        "edit/:index" : "editTodo",
        "delete/:index" : "delteTodo",
        "" : "list"
      },
      list: function(archive){
        var view = ViewsFactory.list();
        api
        .title(archive ? "Archive" : "Your Todos:")
        .changeContent(view.$el);
        view.setMode(archive ? "archive" : null).render();
      },
      archive: function(){},
      newTodo: function(){},
      editTodo: function(){},
      delteTodo: function(){}
    });

    api.router = new Router();
    return api;
})();
