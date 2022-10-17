import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      peopleInfoList: [],
      sheetHeaderList: [],
      customOption: { theme: null, background: null, particle: null, font: null},
      isLoadedData: false
    };
  },
  getters: {
    // 직원 리스트를 이름순으로 정렬
    infoListSortedByName: state => {
      return state.peopleInfoList.sort(function(a, b){
        return a[0] < b[0] ? -1 : a[0] > b[0] ? 1: 0;
      });
    }
  },
  mutations: {
    updatePeopleInfoList(state, payload) {
      state.peopleInfoList = payload;
    },
    updateSheetHeaderList(state, payload) {
      state.sheetHeaderList = payload;
    },
    updateCustomOption(state, payload) {
      state.customOption = { ...payload };
    },
    resetCustomOption(state) {
      state.customOption = { theme: null, background: null, particle: null, font: null };
    },
    updateIsLoadedData(state, payload) {
      state.isLoadedData = payload
    }
  },
  actions: {},
});

export default store;
