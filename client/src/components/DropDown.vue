<template>
  <div class="dropdown">
    <button 
      type="button" 
      class="dropdown_btn" 
      :class="{'disabled': isDisabled, 'is-active': (isOpen && !isDisabled)}" 
      @click="toggleDropdown">
      {{ getSelectedLabel }}
    </button>

    <ul class="dropdown_list" v-show="isOpen && !isDisabled">
      <li class="dropdown_item" v-for="(val, idx) in list" :key="idx">
        <span class="dropdown_text" @click="$emit('select', val); selectItem(val)">{{ val }}</span>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  name: 'DropDown',
  props: {
    list: Array,
    label: String,
    defaultValue: String
  },
  data(){
    return {
      isOpen: false,
      selected: this.label
    }
  },
  methods: {
    toggleDropdown(){
      this.isOpen = !this.isOpen;
    },
    selectItem(value){
      this.selected = (value == 'All' || value == 'C-level') ? value : value + this.label;
    }
  },
  computed: {
    isDisabled(){
      var list = this.list;
      
      if(Array.isArray(list)){
        return list.length > 0? false : true;
      }

      return true;
    },
    getSelectedLabel(){
      if(this.isDisabled){
        return this.label
      }

      if(typeof(this.defaultValue) == 'undefined' || !this.defaultValue){
        return this.selected;
      }
      
      if(this.defaultValue){
        var label = this.defaultValue;
        if(label.toLowerCase() !== 'all'){
          label += this.label;
        }

        return label;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dropdown {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .dropdown_btn {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px 24px 8px 12px;
    font-family: 'NotoSansKR';
    font-size: 14px;
    line-height: 1.2;
    text-align: left;
    color: #444;
    border-radius: 6px;

    &.disabled {
      background-color: #fbfbfe;
      color: #999;
    }

    &:after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background-image: url('../assets/img/ico-drop-down.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    &.is-active {
      &:after {
        background-image: url('../assets/img/ico-drop-down.svg');
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  .dropdown_list {
    position: absolute;
    width: 100%;
    left: 0;
    top: calc(100% + 8px);
    padding: 12px 0;
    background-color: #fff;
    border-radius: 6px;
    border: solid 1px #e7e7e7;
    z-index: 100;
    overflow: hidden;
  }

  .dropdown_item {
    display: block;
    width: 100%;
  }
  
  .dropdown_text {
    display: block;
    padding: 18px 24px 17px;
    font-family: "NotoSansKR";
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #3f4042;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #fbfbfe;
    }
  }
</style>