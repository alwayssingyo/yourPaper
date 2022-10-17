<template>
<div class="write_wrapper">
  <div class="write_header">
    <h1 class="write_title">
      <!-- <div class="name-loading"> -->
      <div v-if="!getUserInfo($route.params.id, Info.name)" class="name-loading">
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
      </div>
      <span v-else class="write_name">
        {{ getUserInfo($route.params.id, Info.name) }}
      </span>
      님에게 마음을 전하세요!
    </h1>
    <Notification 
      v-if="(
        getUserInfo($route.params.id, Info.name) && 
        checkBirth((getUserInfo($route.params.id, Info.birth)))  ||
        checkJoin((getUserInfo($route.params.id, Info.joinDate)))
      )"
      :year="year"
      :mode="checkBirth((getUserInfo($route.params.id, Info.birth))) ? 'birth' : 'join'"
      :user="getUserInfo($route.params.id, Info.name)"
    />
  </div>
  <div class="write_inner">
    <Form :params="$route.params.id" />
  </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapState } from 'vuex';
import { Info } from '../utils/data.js';
import mixin from '../utils/mixin';
import Form from '../components/Form.vue';
import Notification from '../components/Notification.vue';

export default {
  name: 'WritePage',
  mixins: [mixin],
  components: {
    Form,
    Notification
  },
  data() {
    return {
      Info: Info,
      year: null,
    };
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList']),
  },
  mounted() {
    if (this.peopleInfoList.length > 0) {
      this.isLoading = false;
    }
    if(!this.getUserInfo(this.$route.params.id, this.Info.name)) {
      gsap.from('.ball', {
        y: 10,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        stagger: {
          from: 'end',
          amount: .25,
          repeatDelay: 0.25,
        },
      });
    }
  },
  methods: {
    checkBirth(day) {
      let userMonth = new Date(day).getMonth();
      let userDate = new Date(day).getDate();
      let todayMonth = new Date().getMonth();
      let todayDate = new Date().getDate();

      if( userMonth == todayMonth && userDate == todayDate) return true;
      return false;
    },
    checkJoin(day) {
      let userYear = new Date(day).getFullYear();
      let userMonth = new Date(day).getMonth();
      let userDate = new Date(day).getDate();
      let todayYear = new Date().getFullYear();
      let todayMonth = new Date().getMonth();
      let todayDate = new Date().getDate()
      
      if( userMonth == todayMonth && userDate == todayDate && userYear < todayYear) {
        this.year = todayYear - userYear;
        return true;
      };
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
.write_inner {  
  padding: 24px 0;
}
.write_title {
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 16px;
}
.write_name {
  display: inline-block;
  font-weight: bold;
  color: #ff627c;
  width: 80px;
}
.name-loading {
  display: inline-block;
  width: 80px;
  padding-left: 10px;
  .ball {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #bbbbbb;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.test {
  font-size: 15px;
  color: #000;
}
</style>
