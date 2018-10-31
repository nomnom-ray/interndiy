<template>
  <a :href="detailURL">
    <wux-wing-blank size="default">
      <div class="cardCSSQC">
        <div
          v-if="propQualification.title ===''"
          class='qual_title_CSSQC qual_title_empty_CSSQC'
        >
          Empty qualification. Open to edit.
        </div>
        <div
          v-else
          class='qual_title_CSSQC'
        >
          {{propQualification.title}}
        </div>
        <div style='border-top: 1px solid #eff1f7'>
        <wux-row>
          <!-- <wux-col span='6'>
            <div style='text-align:center;padding:5px'>
              Description: {{propQualification.descriptionValid ? 'validated' : 'unverified'}}
            </div>
          </wux-col> -->
          <wux-col span='5'>
            <div style='text-align:center;padding:5px'>
              Tasks involved: {{propQualification.taskList.length}}
            </div>
          </wux-col>
          <wux-col span='6'>
            <div style='text-align:center;padding:5px'>
              Justification: {{propQualification.justification ? 'populated' : 'empty'}}
            </div>          
          </wux-col>
        </wux-row>
        </div>
      </div>
    </wux-wing-blank>
  </a>
</template>

<script>
export default {
  props: ['propQualification', 'propQualificationIndex'],
  computed: {
    detailURL() {
      return `/pages/qualificationdetail/main?id=${this.propQualificationIndex}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.cardCSSQC {
  font-size: 80%;
  width: 100%;
  margin-bottom: 10px;
  background-color: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);  
}
.qual_title_empty_CSSQC{
  color: grey;
}
.qual_title_CSSQC{
  padding: 10px;
  text-align: justify;
  text-justify: inter-word;
}
</style>
