<template>
  <div class="modal" :class="{ open: isOpen }">
    <div class="modal_mask"></div>
    <div class="modal_layer">
      <div class="modal_close" @click="onClickClose"></div>
      <div class="modal_body">
        <p v-for="(msg, i) in message" :key="i">{{ msg }}</p>
      </div>
      <div class="modal_footer">
          <button class="submit" @click="onSubmit">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    message: Array,
    isModal: Boolean,
    onModalHandler: Function,
    deleteModal: Boolean,
  },
  data() {
    return {
      isOpen: false,
      isDelete: false,
    };
  },
  mounted() {
    this.isOpen = this.isModal;
    this.isDelete = this.deleteModal;
  },
  methods: {
    onSubmit() {
      this.onModalHandler(false, 'submit');
      if( this.isDelete === true ){
        this.$emit('deleteCard');
      }else {
        this.$router.push('/');
      }
    },
    onClickClose() {
      this.isOpen = false;
      this.onModalHandler(false, 'cancle');
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  display: none;
  position: relative;
  z-index: 100;

  &.open {
    display: block;
  }
  &_mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000025;
  }
  &_close {
    position: absolute;
    top: 16px;
    right: 14px;
    width: 14px;
    height: 16px;
    opacity: 0.4;
    background: url(../assets/img/ico-close.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
  &_layer {
    min-width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background-color: #fff;
  }
  &_body {
    padding: 32px 18px 24px;
    font-size: 16px;
    text-align: center;
    p {
      color: #575757;
    }
  }
  &_footer {
    padding: 16px;
    padding-top: 0;
  }

  button {
    width: 100%;
    font-size: 16px;
    height: 40px;
    color: #556fff;
    border-radius: 4px;
    background: #f5f5ff;
    border: 1px solid #556fff;

    &:hover {
      background: #ececff;
    }
  }
}
</style>
