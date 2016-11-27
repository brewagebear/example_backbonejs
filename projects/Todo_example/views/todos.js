var app = app || {};

(function ($) {
  'use strict';

  app.TodoView =  Backbone.View.extend({
    tagName: 'li',
    //단일 항목을 위한 템플릿 함수 캐시
    template : _.template( $('#item-template').html() ),
    // Todo를 제어하는 DOM 이벤트
    events: {
      'dblclick label' : 'edit',
      'keypress .edit' : 'updateOnEnter',
      'blur .edit' : 'close'
    },
    //TodoView는 모델이나 렌더링의 변경을 감지하기 위해 리스닝하고 있음.
    //**Todo** 와 **TodoView**는 1:1로 매칭되기 때문에 편의상 모델을 직접 참조하도록 설정한다.
    initialize : function () {
      this.listenTo(this.model, 'change', this.render);
    },
    //todo 항목의 제목을 렌더링
    render : function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.$input = this.$('.edit');
      return this;
    },
    // "editing" 모드로 변경되었을 때 input 필드를 보여주고 포커스 이동.
    edit : function(){
      this.$el.addClass('editing');
      this.$input.focus();
    },
    // "editing" 모드에서 나오고, 변경된 todo 항목을 저장한다.
    close : function() {
      var value = this.$input.val().trim();

      if(value){
        this.model.save({title:value});
      }
      this.$el.removeClass('editing');
    },
    //enter키를 누르면 편집을 중단한다. param : e
    updateOnEnter : function(e){
      if (e.which === ENTER_KEY) {
        this.close();
      }
    }
  });
})(jQuery);
