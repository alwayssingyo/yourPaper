<template>
  <div class="particle-wrapper">
    <Circle v-if="particle === 'circle'" :mode="mode"/>
    <Celebrate v-if="particle === 'celebrate'" :mode="mode"/>
    <Snow v-if="particle === 'snow'" :mode="mode"/>
    <Cloud v-if="particle === 'cloud'" :mode="mode"/>
  </div>
</template>

<script>
import Circle from './Circle.vue';
import Celebrate from './Celebrate.vue';
import Snow from './Snow.vue';
import Cloud from './Cloud.vue';

export default {
  name: 'ParticleContainer',
  props: {
    particle: String,
    mode: String,
  },
  components: {
    Circle,
    Celebrate,
    Snow,
    Cloud,
  }
}
</script>

<style scoped lang="scss">
.particle-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: #fff;
}
</style>