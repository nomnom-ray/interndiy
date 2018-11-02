<template>
  <view>
    <!-- class on i-swipeout doesn't work for existing css in wxss; use class or edit wxss -->
    <!-- pageX starts with button shown at -150 and hide after 800ms timeout -->
    <i-swipeout operateWidth='275'>
      <view slot="content">
        <div class='flex_container_CSSTC'>
          <div class="swipe_out_icon_CSSTC flex_text_CSSTC" @click='colorHandle' :style="colors[colorPicked]">
            <div class='icon_pin_CSSTC'></div>
          </div>
          <div
            v-if="propTodo.text.length === 0"
            class='swipe_out_title_CSSTC flex_text_CSSTC'
          >
            Empty. Swipe left to edit.
          </div>
          <div
            v-else
            class='swipe_out_title_CSSTC flex_text_CSSTC'
            :class="{'swipe_out_title_completed_CSSTC': doneShow}"
          >
            {{propTodo.text}}
          </div>
        </div>

        <div
          v-if="showResult && propTodo.result.length === 0"
          class='swipe_out_resolution_empty_CSSTC'
        >
          <span class="swipe_out_resolution_title_CSSTC">Resolution: </span>
          Empty. Swipe left to edit.
        </div>
        <div
          v-else-if="showResult && propTodo.result.length !== 0"
          class='swipe_out_resolution_CSSTC'
        >
          <span class="swipe_out_resolution_title_CSSTC">Resolution: </span>
          {{propTodo.result}}
        </div>
      </view>
      <view slot="button" class='swipe_out_button_group_CSSTC'>
        <view class='swipe_out_button_CSSTC' @click='deleteHandle'>Delete</view>
        <view class='swipe_out_button_CSSTC' @click='doneHandle'>{{doneShow ? 'Undone' : 'Done'}}</view>
        <view class='swipe_out_button_CSSTC' @click='textHandle'>Edit</view>
        <view class='swipe_out_button_CSSTC' @click='showHandle'>{{showResult ? 'Unshow Resolve' : 'Show Resolve'}}</view>
        <view class='swipe_out_button_CSSTC' @click='resultHandle'>Edit Resolve</view>
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
  .swipe_out_title_CSSTC{
    padding: 0 0 0 15px;
    // word-break: break-all;
    text-align: justify;
    text-justify: inter-word;
  }
  .swipe_out_title_completed_CSSTC{
    text-decoration: line-through;
  }
  .swipe_out_resolution_CSSTC{
    padding: 10px;
    font-size:13px;
    text-align: justify;
    text-justify: inter-word;
  }
  .swipe_out_resolution_title_CSSTC{
    font-weight: bold;
  }
  .swipe_out_resolution_empty_CSSTC{
    padding:10px;
    font-size:13px;
  }
  .swipe_out_button_group_CSSTC{
    height:100%;
    width:100%;
    background:#f4cf6c;
  }
  .swipe_out_button_group_CSSTC:after{
    content: "";
    display: table;
    clear: both;
  }
  .swipe_out_button_CSSTC{
    float: left;
    width: 20%;
    text-align: center;
    padding: 25px 0 0 0;
    background:#f4cf6c;
  }
  .swipe_out_icon_CSSTC{
    width: 35px;
    height: 50px;
    position: relative;
    border-radius:5px;
    border: 1px solid #161d20;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
  }
  .flex_container_CSSTC{
    display: table;
    width: 100%;
  }
  .flex_text_CSSTC{
    display: table-cell;
 }
.icon_pin_CSSTC {
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -14px;
  border-radius: 50% 50% 50% 0;
  border: 4px solid #fff;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.icon_pin_CSSTC::after {
  position: absolute;
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-left: -3px;
  margin-top: -3px;
  background-color: #fff;
}
</style>
