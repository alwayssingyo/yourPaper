<template>
  <div class="envelope_mask"></div>
  <div class="envelope_wrapper">
    <div class="envelope">
      <div class="flap"></div>
      <div class="pocket"></div>
      <div class="paper">
        <div class="letter"></div>
        <div class="letter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'SendAnim',
  mounted() {
    const tl = gsap.timeline({repeat: -1, repeatDelay: 0.2});
    tl.set('.paper', {
      alpha: 0,
      y: -50,
    });

    tl.to('.paper', {
      y: 0,
      alpha: 1,
      duration: 0.5,
      ease: "circ.out",
    }).to('.flap', {
      duration: 0.3,
      rotationX: 180,
      transformOrigin: 'bottom',
      zIndex: 3,
    }).to('.envelope', {
      duration: 0.2,
      scale: 0.9,
    }).to('.envelope', {
      duration: 0.2,
      scale: 1,
      alpha: 0,
    })
  }
}
</script>

<style scoped lang="scss">
.envelope_mask {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000040;
}
  
.envelope_wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  /* filter: drop-shadow( 2px 2px 0px #ffffff9e); */

  .envelope {
    height: 60px;
    position: relative;
    background: #bed1df;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .flap {
    position: absolute;
    left: 0;
    bottom: 100%;
    border-right: calc(100px / 2) solid transparent;
    border-left: calc(100px / 2) solid transparent;
    border-bottom: calc(60px / 2) solid #b5cbdb;
  }

  .pocket {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    border-left: calc(100px / 2) solid #deeef8;
    border-right: calc(100px / 2) solid #c6dbe9;
    border-bottom: calc(60px / 2) solid #c6dbe9;
    border-top: calc(60px / 2) solid transparent;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .paper {
    position: relative;
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    height: 90%;
    top: 5%;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);

    &:after{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(
        180deg, 
        rgba(255,255,255,0.00) 25%, 
        rgba(215,227,239,0.50) 55%, 
        rgba(215,227,239,8.00) 100%
      );
    }

    .letter {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 30px;
      height: 8px;
      background: #EEEFF0;
    }
    
    .letter:nth-child(2) {
      top: 25px;
      width: 80%;
      height: 8px;
    }
  }
}
</style>