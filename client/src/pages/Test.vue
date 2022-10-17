<template>
  <div>{{ getUserInfo('1012-02') }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.name ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.img ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.account ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.group ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.team ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.birth ) }}</div>
  <div>{{ getUserInfo('1012-02', this.Info.joinDate ) }}</div>
</template>

<script>
import { mapState } from 'vuex';
import mixin from '../utils/mixin';
import { Info } from '../utils/data.js';

export default {
  name: 'TestPage',
  mixins: [mixin],
  components: {
  },
  props: {
  },
  data(){
    return {
      Info: Info
    }
  },
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList'])
  },
}
</script>

<style scoped>
  div {
    font-size: 14px;
  }
</style>
