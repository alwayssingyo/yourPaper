<template>
  <div v-for="(snow, i) in count" :key="i" class="snow-object object"></div>
</template>

<script>
import gsap from 'gsap';
export default {
  name: 'Snow',
  props: {
    mode: String,
  },
  data() {
    return {
      count: (
        this.mode === 'write'
        ? window.innerWidth > 500 ? 50 : 40
        : 40
      ),
      x: (
        this.mode === 'write'
        ? window.innerWidth
        : window.innerWidth > 1024
        ? window.innerWidth / 3 
        : window.innerWidth
      ),
    };
  },
  mounted() {
    gsap.set('.snow-object', {
      x: `random(-20, ${this.x + 20}, true)`,
      y: -20,
      opacity: 1,
    })
    gsap.to('.snow-object', {
      y: 500,
      duration: 5,
      scale: 'random(0.25, 1.2, true)',
      opacity: 'random(0.1, 0.8)',
      stagger: {
        each: 0.3,
        from: "center",
        grid: "auto",
        ease: "none",
        repeat: -1,
        repeatDelay: 0,
      },
    })
  },
}
</script>

<style scoped lang="scss">
.object {
  top: 0px;
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background: #fff;
  background: radial-gradient(
    circle, 
  rgba(255,255,255,1) 20%, 
  rgba(255,255,255,0) 80%
  );
}
</style>