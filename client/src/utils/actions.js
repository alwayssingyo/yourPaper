const methods = {
  getUserIndex(arr, id){
    var rows = '';
    arr.some((val, index) => {
      rows = index;
      return (val.lastIndexOf(id) !== -1);
    });
  
    return rows;
  }
}
export default {
  install(Vue) {
    Vue.config.globalProperties.$getUserIndex = methods.getUserIndex;
  }
}
