<template>
  <div v-show="mode === 'birth'" class="notification">
    생일을 맞은 <span>{{user}}</span> 님에게 축하의 마음을 전해주세요!
  </div>
  <div v-show="mode === 'join'" class="notification">
    입사 <strong>{{year}}</strong>주년을 맞은 <span>{{user}}</span> 님에게 축하의 마음을 전해주세요!
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    user: String,
    mode: String,
    year: Number,
  }
}
</script>

<style scoped lang="scss">
.notification {
  border-radius: 8px;
  background-color: #faeef2;
  border: 1px solid #ff8b8b;
  font-size: 18px;
  color:#ff8b8b;
  padding: 16px;
  strong {
    color:#ff8b8b;
  }
  span {
    color:#7c7c7c;
  }
}
</style>