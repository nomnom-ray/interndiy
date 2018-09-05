<template>
  <div>
    <van-row gutter='15'>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default'>T</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default'>B</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default'>S</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default'>D</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='subjectsOnScreen += 1'>L</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='subjectsOnScreen -= 1'>R</van-button>
        </van-col>
    </van-row>

    <van-row gutter='15'>
        <app-subjects :propSubjectsOnScreen='subjectsOnScreen'></app-subjects>
    </van-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Subjects from './conceptsubject';

  export default {
    components: {
      // appCard: Card,
      appSubjects: Subjects,
    },
    data() {
      return {
        // subjectsOnScreen = 4 introduce the first left shift in subject array
        // subjectsOnScreen = 3 leaves the leftmost subject empty by using a blank reserved subject
        // there is no appended blank reserve subject
        subjectsOnScreen: 5,
      };
    },
    computed: {
      ...mapGetters({
        subjects: 'subjects',
      }),
    },
    methods: {
      clickTest() {
        // eslint-disable-next-line
        // console.log(this.concepts);
      },
    },
  };

</script>

<style lang='scss'>
.subjectCSSCM {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
</style>
