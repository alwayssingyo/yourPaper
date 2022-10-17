<template>
  <div class="custom">
    <div class="custom_tabs">
      <div
        v-for="(tab, i) in tabs"
        :key="i"
        :id="i"
        class="tab"
        :class="[{ active: i == currTab }, { selected: currOption[i] !== null }]"
        @click="onSelectTab"
      >
        {{ tabs[i] }}
      </div>
    </div>

    <div
      v-for="(tab, i) in subOption"
      :key="i"
      :id="i"
      class="custom_sub_options"
      :class="{ active: i == currTab }"
    >
      <div class="sub_options_inner">
        <div class="reset" @click="onClickReset"></div>
        <div
          v-for="(op, j) in tab"
          :key="j"
          :id="j"
          class="sub_option"
          :class="[op, { active: j == currOption[currTab] }]"
          @click="onSelectSubOp"
        >
          {{ key[i] === 'font' ? 'Aa' : '' }}
        </div>
      </div>
      <button class="all-reset" @click="onClickAllReset" :class="{active: isAllReset}">All Reset</button>
    </div>
    <p class="desc">&ast; 서체를 제외한 테마, 배경, 효과는 중복 선택이 불가합니다.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { custom } from '../utils/data.js';

export default {
  name: 'Custom',
  data() {
    return {
      tabs: ['테마', '배경', '효과', '서체'],
      subOption: [custom.theme, custom.background, custom.particle, custom.font],
      currTab: null,
      currOption: [null, null, null, null], // theme, bg, font
      optionState: {},
      isAllReset: false,
    };
  },
  computed: {
    key: () => Object.keys(custom), // custom data 의 key
  },
  methods: {
    onSelectTab(e) {
      this.currTab = e.target.id;
    },
    onSelectSubOp(e) {
      this.currOption[this.currTab] = e.target.id;

      // theme, background 중 하나만 선택 가능
      if (this.currTab === '0') {
        this.currOption[1] = null;
        this.currOption[2] = null;
      }
      if (this.currTab === '1') {
        this.currOption[0] = null;
        this.currOption[2] = null;
      }
      if (this.currTab === '2') {
        this.currOption[0] = null;
        this.currOption[1] = null;
      }

      this.allSelected();
      this.updateOption();
    },
    onClickReset(e) {
      this.currOption[this.currTab] = null;
      this.allSelected();
      this.updateOption();
    },
    onClickAllReset(e) {
      e.preventDefault();
      this.$store.commit('resetCustomOption');
      this.currOption.map((state, i) => this.currOption[i] = null);
      this.isAllReset =  false;
    },
    updateOption() {
      // vuex state 객체 형태에 맞게 가공
      // 선택한 옵션 string 타입 으로 전달
      this.key.map((k, i) => (this.optionState[k] = this.subOption[i][this.currOption[i]]));
      this.$store.commit('updateCustomOption', { ...this.optionState });
    },
    allSelected() {
      let selected = this.currOption.filter((state, i) => state != null);
      selected.length > 0 ? this.isAllReset = true : this.isAllReset = false;
    }
  },
  mounted() {},
  components: {},
};
</script>

<style scoped lang="scss">
@keyframes check {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.custom {
  padding: 16px 0;
  margin-bottom: 20px;
  border-top: 1px dashed #c4c4c4;
  border-bottom: 1px dashed #c4c4c4;

  &_tabs {
    display: flex;

    .tab {
      position: relative;
      width: 60px;
      height: 50px;
      margin-right: 16px;
      color: #000;
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      color: #a1a1a195;
      font-weight: bold;
      border-radius: 4px;
      background-color: #ffffff;
      cursor: pointer;
      border-radius: 4px;

      &:after {
        content: '';
        position: absolute;
        top: -4px;
        right: -4px;
        width: 16px;
        height: 16px;
        background: url(../assets/img/ico-check.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        display: none;
        animation: check;
        animation-fill-mode: forwards;
        animation-duration: 0.2s;
      }

      &.active {
        color: #556fff;
        border-bottom: 4px solid #556fff;
      }

      &.selected {
        color: #00c7a1;
        border-bottom: 4px solid #00c7a1;

        &:after {
          display: block;
        }
      }
    }
  }

  &_sub_options {
    display: flex;
    padding: 12px;
    margin-top: 16px;
    border-radius: 8px;
    background-color: #fff;
    filter: drop-shadow(1px 2px 0px #5b3a9710);
    display: none;

    &.active {
      display: block;
    }

    .reset {
      position: relative;
      min-width: 50px;
      height: 50px;
      margin-right: 16px;
      color: #000;
      font-size: 14px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      background-color: #f1f2f7;
      cursor: pointer;

      &:before {
        content: '';
        width: 100%;
        height: 100%;
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../assets/img/ico-reload.png);
        background-repeat: no-repeat;
        background-size: 28px 28px;
        background-position: center;
      }
      &:active:before {
        transform: scale(0.9);
      }
      &:hover:before {
        opacity: 0.4;
      }
    }
    .sub_options_inner {
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 12px;
      border-bottom: 1px dashed #c4c4c4;

      &::-webkit-scrollbar {
        display: none;
      }

      .sub_option {
        position: relative;
        min-width: 54px;
        height: 54px;
        color: #000;
        line-height: 46px;
        font-size: 20px;
        text-align: center;
        background-color: #e0e0e0;
        border-radius: 4px;
        border: 4px solid rgb(232, 232, 232);
        overflow: hidden;
        cursor: pointer;

        &.active {
          border-color: #00c7a1;
        }
      }

      @include theme;
      @include background;
      @include font;
      @include particle;

      .sub_option + .sub_option {
        margin-left: 12px;
      }
    }
  }

  .all-reset {
    display: inline-block;
    padding: 5px 16px;
    color: #cdcdcd;
    font-size: 14px;
    background: transparent;
    border-radius: 4px;
    border: 1px solid #cdcdcd;
    margin-top: 12px;
    pointer-events: none;
    transition: all 0.2s;

    &.active {
      color: #00c7a1;
      border-color: #00c7a1;
      background: #f3fffd;
      pointer-events: auto;
    }
    &:hover {
      background: #f1f2f8;
    }
  }

  .desc {
    color: #556fff;
    color: #ff627c;
    color: #00c7a1;
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
  }
}
</style>
