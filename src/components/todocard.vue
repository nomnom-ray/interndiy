<template>
  <view class='todoContainer'>
    <!-- class on i-swipeout doesn't work for existing css in wxss; use class or edit wxss -->
    <!-- pageX starts with button shown at -150 and hide after 800ms timeout -->
    <i-swipeout class='swipe_out_item' operateWidth='275'>
      <view slot="content">
        <view class="swipe_out_icon" @click='colorHandle' :style="colors[colorPicked]">
        </view>
        <view
          class='swipe_out_title'
          :class="{'swipe_out_title_completed': doneShow}"
        >
          {{propTodo.text}}
        </view>
        <view class="wipe_out_resolution_title" v-if="showResult">Resolution</view>
        <view
          v-if="showResult && propTodo.result.length === 0"
          class='swipe_out_resolution_empty'
        >
          Empty. Try fill it.
        </view>
        <view
          v-else-if="showResult && propTodo.text.length !== 0"
          class='swipe_out_resolution'
        >
          {{propTodo.result}}
        </view>
      </view>
      <view slot="button" class='swipe_out_button_group'>
        <view class='swipe_out_button' @click='deleteHandle'>Delete</view>
        <view class='swipe_out_button' @click='doneHandle'>{{doneShow ? 'Undone' : 'Done'}}</view>
        <view class='swipe_out_button' @click='textHandle'>Edit</view>
        <view class='swipe_out_button' @click='showHandle'>{{showResult ? 'Unshow Resolve' : 'Show Resolve'}}</view>
        <view class='swipe_out_button' @click='resultHandle'>Edit Resolve</view>
      </view>
    </i-swipeout>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      showResult: false,
      doneShow: false,
      colors: [
        '',
        'background:violet',
        'background:Indigo',
        'background:Blue',
        'background:Green',
        'background:Yellow',
        'background:Orange',
        'background:Red',
      ],
      colorPicked: 0,
    };
  },
  props: ['propTodo', 'propTodoIndex', 'propBoardIndex', 'propTaskIndex'],
  computed: {
    ...mapGetters({
      structures: 'structures',
    }),
  },
  methods: {
    ...mapActions({
      todosUpdate: 'todosUpdate',
    }),
    deleteHandle() {
      this.$root.$emit('todoDelete', this.propTodoIndex);
    },
    doneHandle() {
      this.doneShow = !this.doneShow;
      this.todosUpdate({
        boardIndex: this.propBoardIndex,
        taskIndex: this.propTaskIndex,
        todoIndex: this.propTodoIndex,
        type: 'done',
        content: this.doneShow,
      });
    },
    textHandle() {
      this.$root.$emit('todoText', this.propTodoIndex);
    },
    showHandle() {
      this.showResult = !this.showResult;
      this.todosUpdate({
        boardIndex: this.propBoardIndex,
        taskIndex: this.propTaskIndex,
        todoIndex: this.propTodoIndex,
        type: 'showResult',
        content: this.showResult,
      });
    },
    resultHandle() {
      this.$root.$emit('resultText', this.propTodoIndex);
    },
    colorHandle() {
      this.colorPicked += 1;
      if (this.colorPicked >= 8) {
        this.colorPicked = 0;
      }
      this.todosUpdate({
        boardIndex: this.propBoardIndex,
        taskIndex: this.propTaskIndex,
        todoIndex: this.propTodoIndex,
        type: 'colorPicked',
        content: this.colorPicked,
      });
    },
  },
  mounted() {
    this.showResult = this.structures[this.propBoardIndex].tasks[this.propTaskIndex]
      .todos[this.propTodoIndex].showResult;
    this.doneShow = this.structures[this.propBoardIndex].tasks[this.propTaskIndex]
      .todos[this.propTodoIndex].done;
    this.colorPicked = this.structures[this.propBoardIndex].tasks[this.propTaskIndex]
      .todos[this.propTodoIndex].colorPicked;
  },
};
</script>

<style lang="scss" scoped>
  .todoContainer{
  }
  .swipe_out_item{
  }
  .swipe_out_title{
    padding:0 15px;
    margin-bottom:10px;
    font-size:12px;
  }
  .swipe_out_title_completed{
    text-decoration: line-through;
  }
  .swipe_out_resolution{
    padding:0 15px;
    margin-bottom:10px;
    font-size:12px;
  }
  .wipe_out_resolution_title{
    padding:0 15px;
    font-size:12px;
    font-weight: bold;
  }
  .swipe_out_resolution_empty{
    padding:0 15px;
    font-size:12px;
  }
  .swipe_out_button_group{
    height:100%;
    width:100%;
    background:#f4cf6c;
  }
  .swipe_out_button{
    width:55px;
    float:left;
    display: flex;
    height:100%;
    justify-content: center;
    background:#f4cf6c;
    align-items:center;
  }
  .swipe_out_icon{
    float:left;
    width:30px;
    height:40px;
    line-height:40px;
    text-align:center;
    border-radius:5px;
    border: 1px solid #161d20;
    background: rgba(0, 0, 0, 0);
  }
</style>
