<template>
  <div>
    <wux-accordion-group
      :auto='false'
      :current='boardOpen'
      @change="boardChange"
    >
      <wux-accordion
        v-if="subject.id != 0"
        :key="subjectIndex"
        v-for='(subject, subjectIndex) in subjects'
        :title="'In subject ' + (subjectIndex) + ': ' + subject.summary"
        :name="subjectIndex"
      >
        <!-- <div
          v-if='subject.concepts.length === 0'
          style='color:grey;text-align:center;font-size:83%'
        >
          No goals in this subject.
        </div>         -->
        <app-goal-cards
          v-if="concept.question != ''"
          :key='conceptIndex'
          v-for='(concept, conceptIndex) in subject.concepts'
          :propConcept='concept'
          :propConceptIndex='conceptIndex'
          :propSubjectIndex='subjectIndex'
        >
        </app-goal-cards>
      </wux-accordion>
    </wux-accordion-group>

    <!-- <wux-floating-button 
      @iclick='floatClicked'
      position="bottomRight"
      theme="assertive"
      :buttons="floatButtons"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoalCards from './goalcard';

export default {
  components: {
    appGoalCards: GoalCards,
  },
  data() {
    return {
      boardOpen: ['1'],
      boardIndex: 0,
      hideDone: false,
      // floatButtons: [{
      //   label: 'Add task',
      //   icon: '../../img/todo.png',
      // },
      // {
      //   label: 'Hide/Unhide completed tasks',
      //   icon: '../../img/hide.png',
      // }],
    };
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects',
    }),
    // hideDoneLabel() {
    //   if (this.hideDone === true) {
    //     return 'Hide completed';
    //   }
    //   return 'Unhide completed';
    // },
  },
  methods: {
    boardChange(e) {
      this.boardOpen = e.mp.detail.key;
    },
    // floatClicked(e) {
    //   const { index } = e.mp.detail;
    //   if (index === 0) {
    //   }
    //   if (index === 1) {
    //     this.hideDone = !this.hideDone;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.info_icon_CSSG{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSG{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: center;
  font-size: 85%;
}
</style>