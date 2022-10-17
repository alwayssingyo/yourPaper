
let mixin = {
  methods: {
    /**
     * header 인자값을 넘기지 않으면 해당 id의 user 정보를 배열로 리턴  
     * header 인자값을 넘기면 user 정보 중 header에 해당하는 열의 값만 리턴
     * @param { String } id : 사원번호
     * @param { String } header? : 시트의 헤더 (type: Info[property] from data.js ) :    
     * name: 이름 | img: 사진 | group: 실 | team: 팀 | account: 회사 이메일 | birth: 생일 | joinDate: 입사일 | id: 사원번호
     * @return { array, string } : [이름, 사진 url , 실, 팀, 이메일, 생일, 입사일, 사원번호] || 이름 | 사진 |...
     */
    getUserInfo(id, header){
      var index = this.$getUserIndex(this.peopleInfoList, id);
      var headerIndex = this.sheetHeaderList.indexOf(header);
      
      if(headerIndex !== -1){
        return this.peopleInfoList[index][headerIndex];
      }

      return this.peopleInfoList[index];
    },
    /**
     * 구글 시트의 header 행에서 인자 값에 해당하는 열의 인덱스를 반환
     * @param { string } value : header 값
     * @returns { number }
     */
    getHeaderIndex(value){
      return this.sheetHeaderList.indexOf(value);
    },
    /**
     * 오늘 날짜로부터 date까지 날짜 일 수 차이 계산
     * @param { object } date : type: Date
     * @returns { number } : 오늘 날짜로부터 date까지의 날짜 일 수
     */
    calcDiffDate(date){
      let today = new Date();

      today.setHours(0,0,0,0);
      date.setHours(0,0,0,0);

      let diff = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      diff = Math.floor(diff);

      return diff;
    }
  }
}

export default mixin