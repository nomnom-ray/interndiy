<template>
  <div>
    <i-drawer mode="right" :visible="showDrawer" @close="behaviorsAdd">
      <view class='drawerCSSSD'>
        <i-collapse name="subjects">
          <i-collapse-item
            v-if='subject.id != 0'
            :key="subjectIndex"
            v-for='(subject, subjectIndex) in subjects'
            :title="'subject' + subject.id"
            :name="subjectIndex"
          >
            <view slot="content">
              <wux-checkbox-group name="concepts" :value='checkBoxValues' @change='checkBoxChange(subject.id, $event)'>
                <wux-checkbox
                  :key='conceptIndex'
                  v-for='(concept, conceptIndex) in subject.concepts'
                  color="assertive"
                  :title="'concept' + concept.id"
                  :value="concept.id" />
              </wux-checkbox-group>
            </view>
          </i-collapse-item>
        </i-collapse>
      </view>
    </i-drawer>
    <wux-button
      block
      outline
      type="assertive"
      @click='behaviorsAdd'
    >Add Concepts
    </wux-button>
    <!-- need to make picpostings specific -->
    <!-- <div>
      <div>Upload Picture</div>
      <div>{{picsPostings.length}}/4</div>
      <div v-if='picsTotal != 0'>{{picsRemaining}}</div>
    </div>
    <wux-gallery id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url,index) in picsPostings"
    >
      <div class="thumbContainer">
        <img
          class="weui-uploader__img"
          :src="url" mode="aspectFill"
          @click="showGallery(url,index)"
          :id="picsPosting"
        />
      </div>
    </div>
    <div v-if='picsPostings.length < 1' class="weui-uploader__input-box">
      <div class="weui-uploader__input" @click="chooseImage"></div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      subjects: 'subjects',
    }),
  },
  data() {
    return {
      // checkbocvalue need localsaving
      checkBoxValues: [],
      conceptList: [],
      showDrawer: false,
    };
  },
  methods: {
    behaviorsAdd() {
      this.showDrawer = !this.showDrawer;
    },
    checkBoxChange(subjectId, event) {
      const checkedBox = event.mp.detail;
      const checkBoxValues = [...this.checkBoxValues];
      if (checkedBox.checked) {
        checkBoxValues.push(JSON.stringify(checkedBox.index));
        this.checkBoxValues = checkBoxValues;
        this.conceptList.push({ subjectId, conceptId: checkedBox.index });
      } else {
        const checkedBoxIndex = this.checkBoxValues.indexOf(JSON.stringify(checkedBox.index));
        checkBoxValues.splice(checkedBoxIndex, 1);
        this.checkBoxValues = checkBoxValues;
        const conceptSplicedId = this.conceptList
          .findIndex(item => item.subjectId === subjectId && item.conceptId === checkedBoxIndex);
        this.conceptList.splice(conceptSplicedId, 1);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
  .drawerCSSSD{
    margin-top: 16vh;
    width: 80vw;
    height: 100vh;
    background:#fff;
  }
</style>