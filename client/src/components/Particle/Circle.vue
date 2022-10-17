<template>
  <div v-for="(cir, i) in count" :key="i" class="circle-object object"></div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'Circle',
  props: {
    mode: String,
  },
  data() {
    return {
      count: (
        this.mode === 'write'
        ? window.innerWidth > 500 ? 35 : 25
        : 25
      ),
      x: (
        this.mode === 'write'
        ? window.innerWidth / 2
        : window.innerWidth > 1024
        ? (1280 / 3 ) / 2
        : window.innerWidth / 2
      ),
    }
  },
  mounted() {
    let tl = gsap.timeline();
    tl.set(`.circle-object`, {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
    }).to(`.circle-object`, {
        x: `random(-${this.x}, ${this.x}, true)`,
        y: 'random(-250, 250, true)',
        scale: 'random(0.25, 1.5, true)',
        ease: 'back.out(1.7)',
        duration: 2,
        delay: 'random(0, 0.2, true)',
        borderRadius: '50%',
        background: () => `hsl(${gsap.utils.random(0, 360)}, 75%, 85%)`,
        repeat: -1,
        repeatDelay: 0.5,
        repeatRefresh: true,
      });
  },
}
</script>

<style scoped lang="scss">
.object {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: burlywood;
  transform: translate(-50%, -50%);
}
</style>