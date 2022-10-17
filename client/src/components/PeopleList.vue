<template>
  <div class="people_info">
    <div class="people_profile">
      <div 
        class="people_profile_img" 
        :style="{'background-image': 'url(' + info[this.getHeaderIndex(Info.img)] + ')'}">
      </div>

      <!-- birthday -->
      <span class="people_profile_birth" v-if="isBirthDay">
        <span class="people_profile_birth_ico"></span>
        <div class="firework">
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
          <div class="line"><div class="line_inner"></div></div>
        </div>
      </span>

      <!-- newcomer -->
      <span class="people_profile_new" v-if="isNewComer"></span>

      <div class="people_profile_cont">
        <div class="people_profile_text">{{ info[this.getHeaderIndex(Info.name)] }}</div>
        <span class="people_profile_sub">{{ info[this.getHeaderIndex(Info.group)] }}실</span>
        <span class="people_profile_sub">{{ info[this.getHeaderIndex(Info.team)] && info[this.getHeaderIndex(Info.team)] + '팀' }}</span>
      </div>
    </div>
    <div class="people_btn">
      <div class="people_btn_item">
        <router-link class="people_btn_text btn_write" :to="{path: `/write/${info[this.getHeaderIndex(Info.id)]}`}">
          <span class="people_btn_ico"></span>
        </router-link>
      </div>
      <div class="people_btn_item">
        <router-link class="people_btn_text btn_view" :to="{path: `/view/${info[this.getHeaderIndex(Info.id)]}`}">
          <span class="people_btn_ico"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixin from '../utils/mixin'
import { Info } from '../utils/data.js'
import { gsap } from "gsap";

export default {
  name: 'PeopleList',
  mixins: [mixin],
  props: {
    info: Array
  },
  data(){
    return {
      defaultProfile: require('../assets/img/ico-profile.png'),
      Info: Info
    }
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList']),
    today(){
      return new Date();
    },
    isBirthDay(){
      var userBirthday = this.info[this.getHeaderIndex(Info.birth)];
      var userBirthdayObj = new Date(this.today.getFullYear(), userBirthday.split('.')[1] - 1, userBirthday.split('.')[2]);

      if(this.calcDiffDate(userBirthdayObj) === 0){
        return true;
      }

      return false;
    },
    isNewComer(){
      var userJoinDate = this.info[this.getHeaderIndex(Info.joinDate)];
      var userJoinDateObj = new Date(userJoinDate.split('.')[0], userJoinDate.split('.')[1] - 1, userJoinDate.split('.')[2]);

      var diffDate = this.calcDiffDate(userJoinDateObj)

      if(diffDate > -8 && diffDate < 8 ){
        return true;
      }

      return false;
    }
  },
  mounted(){
    // gsap timeline: firework
    const fireworkTl = gsap.timeline({repeat: -1, repeatDelay: 2});
    fireworkTl.set(".line",{ transformOrigin: 'left center' });

    const lineEl = gsap.utils.toArray('.line');
    lineEl.forEach( (el, idx) => {
      fireworkTl.set(el, { rotation: `${45 + (45 * idx)}deg`});
    })

    fireworkTl
      .to(".line_inner", {
        width:"0",
        left:"0%",
        opacity:0,
        duration: 0.1,
        ease: 'ease-in'
      }).to(".line_inner", {
        width:"30%",
        left:"20%",
        opacity:1,
        duration: 0.6,
        ease: 'ease-in'
      }).to(".line_inner", {
        left:"50%",
        width:"0",
        duration: 2,
        opacity:0,
        ease: 'ease-out'
    });
  
    // gsap timeline: star
    const starTl = gsap.timeline({ repeat: -1 }).yoyo(true);
    starTl
      .set('.people_profile_new', { rotate: 0, scale: 1.3, ease: 'ease-in' })
      .to('.people_profile_new', 1.5, { rotate: 45, scale: 1, ease: 'ease-out' });
  }
}
</script>

<style scoped lang="scss">
  .people_info {
    display: flex;
    position: relative;
    padding: 18px 24px;
    border: 8px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
      top: -4px;
      left: -4px;
      transition: 0.4s;
    }
  }

  .people_profile {
    flex: 1 0 auto;
    height: 100%;
    position: relative;
    padding-left: 60px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 40px;
      height: 40px;
      background-image: url('../assets/img/ico-profile.png');
      background-size: 28px;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .people_profile_img {
    position: absolute;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 20%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .people_profile_text {
    display: block;
    margin-bottom: 4px;
    font-family: "NotoSansKR";
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #3f4042;
  }

  .people_profile_birth {
    position: absolute;
    display: inline-block;
    left: 0;
    bottom: 100%;
    width: 16px;
    height: 16px;
    transform: rotate(-15deg) translateX(-50%);
    z-index: 10;
  }

  .people_profile_birth_ico {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/img/ico-birth.png') center no-repeat;
    background-size: cover;
    z-index: 1;
    width: 100%;
  }

  .people_profile_new {
    position: absolute;
    display: inline-block;
    left: 40px;
    bottom: 100%;
    width: 16px;
    height: 16px;
    transform: rotate(-15deg) translate(-50%);
    background: url('../assets/img/ico-star.svg') center no-repeat;
    background-size: cover;
    z-index: 10;
  }
  
  .people_profile_sub {
    display: inline-block;
    margin-right: 8px;
    font-family: "NotoSansKR";
    font-size: 12px;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #3f4042;
  }

  .people_btn {
    flex: 0 0 auto;
    display: flex;
  }

  .people_btn_item {
    display: inline-block;
    margin: auto 0 auto 16px;
  }

  .people_btn_text {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    font-family: 'NotoSansKR';
    font-size: 14px;
    line-height: 1.2;

    &.btn_write {
      background-color: #e6e9fe;
      transition: 0.2s;

      .people_btn_ico {
        background-image: url('../assets/img/ico-pen.svg');
        transition: 0.2s;
      }

      &:hover {
        background-color: rgba(230, 233, 254, 0.7);

        .people_btn_ico {
          left: 60%;
        }
      }
    }

    &.btn_view {
      background-color: #fdf3da;
      transition: 0.2s;

      .people_btn_ico {
        transition: 0.2s;
        background-image: url('../assets/img/ico-mail.svg');
      }

      &:hover {
        background-color: rgba(253, 243, 218, 0.7);

        .people_btn_ico {
          transform-origin: center;
          transform: translate(-50%, -50%) rotate(10deg);
        }
      }
    }

  }

  .people_btn_ico {
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
  }

  .firework {
    display: inline-block;
    width: 40px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;

      &:before {
      content:"";
      width:100%;
      display:block;
      padding-top:100%;
    }
  }

  .line {
    left:50%;
    top:50%; 
    position:absolute;
    width:80%;
    height: 2px;
    border-radius:50px;
    overflow:hidden;

    &:nth-child(2n) {
      .line_inner {
        background-color: #ffc42c;
      }
    }
    &:nth-child(4n+1) {
      .line_inner {
        background-color: rgb(86, 219, 86);
      }
    }
    &:nth-child(3) {
      .line_inner {
        background-color: #ea4c89;
      }
    }
    &:nth-child(7) {
      .line_inner {
        background-color: #ffc42c;
      }
    }
  }

  .line_inner {
    position: relative;
    width: 0px;
    height: 100%;
    margin: 0;
    border-radius: 50px;
    opacity: 0;
  }

</style>