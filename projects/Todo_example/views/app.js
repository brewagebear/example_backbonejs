var app = app || {};

// **Appview**는 UI최상단에 위치하는 컴포넌트이다.
app.Appview =  Backbone.View.extend({
  //기존에 있는 HTML요소에 바ㄴ인딩한다.
  el: "#todoapp",
  //어플리케이션 하단에 있는 통계정보 출력란에 필요한 템플릿
  statsTemplate : _.template($('#stats-Template'.html())),

  //새로운 아이템이 만들어질때나, 아이템이 완료되었을때 발생하는 이벤트처리 위임.
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed' : 'clearCompleted',
    'click #toggle-all' : 'toggleAllCompleted'
  },

  //initialize에서 항목이 추가되거나 변경될 때 필요한 'Todos' 콜렉션에 관련 이벤트 바인딩
  //localstorage에 저장될 가능성이 있는 기존의 모든 항목들을 초기화.
  initialize: function () {
    this.allCheckbox = this.$('#toggle-all')[0];
    // this.$()는 this.$el과 연관된 요소를 찾는다.
    this.$input = this.$('new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);
    this.listenTo(app.Todos, 'change:completed', this.filterOne);
    this.listenTo(app.Todos, 'filter', this.filterAll);
    this.listenTo(app.Todos, 'all', this.render);

    app.Todo.fetch();
  },
  render: function(){
    var completed = app.Todos.completed().length;
    var remaining = app.Todos.remaining().length;

    if(app.Todos.length){
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        completed : completed,
        remaining : remaining
      }));

      this.$('#filters li a')
      .removeClass('selected')
      .filter('[href="#/' + (app.TodoFilter || '') + '"]')
      .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },
  //뷰 생성 및 목록에서 단일 todo 항목 추가 뷰를 <ul> 태그에 렌더링.
  addOne : function(todo){
    var view = new app.TodoView({model : todo});
    $('#todo-list').append(view.render().el);
  },
  // **Todos** 전역콜렉션에 선언된 모든 아이템을 한번에 추가.
  addAll : function(){
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this);
  },
  filterOne : function(todo){
    todo.trigger('visible');
  },
  filterAll : function(){
    app.Todos.each(this.filterOne, this);
  },
  //새로운 todo항목을 위한 속성을 생성한다.
  newAttributes : function(){
    return {
      title : this.$input.val().trim(),
      order : app.Todos.nextOrder(),
      completed : false
    };
  },

  //input 필드에서 'return'키를 누르면 새로운 Todo모델을 만들고 이를 localstorage에 저장한다.
  createOnEnter : function(){
    if(event.which !== ENTER_KEY || !this.$input.val().trim()){
      return;
    }

    app.Todos.create(this.newAttributes());
    this.$input.val('');
  },

  //완료된 todo항목들을 모두 삭제하고, 모델도 삭제한다.
  clearCompleted : function(){
    _.invoke(app.Todos.completed(), 'destroy');
    return false;
  },

  toggleAllCompleted : function(){
    var completed = this.allCheckbox.checked;

    app.Todos.each(function(todo){
      todo.save({
        'completed': completed
      });
    });
  }
});
