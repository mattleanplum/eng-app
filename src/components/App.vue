<template>
    <div class="demo-wrapper">
        <a :href="fileUrl" download="segments.json" class="download-button">Download</a>
        <template v-for="(v, i) in segments" >
            <SegmentsContainer 
                :key="'segment-' + i" 
                :segment="v"
                @segmentValueChange="(e) => { handleChange(e, i) }"
                @segmentOperatorChange="(e) => { handleOperatorChange(e, i) }" 
                @removeSegment="(e) => { removeSegment(i) }" 
                @splitSegmentsAt="(e) => { splitSegment(e, i) }" />
                <SegmentsConjunction 
                    v-if="i < segments.length - 1" 
                    :key="'span-' + i"
                    join="AND"
                    @toggleConjunction="() => { joinSegments(i) }"/>
        </template>
        <AddSegmentButton @addNewSegment="handleAddNewSegment"/>
        <footer>{{matchedUsers.length}} matched users</footer>
    </div>
</template>

<script>
import Vue from 'vue'
import SegmentsContainer from './SegmentsContainer.vue'
import SegmentsConjunction from './SegmentsConjunction.vue'
import AddSegmentButton from './AddSegmentButton.vue'
import Segment from '../classes/segment'
import users from '../data/users'

export default {
    name: 'app',
    components: {
        SegmentsContainer,
        SegmentsConjunction,
        AddSegmentButton
    },
    data(){
        return {
            segments: [],
            Seg: new Segment(),
            users
        }
    },
    computed: {
        fileUrl(){
            var fileData = { segments: this.segments }
            var json = JSON.stringify(fileData, null, 2)
            var blob = new File([json], "segments.json", {type:"application/json"});
            return URL.createObjectURL(blob)
        },
        matchedUsers(){
            return this.Seg.matchedUsers(this.users, this.segments)
        }
    },
    methods: {
        handleChange(e, i){
            e.index = i + "/" + e.index
            var indices = e.index.split('/');
            Vue.set(this.segments[indices[0]][indices[1]], 'value', e.value)
        },
        handleOperatorChange(e, i){
            e.index = i + "/" + e.index
            var indices = e.index.split('/');
            Vue.set(this.segments[indices[0]][indices[1]], 'op', e.value)
        },
        removeSegment(i){
            this.segments.splice(i, 1)
        },
        splitSegment(splitIndex, i){
            var popped = this.segments[i].splice(splitIndex)
            this.segments.splice(i + 1, 0, popped) // add to outer array
        },
        joinSegments(i){
            var popped = this.segments.splice(i + 1, 1)
            popped.forEach(p => {
                this.segments[i].push(p[0]) // add to previous array
            })
           
        },
        handleAddNewSegment(e){
            this.segments.push(e)
        }
    }
}
</script>

<style>
@font-face {
  font-family: "Circular";
  font-weight:400;
  font-style: normal;
  src: url("../assets/circular-book.woff") format("woff")
}

@font-face {
  font-family: "Circular";
  font-weight:700;
  font-style: normal;
  src: url("../assets/circular-bold.woff") format("woff")
}

@font-face {
  font-family: "Circular";
  font-weight: bold;
  font-style: normal;
  src: url("../assets/circular-bold.woff") format("woff")
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.demo-wrapper {
    position: relative;
    max-width: 660px;
    min-height: 230px;
    border: 1px solid lightgrey;
    width: 660px;
    margin: 40px;
    font-size: 14px;
    padding: 20px;
    border-radius: 2px;
    color: #646569;
    font-family: "Circular", "Helvetica Neue", Arial, sans-serif;
}
.download-button {
    position: absolute;
    top: -22px;
    right: 0;
    text-decoration: none;
    color: #0092dd;
}
.demo-wrapper footer {
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 30px;
    line-height: 30px;
    left: 0;
    padding-left: 10px;
    border: 1px solid lightgray;
    background-color: lightgray;
}

</style>
