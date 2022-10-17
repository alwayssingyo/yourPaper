<template>
  <router-link class="top-header" to="/" @click="setRoute">YOUR Paper</router-link>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    setRoute(){
      if(this.$route.path === '/main') {
        this.$router.go(this.$router.currentRoute);
      }
      else {
        this.$router.push('/main');
      }

    }
  }
}
</script>

<style lang="scss">
.top-header {
  display: block;
  width: 100%;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
  background: #556fff;
  padding: 6px 32px;
  filter: drop-shadow(1px 4px 0px #5b3a9730);
}
</style>