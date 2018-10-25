<template>
  <view>
    <!-- class on i-swipeout doesn't work for existing css in wxss; use class or edit wxss -->
    <!-- pageX starts with button shown at -150 and hide after 800ms timeout -->
    <i-swipeout operateWidth='220'>
      <view slot="content">
        <div class='flex_container_CSSAC'>
          <div class="swipe_out_icon_CSSAC flex_text_CSSAC" @click='colorHandle' :style="colors[colorPicked]">
            <div class='icon_pin_CSSAC'></div>
          </div>
          <div
            v-if="propAnnotate.text.length === 0"
            class='swipe_out_title_CSSAC flex_text_CSSAC'
          >
            Empty. Swipe left to edit.
          </div>
          <div
            v-else
            class='swipe_out_title_CSSAC flex_text_CSSAC'
            :class="{'swipe_out_title_completed_CSSAC': doneShow}"
          >
            {{propAnnotate.text}}
          </div>
        </div>

        <div
          v-if="showResult && propAnnotate.result.length === 0"
          class='swipe_out_resolution_empty_CSSAC'
        >
          <span class="swipe_out_resolution_title_CSSAC">Detail: </span>
          Empty. Swipe left to edit.
        </div>
        <div
          v-else-if="showResult && propAnnotate.result.length !== 0"
          class='swipe_out_resolution_CSSAC'
        >
          <span class="swipe_out_resolution_title_CSSAC">Detail: </span>
          {{propAnnotate.result}}
        </div>
      </view>
      <view slot="button" class='swipe_out_button_group_CSSAC'>
        <view class='swipe_out_button_CSSAC' @click='deleteHandle'>Delete</view>
        <!-- <view class='swipe_out_button_CSSAC' @click='doneHandle'>{{doneShow ? 'Undone' : 'Done'}}</view> -->
        <view class='swipe_out_button_CSSAC' @click='textHandle'>Edit</view>
        <view class='swipe_out_button_CSSAC' @click='showHandle'>{{showResult ? 'Unshow Detail' : 'Show Detail'}}</view>
        <view class='swipe_out_button_CSSAC' @click='resultHandle'>Edit Detail</view>
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
  .swipe_out_title_CSSAC{
    padding: 0 0 0 15px;
    // word-break: break-all;
    text-align: justify;
    text-justify: inter-word;
  }
  .swipe_out_title_completed_CSSAC{
    text-decoration: line-through;
  }
  .swipe_out_resolution_CSSAC{
    padding: 10px;
    font-size:13px;
    text-align: justify;
    text-justify: inter-word;
  }
  .swipe_out_resolution_title_CSSAC{
    font-weight: bold;
  }
  .swipe_out_resolution_empty_CSSAC{
    padding:10px;
    font-size:13px;
  }
  .swipe_out_button_group_CSSAC{
    height:100%;
    width:100%;
    background:#f4cf6c;
  }
  .swipe_out_button_CSSAC{
    width:55px;
    float:left;
    display: flex;
    height:100%;
    justify-content: center;
    background:#f4cf6c;
    align-items:center;
  }
  .swipe_out_icon_CSSAC{
    width: 36px;
    height: 50px;
    position: relative;
    border-radius:5px;
    border: 1px solid #161d20;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
  }
  .flex_container_CSSAC{
    display: table;
    width: 100%;
  }
  .flex_text_CSSAC{
    display: table-cell;
 }
.icon_pin_CSSAC {
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
.icon_pin_CSSAC::after {
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
