<template>
  <form class="form" :onSubmit="onSubmit">
    <div class="form_title_box" :class="customOption.font">
      <input class="form_input" v-model="title" type="text" placeholder="제목을 입력하세요." />
    </div>
    <div
      class="form_textarea_box"
      :class="[customOption.theme, customOption.background, customOption.font, customOption.particle]"
    >
      <textarea
        class="form_textarea"
        v-model="content"
        name="write"
        placeholder="메세지를 입력하세요."
      ></textarea>
      <!-- mode: write / paper -->
      <ParticleContainer v-if="customOption.particle" :particle="customOption.particle" mode="write"/>
    </div>
    <div class="form_from_box from">
      <label class="form_label" for="writer">From.</label>
      <input class="form_input" :class="customOption.font" v-model="writer" id="writer" type="text" placeholder="작성자" />
    </div>
    <p class="form_message">{{ message }}</p>

    <Custom />

    <div class="form_btns">
      <button class="submit" type="submit">마음 전하기</button>
      <button class="cancel" @click="onClickReturn">메인으로 돌아가기</button>
    </div>
  </form>

  <Modal
    v-if="isModal"
    :isModal="isModal"
    :onModalHandler="onModalHandler"
    :message="['작성을 취소하시겠습니까?', '작성된 내용은 저장되지 않습니다.']
    "
  />

  <SendAnim v-if="isSend"/>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { customData } from '../utils/data.js';
import { alertMessage, apiUrl } from '../utils/data.js';
import Custom from './Custom.vue';
import Modal from './Modal.vue';
import SendAnim from './SendAnim.vue';
import ParticleContainer from './Particle/ParticleContainer.vue';

export default {
  name: 'Form',
  props: {
    params: String,
  },
  data() {
    return {
      content: '',
      writer: '',
      title: '',
      adult: '',
      message: '',
      alert: alertMessage,
      modalMode: '',
      isModal: false,
      isNotNull: false,
      isSend: false,
      isBadWord: false,
    };
  },
  computed: {
    ...mapState({
      customOption(state) {
        const option = state.customOption;
        return state.customOption;
      },
    }),
  },
  mounted() {
    this.$store.commit('resetCustomOption');
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.modalMode = 'send';

      // Naver 성인검색어 API 사용
      const _this = this;
      const url = `/naver`;
      const headers = {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': '0cXtzQSgVsYcbK1OQFil',
        'X-Naver-Client-Secret': 'i7d1K2ajsS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
      };


      axios
        .all([
          axios.post(`${apiUrl}/api/badwords`, { content: this.content }), 
          axios.get(url, { headers: headers, params: { query: this.content } })
        ])
        .then(
          axios.spread((res1, res2) => {
            // res1 - 비속어, res2 - 성인 검색어
            this.isBadWord = res1.data.bad;
            this.adult = res2.data.adult;

            // Form require message
            if (_this.adult === '1' || _this.isBadWord) {
              _this.message = _this.alert.adult;
            } else if (_this.title.trim() === '') {
              _this.message = this.alert.title;
              _this.title = '';
            } else if (_this.content.trim() === '') {
              _this.message = this.alert.content;
              _this.content = '';
            } else if (_this.writer.trim() === '') {
              _this.message = this.alert.writer;
              _this.writer = '';
            } else {
              _this.message = '';
              _this.isNotNull = true;
            }
          })
        )
        .then((res) => {
          // paper 작성 데이터
          if (_this.isNotNull) {
            axios
              .post(`${apiUrl}/api/write/${this.params}`, {
                memberId: this.params,
                writerName: this.writer,
                detail: this.content,
                date: new Date(),
                theme:
                  this.$store.state.customOption.theme || 
                  this.$store.state.customOption.background || 
                  this.$store.state.customOption.particle,
                readYn: false,
                title: this.title,
                font: this.$store.state.customOption.font,
                particle: this.$store.state.customOption.particle,
              })
              .then((res) => {
                this.isSend = true;
                setTimeout(() => {
                  this.$router.push('/');
                }, 1200)
              });
          }
        })
        .catch((err) => console.log(err));
    },
    onClickReturn(e) {
      e.preventDefault();
      this.modalMode = 'return';
      this.isModal = true;
      // this.$router.push('/');
    },
    onModalHandler(isOpen, value) {
      this.isModal = isOpen;
    },
  },
  components: {
    Custom,
    Modal,
    ParticleContainer,
    SendAnim
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;

  @include theme;
  @include background;
  @include font;
  @include particle;

  &_textarea_box {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 1px solid #efefef;
    background: #fff;
    filter: drop-shadow(1px 2px 0px #5b3a9710);
  }
  &_textarea {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 16px;
    font-size: 18px;
    font-family: 'NotoSansKR';
    border: 0;
    background: transparent;
    box-sizing: border-box;
    resize: none;
    z-index: 10;
  }

  &_message {
    color: #e75656;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &_title_box {
    .form_input {
      width: 100%;
      font-size: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &_from_box {
    text-align: right;
    margin: 12px 0;
    .form_input {
      width: 200px;
    }
  }

  &_label {
    margin-right: 12px;
    font-size: 16px;
    font-weight: bold;
  }

  &_input {
    padding: 10px 16px;
    font-size: 16px;
    font-family: 'NotoSansKR';
    border: 0;
    border: 1px solid #efefef;
    border-radius: 4px;
    background: #fff;
    appearance: none;
    box-sizing: border-box;
    filter: drop-shadow(1px 2px 0px #5b3a9710);
  }

  &_btns {
    .submit,
    .cancel {
      display: block;
      width: 100%;
      height: 50px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      border-radius: 4px;
      filter: drop-shadow(1px 2px 0px #5b3a9710);
    }

    .submit {
      background: #556fff;
    }
    .cancel {
      background: #cdcdcd;
      margin-top: 8px;
    }
  }
}
</style>
