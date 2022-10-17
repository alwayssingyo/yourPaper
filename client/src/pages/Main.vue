<template>
<Loading v-show="isLoading"/>

<div class="wrapper" v-show="!isLoading">
  <div class="header">
    <h1 class="header_text">YOUR Paper</h1>
    <div class="header_sub">전하지 못한 진심을 주고 받으세요.</div>
  </div>

  <div class="inner">
    <div class="search">
      <div class="search_bar">
        <input 
          type="text" 
          class="search_bar_ip" 
          placeholder="이름을 입력해보세요."
          :value="searchVal" 
          @input="searchVal=$event.target.value"
        >
      </div>
      <div class="search_filter">
        <div class="search_filter_dropdown ico-group">
          <DropDown 
            :label="'실'" 
            :list="totalGroupList" 
            @select="updateSelectedGroup($event)" />
        </div>
        <div class="search_filter_dropdown ico-team">
          <DropDown 
            :label="'팀'" 
            :list="getTeamList"
            :defaultValue="selectedTeam"
            @select="updateSelectedTeam($event)" />
        </div>
      </div>
    </div>

    <div class="section">
      <div class="people">
        <ul class="people_list">
          <li class="people_item" v-for="(info, idx) in this.sortedPeopleInfoList" :key="idx" v-show="isShow(info)">
            <PeopleList :info="info" />
          </li>
        </ul>
      </div>
    </div>
  </div>

  <EventModal />
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mixin from '../utils/mixin';
import PeopleList from '../components/PeopleList.vue';
import DropDown from '../components/DropDown.vue';
import EventModal from '../components/EventModal.vue';
import Loading from '../components/Loading.vue';
import { Info } from '../utils/data.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: 'MainPage',
  mixins: [mixin],
  data(){
    return {
      selectedGroup: '',
      selectedTeam: '',
      searchVal: ''
    }
  },
  components: {
    PeopleList,
    DropDown,
    EventModal,
    Loading
  },
  methods: {
    updateSelectedGroup(group){
      this.selectedGroup = group;

      if(this.orgChart[group].indexOf(this.selectedTeam) === -1){
        this.selectedTeam = this.orgChart[group][0];
      }
    },
    updateSelectedTeam(team){
      this.selectedTeam = team;
    },
    /**
     * 직원 정보를 파라미터로 전달받아 현재 드롭다운에 선택된 실, 팀에 해당하는지 여부를 boolean 값으로 리턴
     * @param { Array } : 사원 정보 배열
     * @return { Boolean}
     */
    isShow(info){
      let userGroup = info[this.getHeaderIndex(Info.group)],
        userTeam = info[this.getHeaderIndex(Info.team)],
        userName = info[this.getHeaderIndex(Info.name)],
        selectedGroup = this.selectedGroup,
        selectedTeam = this.selectedTeam,
        searchVal = this.searchVal;
      
      // 이름 검색
      if(searchVal !== '' && userName.search(searchVal) === -1) {
        return false;
      }

      // 선택된 실이 전체 실의 리스트에 포함되지 않을 경우 실 전체 선택과 동일하게 처리
      if(this.totalGroupList.indexOf(selectedGroup) === -1) {
        console.log('ERROR:: 선택한 실이 리스트에 존재하지 않습니다.');
        return true;
      }
      // 선택된 실에 속하지 않을 경우
      if(userGroup !== selectedGroup && selectedGroup.toLowerCase() !== 'all') {
        return false;
      }
      // 선택된 실에 포함될 경우
      else {
        // 선택된 팀이 선택된 실의 팀 리스트에 포함되지 않을 경우 팀 전체 선택과 동일하게 처리
        if(this.getTeamList.indexOf(selectedTeam) === -1){
          console.log('ERROR:: 선택한 팀이 리스트에 존재하지 않습니다.');
          return true;
        }
        // 선택된 팀에 속하지 않을 경우
        if(userTeam !== selectedTeam && selectedTeam.toLowerCase() !== 'all'){
          return false;
        }
        // 선택된 팀에 속하는 경우
        return true;
      }
    }
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList', 'isLoadedData']),
    ...mapGetters({'sortedPeopleInfoList': 'infoListSortedByName'}),
    /**
     * 조직도를 각 실에 포함되는 팀들을 배열로 구성하여 객체로 리턴  
     * {All: [team1, team2, ...], group1: [team1, ...], group2: [...], ...}
     * @returns { object }
     */
    orgChart(){
      var orgChart = {};

      // 전체 팀 리스트는 'All'에 push
      orgChart.All = [];

      this.peopleInfoList.map(val => {
        var group = val[this.sheetHeaderList.indexOf(Info.group)]; // 실
        var team = val[this.sheetHeaderList.indexOf(Info.team)];  // 팀

        // 실 추가(key)
        if(!Object.prototype.hasOwnProperty.call(orgChart, group)){
          orgChart[group] = [];
        }

        // 팀 추가(value: array)
        if(team){
          orgChart.All.push(team);
          orgChart[group].push(team);
        }
      });

      // 전체 팀이 2개 이상일 경우 All 항목 추가
      if(orgChart.All.length > 1){
        orgChart.All.unshift('All');
      }
      
      // 팀 리스트 내 중복 값 제거
      Object.keys(orgChart).map(val => {
        var arr = orgChart[val];
        // 팀이 2개 이상일 경우 All 항목 추가
        if(arr.length > 1){
          arr.unshift('All');
        }
        orgChart[val] = Array.from(new Set(arr));
      });

      return orgChart;
    },
    totalGroupList(){
      return Object.keys(this.orgChart);
    },
    getTeamList(){
      var selectedGroup = this.selectedGroup;

      // 선택된 실이 없을 경우 실 리스트의 첫번째 인덱스 값으로 할당 
      if(typeof(selectedGroup) == 'undefined' || selectedGroup === '') {
        selectedGroup = this.totalGroupList[0];
        this.selectedGroup = selectedGroup;
      }

      return this.orgChart[selectedGroup];
    },
    isLoading(){
      return !this.isLoadedData;
    }
  },
  updated(){
    // window resize 이벤트 
    window.dispatchEvent(new Event('resize'));

    gsap.killTweensOf('.people_item'); 

    // gsap timeline: people info list
    this.$nextTick(function () {

      const el = gsap.utils.toArray('.people_item');
  
      el.forEach( el => {

        if(el.offsetWidth !== 0 && el.offsetHeight !== 0){
          gsap.timeline({ 
            scrollTrigger:{
              trigger: el,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
            },
          })
          .fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
        }
      });
    })
  }
}

</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    padding: 16px 0;
  }

  .header_text {
    display: block;
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: 500;
    color: #444;
  }

  .header_sub {
    display: block;
    margin-top: 8px;
    font-family: 'Roboto';
    font-size: 18px;
    color: #3f4042;

    &:before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 1px;
      margin: 0 8px 0 0;
      vertical-align: middle;
      background-color: #000;
    }
  }

  .inner {
    width: 100%;
    padding: 40px 0;
  }

  .search {
    display: flex;
    position: relative;
    width: 100%;
    height: 36px;
    font-size: 0;

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .search_bar {
    flex: 1;
    height: 100%;
    position: relative;
    padding-left: 32px;
    background-image: url('../assets/img/ico-search.svg');
    background-size: 24px;
    background-position: left center;
    background-repeat: no-repeat;
    border-bottom: 1px solid #6B6B6B;
  }

  .search_bar_ip {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-family: 'NotoSansKR';
    font-size: 18px;
    box-sizing: border-box;
  }

  .search_bar_btn {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 12px;
    border: 1px solid #f3f3f3;
    border-radius: 6px;
    font-family: 'NotoSansKR';
    font-size: 14px;
    line-height: 1.2;
  }

  .search_filter {
    flex: 1 0 1;
    width: 400px;
    padding-left: 24px;
    height: 100%;
    text-align: right;
  }

  .search_filter_dropdown {
    display: inline-block;
    width: 180px;
    height: 100%;
    border-radius: 6px;
    border: none;
    background-color: #fff;
    background-size: 18px;
    background-position: left 12px center;
    background-repeat: no-repeat;

    &.ico-group {
      background-image: url('../assets/img/ico-group.svg');
    }

    &.ico-team {
      background-image: url('../assets/img/ico-team.svg');
    }

    & + .search_filter_dropdown {
      margin-left: 16px;
    }

    > div {
      padding-left: 28px;
    }
  }

  .section {
    display: block;
    margin-top: 36px;
  }

  .people_list {
    display: block;
  }

  .people_item {
    display: block;
    margin-top: 16px;

    &:first-child {
      margin-top: 0;
    }
  }

  @include tablet {
    .search {
      display: block;
      height: auto;
    }

    .search_bar {
      display: block;
    }

    .search_filter {
      display: block;
      width: 100%;
      margin: 16px 0 0;
      text-align: right;
    }

    .search_filter_dropdown {
      height: 36px;
      margin-top: 8px;
    }
  }

</style>
