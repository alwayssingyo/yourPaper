<template>
  <div class="popup_wrapper" v-show="isPopupShow">
    <div class="popup">

      <div v-for="(snow, i) in count" :key="i" class="particle object"></div>

      <div class="popup_inner custom_scroll">
        <div class="popup_section" v-show="hasBirthdayList">
          <strong class="popup_section_title">
            생일을 맞은 HNINER에게 축하의 마음을 전해주세요!
            <span class="popup_title_birth">
              <span class="popup_title_birth_ico"></span>
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
          </strong>
          <div class="popup_section_cont">
            <ul class="popup_section_list">
              <!-- d-day list: birth-->
              <li class="popup_section_item" 
                v-for="(info, idx) in this.sortedPeopleInfoList" 
                :key="idx" 
                v-show="checkBirthDDay(info[birthIndex])" >
                <div class="people_profile">
                  <div class="people_profile_thumb">
                    <div class="people_profile_img" 
                      :style="{'background-image': 'url(' + info[this.getHeaderIndex(Info.img)] + ')'}" >
                    </div>
                  </div>
                  <router-link 
                    class="people_profile_text"
                    :to="{path: `/write/${info[this.getHeaderIndex(Info.id)]}`}" >
                    {{ info[this.getHeaderIndex(Info.name)] }}
                  </router-link>
                  <div class="people_profile_text people_profile_dday">{{ printBirthDDay( calcDDay(info[birthIndex]) ) }}</div>
                </div>
              </li>
              <!-- //d-day list: birth-->
            </ul>
          </div>
        </div>

        <div class="popup_section" v-show="hasWelcomeList">
          <strong class="popup_section_title">
            <span style="color: rgba(255, 98, 124, 0.9);">Welcome!</span> 신규 입사자에게 환영의 메세지를 남겨주세요!
            <span class="popup_title_new"></span>
          </strong>
          <div class="popup_section_cont">
            <ul class="popup_section_list">
              <!-- d-day list: join date -->
              <li class="popup_section_item" 
                v-for="(info, idx) in this.sortedPeopleInfoList" 
                :key="idx" 
                v-show="checkJoinDDay(info[joinDateIndex])" >
                <div class="people_profile">
                  <div class="people_profile_thumb">
                    <div class="people_profile_img" 
                      :style="{'background-image': 'url(' + info[this.getHeaderIndex(Info.img)] + ')'}" >
                    </div>
                  </div>
                  <router-link 
                    class="people_profile_text" 
                    :to="{path: `/write/${info[this.getHeaderIndex(Info.id)]}`}" >
                    {{ info[this.getHeaderIndex(Info.name)] }}
                  </router-link>
                  <div class="people_profile_sub_text">{{ info[this.getHeaderIndex(Info.group)] }}실</div>
                  <div class="people_profile_sub_text">{{ info[this.getHeaderIndex(Info.team)] }}팀</div>
                  <button class="people_profile_share_btn" 
                    @click="copyUrl(`/write/${info[this.getHeaderIndex(Info.id)]}`)">
                    공유하기
                  </button>
                </div>
              </li>
              <!-- //d-day list: join date -->
            </ul>
          </div>
        </div>
      </div>

      <div class="popup_notice">
        <input id="closeToday" type="checkbox" class="popup_close_today_ip" hidden>
        <label for="closeToday" class="popup_close_today_label" @click="toggleCheckbox()">
          <span class="popup_close_today_checkbox" :class="{'is-checked': closeToday}"></span>
          오늘 하루 그만 보기
        </label>
      </div>

      <button type="button" class="popup_close_btn" @click="closePopup()">
        <span class="is-blind">닫기</span>
      </button>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixin from '../utils/mixin';
import { Info } from '../utils/data.js';
import { gsap } from 'gsap';

export default {
  name: 'EventModal',
  mixins: [mixin],
  data(){
    return {
      Info: Info,
      isShow: true,
      hasBirthdayList: false,
      hasWelcomeList: false,
      birthDDay: 4,
      joinDDay: 8,
      closeToday: false,
      count: (
        window.innerWidth > 1024 ? 70 : 40
      ),
      x: (
        window.innerWidth > 1024 ? 580 : (window.innerWidth - 96)
      ),
    }
  },
  methods: {
    closePopup(){
      this.setCookie('closeToday', this.closeToday ? 'Y' : 'N' , 1 );
      this.isShow = false;
      // 팝업 닫을 때 팝업 내 모든 tweens를 킬
      gsap.killTweensOf(['.particle, popup .line, .popup .line_inner, .popup_title_new']);
    },
    /**
     * 오늘 날짜로부터 date까지 날짜 일 수 차이 계산
     * @param { string } date : yyyy.mm.dd
     * @return { number } : 오늘 날짜로부터 date까지의 날짜 일 수
     */
    calcDDay(date){
      let userDate = new Date(this.today.getFullYear(), date.split('.')[1] - 1, date.split('.')[2]);

      return this.calcDiffDate(userDate);
    },
    /**
     * 생일(date)이 오늘 날짜로부터 d-day 날짜 이내에 포함되는지 여부를 체크하여 boolean으로 리턴
     * @param { string } date : yyyy.mm.dd
     * @return { boolean }
     */
    checkBirthDDay(date){
      var userDate = new Date(this.today.getFullYear(), date.split('.')[1] - 1, date.split('.')[2]);
      var userDDay = this.calcDiffDate(userDate);

      if(userDDay >= 0 && userDDay < this.birthDDay) {
        this.hasBirthdayList = true;
        return true;
      }

      return false;
    },
    /**
     * dDay로 받은 일 수를 생일을 표기하기 위한 d-day 기준 날짜와 비교하여 d-day 안내 문구 출력
     * @param { number } dDay : 오늘 날짜로부터의 d-day까지의 날짜 일 수
     */
    printBirthDDay(dDay){
      if(dDay >= 0 && dDay < this.birthDDay ){
        if(dDay > 0) {
          return 'D-' + dDay;
        }
        else {
          return 'Happy Birthday!';
        }
      }
    },
    /**
     * 입사일(date)이 오늘 날짜로부터 d-day 날짜 이내에 포함되는지 여부를 체크하여 boolean으로 리턴
     * @param { string } date : yyyy.mm.dd
     * @return { boolean }
     */
    checkJoinDDay(date){
      var userDate = new Date(date.split('.')[0], date.split('.')[1] - 1, date.split('.')[2]);
      var userDDay = this.calcDiffDate(userDate);

      if(userDDay > -this.joinDDay && userDDay < this.joinDDay) {
        this.hasWelcomeList = true;
        return true;
      }
      
      return false;
    },
    /**
     * paper 작성 페이지 링크를 클립보드에 복사
     * @param { string } pathname : paper 작성 페이지 url의 경로
     */
    copyUrl(pathname){
      var url = window.location.href.replace('/main', '') + pathname;

      if (typeof(navigator.clipboard)=='undefined') {
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = url;
        textarea.select();
        textarea.setSelectionRange(0, 9999);
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('url이 복사되었습니다.');

        return ;
      }

      navigator.clipboard.writeText(url).then(function(){
        alert('url이 복사되었습니다.')
      });
    },
    toggleCheckbox(){
      this.closeToday = !this.closeToday;
    },
    /**
     * 이름이 name인 쿠키의 값을 value로 갱신하고 쿠키를 유지할 유효 날짜를 오늘로부터 expiredays일 후로 설정
     * @param { string } name: 쿠키의 이름
     * @param { string } value: 쿠키의 값
     * @param { number } expiredays: 오늘로부터 설정할 유효날짜 까지의 일 수
     */
    setCookie(name, value, expiredays){
      var todayDate = new Date();
      todayDate.setDate( todayDate.getDate() + expiredays );
      // 쿠키의 유효 일자는 반드시 GMT(Greenwich Mean Time) 포맷으로 설정
      document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
    },
    /**
     * 이름이 name인 쿠키의 값을 바환
     * @param { string } name: 쿠키의 이름
     * @return { string } : 쿠키의 값(이름이 name인 쿠키가 존재하지 않을 경우 "" 리턴)
     */
    getCookie(name){
      var cookie = document.cookie;
      var obj = name + "="; 
      var startIdx = 0; 

      while( startIdx <= cookie.length ) { 
        var endIdx = startIdx + obj.length;

        // 쿠키 이름이 name과 일치할 경우
        if(cookie.substring( startIdx, endIdx ) == obj){ 
          var endOfCookie = cookie.indexOf( ";", endIdx );
          // 쿠키가 마지막번째일 경우
          if(endOfCookie == -1 ){
            endOfCookie = cookie.length;
          }

          // 쿠키의 값만 리턴
          return unescape( cookie.substring( endIdx, endOfCookie ) ); 
        }
        
        // 다음 쿠키의 name=value쌍의 string에서 첫번째 인덱스로 startIdx값 갱신
        startIdx = cookie.indexOf( " ", startIdx ) + 1; 
        
        // 더 이상 쿠키가 존재하지 않을 경우 break
        if ( startIdx == 0 ) {
          break; 
        }
      }

      // 이름이 name인 쿠키가 존재하지 않을 경우
      return "";
    }
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList']),
    ...mapGetters({'sortedPeopleInfoList': 'infoListSortedByName'}),
    birthIndex(){
      return this.getHeaderIndex(Info.birth);
    },
    joinDateIndex(){
      return this.getHeaderIndex(Info.joinDate);
    },
    today(){
      return new Date();
    },
    isPopupShow(){
      return this.isShow && (this.hasBirthdayList || this.hasWelcomeList);
    },
  },
  created(){
    var closeToday = this.getCookie("closeToday");
    this.isShow = (closeToday.toLowerCase() !== 'y') ? true : false;
  },
  mounted(){
    // gsap: particle
    gsap.set('.particle', {
      x: `random(-20, ${this.x + 100}, true)`,
      y: -20,
      opacity: 0,
      width: 'random(5, 20, true)',
      height: 'random(10, 30, true)',
      scale: 'random(0.25, 1.5, true)',
      background: () => `hsl(${gsap.utils.random(100, 360)}, 90%, 70%)`,
    })
    
    gsap.to('.particle', {
      y: 800,
      duration: 9,
      rotation: 'random(0, 360, true)',
      opacity: 'random(0.1, 1)',
      stagger: {
        each: 0.3,
        from: "center",
        grid: "auto",
        ease: "none",
        repeat: -1,
        repeatDelay: 0,
      },
    });
     
    // gsap timeline: firework
    const fireworkTl = gsap.timeline({repeat: -1, repeatDelay: 2});
    fireworkTl.set(".popup .line",{ transformOrigin: 'left center' });

    const lineEl = gsap.utils.toArray('.popup .line');
    lineEl.forEach( (el, idx) => {
      fireworkTl.set(el, { rotation: `${45 + (45 * idx)}deg`});
    })

    fireworkTl
      .to(".popup .line_inner", {
        width:"0",
        left:"0%",
        opacity:0,
        duration: 0.1,
        ease: 'ease-in'
      }).to(".popup .line_inner", {
        width:"30%",
        left:"20%",
        opacity:1,
        duration: 0.6,
        ease: 'ease-in'
      }).to(".popup .line_inner", {
        left:"50%",
        width:"0",
        duration: 2,
        opacity:0,
        ease: 'ease-out'
    });
  
    // gsap timeline: star
    const starTl = gsap.timeline({ repeat: -1 }).yoyo(true);
    starTl
      .set('.popup_title_new', { rotate: 0, scale: 1.3, ease: 'ease-in' })
      .to('.popup_title_new', 1.5, { rotate: 45, scale: 1, ease: 'ease-out' });
  }
  
}
</script>

<style scoped  lang="scss">
@include scroll;

.popup_wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  &:before{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.popup {
  position: fixed;
  width: 640px;
  max-height: 780px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 48px 24px 24px;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.popup_inner {
  position: relative;
  max-height: calc(80vh - 48px);
  overflow-y: auto;
  overflow-x: hidden;
}

.popup_section {
  margin-bottom: 40px;
  padding-top: 18px;
  border-top: 1px solid #e7e7e7;
}

.popup_section_item {
  background-color: #fff;
}

.popup_section_title {
  display: block;
  position: relative;
  font-family: "NotoSansKR";
  font-size: 18px;
  font-weight: 500;
  color: #1d1d1d;
}

.popup_section_cont {
  margin-top: 20px;
}

.popup_section_item {
  display: block;
  margin-top: 4px;

  &:first-child {
    margin-top: 0;
  }
}
.people_profile {
  display: block;
  position: relative;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(219, 196, 255, 0.08);
}

.people_profile_thumb {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 20%;
  background-image: url('../assets/img/ico-profile.png');
  background-size: 14px;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.people_profile_img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 20%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.people_profile_text {
  display: inline-block;
  margin-right: 8px;
  font-family: "NotoSansKR";
  font-size: 14px;
  vertical-align: middle;
}

.people_profile_sub_text {
  display: inline-block;
  margin-right: 4px;
  font-family: "NotoSansKR";
  font-size: 12px;
  vertical-align: middle;
  color: #444;
}

.people_profile_dday {
  padding-left: 20px;
  background: url('../assets/img/ico-anniv.svg') left center no-repeat;
  background-size: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #ff627c;
  float: right;
}

.people_profile_share_btn {
  display: inline-block;
  float: right;
  height: 100%;
  padding-left: 20px;
  background: url('../assets/img/ico-copy.svg') left center no-repeat;
  background-size: 16px;
  font-family: "NotoSansKR";
  line-height: 1.6;
  font-size: 12px;
  vertical-align: middle;
  border-radius: 4px;
  vertical-align: middle;
}

.popup_notice {
  display: block;
  position: relative;
  margin-top: 8px;
  text-align: right;
}

.popup_close_today_ip {
  display: none;
}

.popup_close_today_label {
  position: relative;
  display: inline-block;
  width: auto;
  padding: 0 0 0 24px;
  font-family: "NotoSansKR";
  font-size: 14px;
  color: #444;
}

.popup_close_today_checkbox {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 4px;

  &.is-checked {
    background-image: url('../assets/img/icon-check.png');
    background-size: 10px;
    background-position: center;
    background-repeat: no-repeat;
  };
}

.popup_close_btn {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 20px;
  right: 24px;
  background: url('../assets/img/ico-close.png') center no-repeat;
  background-size: cover;
  opacity: 0.4;
}

.popup_title_birth {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-left: 14px;
  transform: rotate(20deg) translateX(-50%);
  z-index: 10;
  vertical-align: middle;
}

.popup_title_birth_ico {
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


.popup_title_new {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-left: 12px;
  transform: rotate(-15deg) translate(-50%);
  background: url('../assets/img/ico-star.svg') center no-repeat;
  background-size: cover;
  z-index: 10;
}

.particle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.object {
  top: 0px;
  width: 5px;
  height: 5px;
  position: absolute;
  z-index: 0;
}
@include tablet {
  .popup {
    width: calc(100% - 48px);
    max-width: 640px;
  }
}

</style>