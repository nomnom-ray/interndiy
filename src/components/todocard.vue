<template>
  <view class='todoContainer' @click='todoClicked'>
    <!-- class on i-swipeout doesn't work for existing css in wxss; use class or edit wxss -->
    <!-- pageX starts with button shown at -150 and hide after 800ms timeout -->
    <i-swipeout class='swipe_out_item' operateWidth='275'>
      <view slot="content">
        <view
          class='swipe_out_title'
          :class="{'swipe_out_title_completed': todoCompleted}"
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
        <view class='swipe_out_button' @click='showHandle'>{{showShow ? 'Unshow Resolve' : 'Show Resolve'}}</view>
        <view class='swipe_out_button' @click='resultHandle'>Edit Resolve</view>
      </view>
    </i-swipeout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      todoCompleted: false,
      showResult: false,
      doneShow: false,
      showShow: false,
    };
  },
  props: ['propTodo', 'propTodoIndex'],
  computed: {
  },
  methods: {
    deleteHandle() {
    },
    doneHandle() {
      this.todoCompleted = !this.todoCompleted;
      this.doneShow = !this.doneShow;
    },
    textHandle() {
      this.$root.$emit('todoText', this.propTodoIndex);
    },
    showHandle() {
      this.showResult = !this.showResult;
    },
    resultHandle() {
      this.$root.$emit('resultText', this.propTodoIndex);
    },
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
    color:#434749;
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
    color:#161d20;
    align-items:center;
  }
  .swipe_out_description{
    position: relative;
  }
</style>