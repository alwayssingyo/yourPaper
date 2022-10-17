<template>
<div class="error">
  <h1 class="error_title">ERROR!</h1>
  <p class="error_desc">
    에러가 발생했습니다.<br>
    페이지를 새로고침 하거나 이전 페이지로 돌아가세요.
  </p>
  <div class="error_bottom">
    <button type="button" class="error_button" @click="goBack">이전 페이지로 돌아가기</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ErrorPage',
  methods: {
    goBack(){
      this.$router.back();
    }
  }
}
</script>

<style scoped lang="scss">
  .error {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 180px;
  }

  .error_title {
    font-family: 'Roboto';
    font-size: 38px;
    text-align: center;
    color: #444;
    font-weight: bold;
  }

  .error_desc {
    max-width: 400px;
    margin: 32px auto;
    text-align: center;
    font-family: 'Roboto';
    font-size: 18px;
    color: #6B6B6B;
  }

  .error_bottom {
    margin-bottom: 40px;
    text-align: center;
  }

  .error_button {
    display: inline-block;
    padding: 8px 20px;
    background-color: #575757;
    border-radius: 4px;;
    font-family: 'NotoSansKR';
    font-size: 14px;
    color: #fff;
  }
</style>
