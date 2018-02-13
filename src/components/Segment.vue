<template>
  <div class="segment">
    <span>{{segment.param}}</span>
    <SegmentSelector 
        :options="getSelectorOptions('op')" 
        :selected="segment.op" 
        defaultOption="is"
        @segmentChange="(e) => { changeOperatorHandler(e) }" />
     <SegmentSelector 
            :options="getSelectorOptions(segment.param)" 
            :selected="segment.value" 
            @segmentChange="(e) => { changeValueHandler(e) }" />
  </div>
</template>

<script>
import { devices, languages, countries } from '../data/segment-values'
import SegmentSelector from './SegmentSelector.vue'
export default {
    props: ['segment'],
        components: {
        SegmentSelector
    },
    data() {
        return {
            devices,
            languages,
            countries
        }
    },
    methods: {
        getSelectorOptions(param){
            switch (param) {
                case 'op':
                    return ['is', 'is not']
                case 'Device':                    
                    return this.devices
                case 'Country':
                    return this.countries
                case 'Language':
                    return this.languages
                default:
                    break;
            }
        },
        changeValueHandler(e, i){
            this.$emit('segmentChange', {value: e()})
        },
        changeOperatorHandler(e, i){
            this.$emit('operatorChange', {value: e()})
        },
    }
}
</script>

<style>
    .segment {
        display: inline-block;
    }
    span.or {
        margin-right: 3px;
    }
</style>

