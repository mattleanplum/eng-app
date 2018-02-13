<template>
  <div class="segment-selector">
    <DropdownMenu :options="options" @click="handleSegmentChange">
        <span slot="display">{{selected}}</span>
    </DropdownMenu>
  </div>
</template>

<script>
import DropdownMenu from './DropdownMenu'
export default {
    components: {
        DropdownMenu
    },
    props: ['options', 'selected', 'defaultOption'],
    data: () => {
        return {
            isOpen: false
        }
    },
    methods: {
        handleSegmentChange(i){
            this.isOpen = false;
            var value = this.options[i]
            var emittedFunc = () => { return value }
            this.$emit('segmentChange', emittedFunc)
        }
    }
  
}
</script>

<style>
    .segment-selector {
        display: inline-block;
        position: relative;
        margin-right: 1px;
    }
</style>
