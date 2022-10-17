<template>
  <div class="loading">
    <div class="loading_spinner">
      <span class="dot green"></span>
      <span class="dot orange"></span>
    </div>
    <span class="loading_text">LOADING</span>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'Loading',
  mounted() {
    let tl1 = gsap.timeline({ repeat: -1 }).yoyo(true);
    tl1
      .set('.dot.green', { scale: 0.5, y: '+=20', ease: 'none' })
      .to('.dot.green', 0.7, { scale: 0.8, ease: 'none' });

    let tl2 = gsap.timeline({ repeat: -1 }).yoyo(true);
    tl2
      .set('.dot.orange', { scale: 0.5, y: '-=20', ease: 'none' })
      .to('.dot.orange', 0.7, { scale: 0.8, ease: 'none' });

    let tl3 = gsap.timeline({ repeat: -1, ease: 'none' });
    tl3
      .set('.dot.orange', { rotate: 0 })
      .to('.loading_spinner', 1.4, { rotate: 360, ease: 'none' });
  },
};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff40;

  &_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.25em;
    z-index: 9;
  }

  &_spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .dot {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0.8;
  }
  .green {
    background: rgb(86, 219, 86);
  }
  .orange {
    background: #ffc42c;
  }
}
</style>
