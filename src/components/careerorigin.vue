<template>
  <div>
    <input 
      class="originfieldsCSSCO"
      v-model='jobTitleGETSET'
      :maxlength="200"
      placeholder="Job Title"
    >
    <input
      class="originfieldsCSSCO"
      v-model='organizationNameGETSET'
      :maxlength="200"
      placeholder="Company name"
    >
    <input
      class="originfieldsCSSCO"
      v-model='jobLocationGETSET'
      :maxlength="200"
      placeholder="Job Location"
    >
    <div>
      <div>Upload Picture</div>
      <div>{{picsPostings.length}}/4</div>
      <div v-if='picsTotal != 0'>{{picsRemaining}}</div>
      <div v-for="(picsPosting, index) in picsPostings" :key="index">
        <div class="thumbContainer">
          <image class="weui-uploader__img" :src="picsPosting" mode="aspectFill" @click="previewImage" :id="picsPosting" />
          <div class="delete-icon" @click="deleteImg" :id="picsPosting"></div>
        </div>
      </div>
      <!-- picsPostings.length < 4 cuz it runs v-for before v-if -->
      <div v-if='picsPostings.length < 4' class="weui-uploader__input-box">
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      picsRemaining: 0,
      picsTotal: 0,
    };
  },
  computed: {
    ...mapGetters({
      jobTitle: 'jobTitle',
      organizationName: 'organizationName',
      jobLocation: 'jobLocation',
      picsPostings: 'picsPostings',
    }),
    // here, only string uses the get/set technique for working with vuex...
    // ...because v-model needs it
    jobTitleGETSET: {
      get() {
        return this.jobTitle;
      },
      set(jobTitle) {
        return this.jobTitleUpdate(jobTitle);
      },
    },
    organizationNameGETSET: {
      get() {
        return this.organizationName;
      },
      set(organizationName) {
        return this.organizationNameUpdate(organizationName);
      },
    },
    jobLocationGETSET: {
      get() {
        return this.jobLocation;
      },
      set(jobLocation) {
        return this.jobLocationUpdate(jobLocation);
      },
    },
  },
  methods: {
    ...mapActions({
      jobTitleUpdate: 'jobTitleUpdate',
      organizationNameUpdate: 'organizationNameUpdate',
      jobLocationUpdate: 'jobLocationUpdate',
      picsPostingsAdd: 'picsPostingsAdd',
      picsPostingsDel: 'picsPostingsDel',
    }),
    chooseImage() {
      const that = this;
      wx.chooseImage({
        // count limits how many pictures can be chosen at once
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(resTemp) {
          wx.saveFile({
            tempFilePath: resTemp.tempFilePaths[0],
            success(resSaved) {
              that.picsPostingsAdd(resSaved.savedFilePath);
              that.storageRemainGet();
            },
          });
          // res.tempFilePaths is an array cuz there can be multiple pictures chosen
          // that.picsPostingsAdd(resTemp.tempFilePaths);
        },
        fail() {
        },
      });
    },
    previewImage(e) {
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.picsPostings,
      });
    },
    deleteImg(e) {
      const that = this;
      const picsPostingId = this.picsPostings.indexOf(e.currentTarget.id);
      wx.removeSavedFile({
        filePath: this.picsPostings[picsPostingId],
        success() {
          that.storageRemainGet();
        },
      });
      this.picsPostingsDel(picsPostingId);
    },
    storageRemainGet() {
      const that = this;
      wx.getSavedFileList({
        success(res) {
          let picsSizeTotal = 0;
          that.picsTotal = res.fileList.length;
          for (let i = 0; i <= res.fileList.length - 1; i += 1) {
            picsSizeTotal += res.fileList[i].size;
          }
          if (picsSizeTotal !== 0) {
            const picAvgSize = picsSizeTotal / that.picsTotal;
            that.picsRemaining = Math.round((10000000 - picsSizeTotal) / picAvgSize);
          }
        },
      });
    },
  },
  created() {
    // TODO: limit getstorage if the vuex state already filled
    const that = this;
    wx.getStorage({
      key: 'JOBTITLE',
      success(res) {
        that.jobTitleUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'ORGANIZATIONNAME',
      success(res) {
        that.organizationNameUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'JOBLOCATION',
      success(res) {
        that.jobLocationUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'PICSPOSTINGS',
      success(res) {
        that.picsPostingsAdd(res.data);
      },
    });
    wx.getSavedFileList({
      success(res) {
        let picsSizeTotal = 0;
        that.picsTotal = res.fileList.length;
        for (let i = 0; i <= res.fileList.length - 1; i += 1) {
          picsSizeTotal += res.fileList[i].size;
        }
        if (picsSizeTotal !== 0) {
          const picAvgSize = picsSizeTotal / that.picsTotal;
          that.picsRemaining = Math.round((10000000 - picsSizeTotal) / picAvgSize);
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
  .originfieldsCSSCO {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);
    padding: 50rpx;
  }
  .origintipsCSSCO {
    position: relative;
    padding: 10rpx;
  }
  .thumbContainer {
    position: relative;
    float: left;
    margin-right: 9px;
    margin-bottom: 9px;
  }
  .delete-icon {
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    background: #f43530;
    right: 0;
    top: -20rpx;
    border-radius: 40rpx;
    z-index: 5;
  }
  .delete-icon::before {
    content: '';
    width: 26rpx;
    height: 4rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
      background: #fff;
    }
  .weui-uploader__img {
    display: block;
    width: 79px;
    height: 79px;
  }
  .weui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    border: 1px solid #d9d9d9;
  }
  
  .weui-uploader__input-box:after,
  .weui-uploader__input-box:before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #d9d9d9;
  }
  
  .weui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
  }
  
  .weui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
  }
  
  .weui-uploader__input-box:active {
    border-color: #999;
  }
  
  .weui-uploader__input-box:active:after,
  .weui-uploader__input-box:active:before {
    background-color: #999;
  }
  
  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>