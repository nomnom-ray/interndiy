<template>
  <view class='annotateContainer'>
    <!-- class on i-swipeout doesn't work for existing css in wxss; use class or edit wxss -->
    <!-- pageX starts with button shown at -150 and hide after 800ms timeout -->
    <i-swipeout class='swipe_out_item' operateWidth='275'>
      <view slot="content">
        <view class="swipe_out_icon" @click='colorHandle' :style="colors[colorPicked]">
        </view>
        <view
          v-if="propAnnotate.text.length === 0"
          class='swipe_out_resolution_empty'
        >
          Empty. Try fill it.
        </view>
        <view
          v-else
          class='swipe_out_title'
          :class="{'swipe_out_title_completed': doneShow}"
        >
          {{propAnnotate.text}}
        </view>

        <view class="wipe_out_resolution_title" v-if="showResult">Resolution</view>
        <view
          v-if="showResult && propAnnotate.result.length === 0"
          class='swipe_out_resolution_empty'
        >
          Empty. Try fill it.
        </view>
        <view
          v-else-if="showResult && propAnnotate.result.length !== 0"
          class='swipe_out_resolution'
        >
          {{propAnnotate.result}}
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
  props: ['propAnnotate', 'propAnnotateIndex', 'propBoardIndex', 'propBundleIndex'],
  computed: {
    ...mapGetters({
      structures: 'structures',
    }),
  },
  methods: {
    ...mapActions({
      annotatesUpdate: 'annotatesUpdate',
    }),
    deleteHandle() {
      this.$root.$emit('annotateDelete', this.propAnnotateIndex);
    },
    doneHandle() {
      this.doneShow = !this.doneShow;
      this.annotatesUpdate({
        boardIndex: this.propBoardIndex,
        bundleIndex: this.propBundleIndex,
        annotateIndex: this.propAnnotateIndex,
        type: 'done',
        content: this.doneShow,
      });
    },
    textHandle() {
      this.$root.$emit('annotateText', this.propAnnotateIndex);
    },
    showHandle() {
      this.showResult = !this.showResult;
      this.annotatesUpdate({
        boardIndex: this.propBoardIndex,
        bundleIndex: this.propBundleIndex,
        annotateIndex: this.propAnnotateIndex,
        type: 'showResult',
        content: this.showResult,
      });
    },
    resultHandle() {
      this.$root.$emit('resultText', this.propAnnotateIndex);
    },
    colorHandle() {
      this.colorPicked += 1;
      if (this.colorPicked >= 8) {
        this.colorPicked = 0;
      }
      this.annotatesUpdate({
        boardIndex: this.propBoardIndex,
        bundleIndex: this.propBundleIndex,
        annotateIndex: this.propAnnotateIndex,
        type: 'colorPicked',
        content: this.colorPicked,
      });
    },
  },
  mounted() {
    this.showResult = this.structures[this.propBoardIndex].bundles[this.propBundleIndex]
      .annotates[this.propAnnotateIndex].showResult;
    this.doneShow = this.structures[this.propBoardIndex].bundles[this.propBundleIndex]
      .annotates[this.propAnnotateIndex].done;
    this.colorPicked = this.structures[this.propBoardIndex].bundles[this.propBundleIndex]
      .annotates[this.propAnnotateIndex].colorPicked;
  },
};
</script>

<style lang="scss" scoped>
  // .todoContainer{
  // }
  // .swipe_out_item{
  // }
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
