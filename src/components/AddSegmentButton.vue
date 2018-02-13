<template>
    <DropdownMenu :options="options" @click="addNewSegment" class="add">
      <div slot="display">
        <font-awesome-icon :icon="plusIcon" class="icon" size="sm"/>
        <font-awesome-icon :icon="downIcon" class="icon icon-down" size="lg"/>
      </div>
    </DropdownMenu>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faPlus, faSortDown } from '@fortawesome/fontawesome-free-solid'
import DropdownMenu from './DropdownMenu'

const options = ['Country', 'Language', 'Device']
const defaults = {
  'Country': 'United States',
  'Language': 'English',
  'Device': 'iPhone X'
}
export default {
  components: {
    FontAwesomeIcon,
    DropdownMenu
  },
  data: ()=> {
    return {
      isOpen: false,
      options
    }
  },
  computed: {
    plusIcon(){
      return faPlus
    },
    downIcon(){
      return faSortDown
    }
  },
  methods: {
    addNewSegment(i){
      this.isOpen = false;
      this.$emit('addNewSegment', [{
        "param": options[i],
        "op": "is",
        "value": defaults[options[i]]
      }])
    }
  }
}
</script>

<style>
  .add {
    padding: 6px 16px;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    display: inline-block;
  }
  .icon {
    color: grey;
  }
  .icon-down {
    padding-left: 4px;
  }
</style>

