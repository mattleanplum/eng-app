<template>
  <div class="segment-container">
    <template v-for="(s, i) in segment">
        <div class="segment-item" :key="i">
            <Segment
                :segment="s"
                @segmentChange="(e) => { handleChange(e, i) }"
                @operatorChange="(e) => { handleOperatorChange(e, i) }" />
        </div>
        <SegmentsConjunction v-if="isNotLast(i)" 
            join="OR" 
            :key="'conj-'+i"
            @toggleConjunction="splitSegments(i + 1)"/>
    </template>
     <span class="remover" @click="removeSegment">x</span>
  </div>
</template>

<script>
import Segment from './Segment.vue'
import SegmentsConjunction from './SegmentsConjunction.vue'

export default {
    props: ['segment'],
    components: {
        Segment,
        SegmentsConjunction
    },
    methods: {
        handleChange(e, i){
            e.index = i
            this.$emit('segmentValueChange', e)
        },
        handleOperatorChange(e, i){
            e.index = i + "/" + e.index
            this.$emit('segmentOperatorChange', e)
        },
        removeSegment(){
            this.$emit('removeSegment')
        },
        splitSegments(i){
            this.$emit('splitSegmentsAt', i) 
        },
        isNotLast(i){
            return i < (this.segment.length - 1)
        }
    }
}
</script>

<style>
    .segment-container, .segment-item {
        display: inline-block;
    }
    .segment-container {
        border: 1px solid #0092dd;
        border-radius: 16px;
        padding: 5px 15px;
        margin-bottom: 10px;
    }
    .segment-container:hover .dropdown-menu span {
        text-decoration: underline;
        color: #0092dd;
    }
    .remover {
        font-size: 12px;
        vertical-align: 1px;
        color: #0092dd;
        cursor: pointer;
        margin-left: 4px;
    }
</style>


