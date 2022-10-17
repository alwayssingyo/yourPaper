<template>
  <div class="sunlight"></div>
  <div v-for="(obj, i) in count" :key="i" class="cloud-object object"></div>
</template>

<script>
import gsap from 'gsap';
export default {
  name: 'Cloud',
  props: {
    mode: String,
  },
  data() {
    return {
      count: (
        this.mode === 'write'
        ? window.innerWidth > 500 ? 10 : 5
        : 5
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
    gsap.set('.sunlight', {
      y: `70`,
      scale: '1',
    });
    gsap.to(".sunlight", {
      duration: 3,
      ease: "power1.out",
      y: -280,
      scale: '1.2',
      background: 'gold',
    });

    gsap.set('.cloud-object', {
      x: `random(-20, ${this.x - 100}, true)`,
      y: `random(50, 400, true)`,
      alpha: 'random(0.1, 0.8)',
    });

    gsap.to(".cloud-object", {
      duration: 1,
      ease: "power1.inOut",
      scale: 'random(0.9, 1.1)',
      repeat: -1,
      alpha: 'random(0.1, 0.8)',
      yoyo: true,
      stagger: {
        grid: [10,10],
        from: "random",
        amount: 0,
        repeatDelay: 0,
      }
    });
  },
}
</script>

<style scoped lang="scss">
.sunlight {
  position: absolute;
  bottom: 0;
  left: 50px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #FF0602;
  box-shadow: inset 0 -10px 15px #ffedcc;
}
.object {
  font-size: 30px;
  position:absolute;
  left:0;
  right:0;
  width:120px;
  height:50px;
  background:#fff;
  display:block;
  -webkit-border-radius:100px;
  -moz-border-radius:100px;
  border-radius:100px;
  text-align:center;
  z-index:5;
  /* box-shadow:0px 1px 0px rgba(0,0,0,.1); */
}

.object:before,
.object:after {
  z-index:-9999;
  position:absolute;
  background:#fff;
  content:"";
  -webkit-border-radius:100px;
  -moz-border-radius:100px;
  border-radius:100px;
}

.object:before {
  top:-15px;
  left:25px;
  width:35px;
  height:35px;
}

.object:after {
  top:-25px;
  right:25px;
  width:50px;
  height:50px;
}
</style>