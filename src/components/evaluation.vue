<template>
  <div
  >
    <wux-white-space />
    <wux-white-space />
    <div
      class="form_title_CSSE"
    >Student Performance Evaluation</div>
    <wux-white-space />
    <div
      class="cell_title_CSSE"
    >Interest in Work</div>

    <wux-radio-group name="interest" :value="scoreInterest" @change="changeInterest">
        <wux-radio class="cell_label_CSSE" title="Shows little enthusiasm for assigned work, infrequently requests additional tasks" value="1" />
        <wux-radio class="cell_label_CSSE" title="Enthusiastic about their assignments/work, agreeable to new responsibilities, asks for new tasks" value="2" />
        <wux-radio class="cell_label_CSSE" title="Displays enthusiasm for work that is beyond their job requirements; proactively seeks new tasks and responsibilities" value="3" />
    </wux-radio-group>

    <wux-white-space />
    <div
      class="cell_title_CSSE"
    >Ability to learn</div>
    <wux-radio-group name="interest" :value="scoreInterest" @change="changeInterest">
        <wux-radio class="cell_label_CSSE" title="Sometimes slow to become proficient at new tasks or work processes" value="1" />
        <wux-radio class="cell_label_CSSE" title="Quick to become proficient at new tasks" value="2" />
        <wux-radio class="cell_label_CSSE" title="Exceeds expectations in the complexity and difficulty of work they are able to successfully complete" value="3" />
    </wux-radio-group>
    <wux-white-space />
    <div
      class="cell_title_CSSE"
    >Quality of work</div>
    <wux-radio-group name="interest" :value="scoreInterest" @change="changeInterest">
        <wux-radio class="cell_label_CSSE" title="Work does not meet expectations, has more than the expected number of errors" value="1" />
        <wux-radio class="cell_label_CSSE" title="Work is usually very thorough and well done, few errors" value="2" />
        <wux-radio class="cell_label_CSSE" title="Work is always very thorough and of excellent quality, few if any errors" value="3" />
    </wux-radio-group>

    <wux-white-space />
    <div
      class="cell_title_CSSE"
    >Interpersonal Communication</div>
    <wux-radio-group name="interest" :value="scoreInterest" @change="changeInterest">
        <wux-radio class="cell_label_CSSE" title="Displays inconsistent listening skills and is reluctant to seek input from others" value="1" />
        <wux-radio class="cell_label_CSSE" title="Interactions with others demonstrate acceptable listening skills and the ability to sometimes seek the opinions, ideas, and expertise of others" value="2" />
        <wux-radio class="cell_label_CSSE" title="Interactions with others demonstrate exceptional active listening skills and the ability to proactively seek the opinions, ideas, and expertise of others" value="3" />
    </wux-radio-group>

    <wux-white-space />
    <wux-white-space />
    <div
      class="form_title_CSSE"
    >Overall Performance Rating</div>
    <wux-white-space />
    <div
      class="form_result_CSSE"
    >Outstanding!</div>

    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:180rpx;margin-right:180rpx">
      <button
        class='button_delete_CSSSU'
        @click='clearAll'
      >Submit to UWaterloo
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreInterest: '3',
    };
  },
  methods: {
    changeInterest(e) {
      this.scoreInterest = e.mp.detail.value;
    },
  },
};
</script>


<style lang="scss" scoped>
.checkbox_CSSE{
  position: static;
}
.cell_label_CSSE{
  font-size: 85%;
}
.cell_title_CSSE{
  padding: 16rpx 16rpx 16rpx 16rpx;
  font-size: 85%;
  width: 100%;
  background: rgba(244,207,108, 0.2);
}
.form_title_CSSE{
  padding: 16rpx 0 0 0;
  font-size: 85%;
  width: 100%;
  text-align: center;
  text-decoration: underline;
}
.form_result_CSSE{
  text-align: center;
  width: 100%;
  color: #33cd5f;
  font-size: 150%;
}
.button_delete_CSSSU {
  background-color: #f4cf6c;
  padding: 10rpx;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
}
</style>