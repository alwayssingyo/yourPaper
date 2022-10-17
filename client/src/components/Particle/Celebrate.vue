<template>
  <div v-for="(part, i) in count" :key="i" class="celebrate-object object"></div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'Celebrate',
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
    };
  },
  mounted() {
    // celebrate particle
    let tl = gsap.timeline().repeat(-1).repeatDelay(0.5);
    tl.set('.celebrate-object', {
      width: '40px',
      height: '40px',
      borderRadius: '0',
    }).to('.celebrate-object', {
      x: `random(-${this.x}, ${this.x}, true)`,
      y: 'random(-250, 250, true)',
      width: 'random(10, 30, true)',
      height: 'random(20, 50, true)',
      scale: 'random(0.25, 1.5, true)',
      ease: 'power2.out',
      duration: 1.5,
      delay: 'random(0, 0.2, true)',
      background: () => `hsl(${gsap.utils.random(100, 360)}, 90%, 70%)`,
      rotation: 'random(0, 360, true)', 
      opacity: 1,
    }).to('.celebrate-object', {
      opacity: 0,
    })
  },
};
</script>

<style scoped lang="scss">
.object {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}
</style>
