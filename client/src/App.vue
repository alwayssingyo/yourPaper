<template>
  <Header />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapState } from 'vuex';
import Header from './components/Header.vue';

// google-spreadsheet api
const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require('./gs_cred.json');
const doc = new GoogleSpreadsheet("1gmrkBG-g9DLkM_PiIxZQq8V9sIC6dOFnU8ZFZOARlAk");  // 문서ID

// gsap
gsap.registerPlugin(ScrollTrigger);


export default {
  name: 'App',
  components: {
    Header,
  },
  data(){
    return {
    }
  },
  methods: {
    /**
     * store변수 peopleInfoList에 getDataFromSheet()함수로 얻은 전체 직원 정보 리스트를 업데이트
     */
    updatePeopleInfoList(peopleInfoList){
      this.$store.commit('updatePeopleInfoList', peopleInfoList);
    },
    /**
     * store변수 peopleInfoList에 getDataFromSheet()함수로 시트의 헤더 정보 리스트를 업데이트
     */
    updateSheetHeaderValue(val){
      this.$store.commit('updateSheetHeaderList', val);
    }
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList'])
  },
  beforeMount(){
  },
  mounted (){
  },
  beforeCreate(){
    /**
     * google spread sheet api 인증 처리  
     * -fulfilled: 인증 성공  
     * -rejected: 에러 발생 안내
     */
    async function authGoogleSheet(){ 
      try { 
        await doc.useServiceAccountAuth(gs_creds); 
      }
      catch(err) { 
        // 인증 에러
        console.log('AUTH ERROR: ', err);
      } 
    } 

    /**
     * 시트에 접근하여 시트의 row 정보(type: GoogleSpreadsheetRow{})를 배열로 리턴
     * @return {array} : [GoogleSpreadsheetRow{}, ...]
     */
    async function getDataFromSheet(){ 
      try {
        await doc.loadInfo(); // 문서 로드
        var sheet = doc.sheetsByIndex[0]; // 첫번째 시트

        var rows = await sheet.getRows({offset:0}); // 시트의 row 정보
        return rows;
      }
      catch(err) {
        // 시트 접근 또는 시트의 row 정보를 가져오는데 실패했을 경우
        console.log('AUTH ERROR: ', err);
      }
    } 

    /**
     *  에러 페이지로 redirect
     */
    function goToErrorPage() {
      if(window.location.pathname !== '/error'){
        window.location.replace('/error');
      }
    }

    // google spread sheet api 인증 성공 후 시트에서 얻은 전체 직원 정보를 배엻 형태로 store 변수에 업데이트
    authGoogleSheet().then(() => {
      getDataFromSheet().then( val => {
        // 각 row의 GoogleSpreadsheetRow 객체에서 _rawData 정보만 배열로 리턴
        var peopleInfoList = val.map( el => el._rawData);
        // store 변수 업데이트
        this.updatePeopleInfoList(peopleInfoList);
        this.updateSheetHeaderValue(val[0]._sheet.headerValues);
        this.$store.commit('updateIsLoadedData', true);
        })
        .catch(() => { goToErrorPage(); });
    })
    .catch(()=>{ goToErrorPage(); });
  }
}

</script>

<style lang="scss">
  #app {
    width: 100%;
  }
  
  .container {
    width: 100%;
    max-width: 1280px;
    height: 100%;
    margin: 0 auto;
    padding: 0 28px;
  }
</style>
