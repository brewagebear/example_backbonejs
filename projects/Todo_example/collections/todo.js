var app = app || {};

//*localstorage에 저장되는 콜렉션
var TodoList = Backbone.Collection.extend({
  //컬렉션의 모델 참조
  model: app.Todo,

  // "todos-backbone" 네임스페이스 아래 모든 todo 항목들을 저장.
  // 콘솔에서 테스트할때 주석처리해야지 된다.
  localstorage : new Backbone.LocalStorage('todos-backbone'),
  // 완료된 항목들 추출
  completed : function(){
    return this.filter(function(todo){
      return todo.get('completed');
    });
  },

  remaining : function(){
    // apply는 함수 스코프안에서 this를 정의하게끔함.
    return this.whthout.apply(this, this.completed());
  },
  //DB내에서 특별한 순서 없이 저장이 되었다고 해도 순번을 유지하게끔 함.
  // 이는 새로운 항목을 위해 다음 순번을 정한다.
  nextOrder : function(){
    if(!this.length){
      return 1; //현재 아무것도 없을때 1을 반환
    }
    return this.last().get('order') + 1; //값이 있을 경우에는 현재 마지막값에 +1 한 값을 리턴
  },
  //Todo는 삽입된 순서대로 정렬
  comparator : function(todo){
    return todo.get('order');
  }
});
// **Todos** 전역 콜렉션 생성
app.Todos = new TodoList();
