<template>
<div :class="['dropdown-menu', {open: isOpen}]" @click="isOpen = !isOpen" ref="dropdown">
    <slot name="display"></slot>
    <div class="dropdown">
        <ul>
            <li 
                v-for="(o, i) in options" 
                :key="i" 
                @click.stop="clickedMenuItem(i)">{{o}}</li>
        </ul>
    </div>
</div>
</template>


<script>
export default {
    props: ['options'],
    data: () => {
        return {
            isOpen: false
        }
    },
    methods: {
        clickedMenuItem(i){
            this.isOpen = !this.isOpen;
            this.$emit('click', i)
        },
        documentClick(e){
            let target = e.target
            let menu = this.$refs.dropdown
            if(menu != target && !menu.contains(target) ){
                this.isOpen = false
            }
        }
    },
    created(){
        document.addEventListener('click', this.documentClick)
    },
    destroyed(){
        document.removeEventListener('click', this.documentClick)
    }
}
</script>


<style>
.dropdown-menu {
    position: relative;
    cursor: pointer;
}
.dropdown-menu span:hover {
    text-decoration: underline;
    color: #0092dd;
}
.dropdown {
    display: none;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 5px 0px;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,.15);
    max-height: 180px;
    min-width: 100px;
    overflow-y: scroll;
    z-index: 1;
}
.dropdown ul {
    list-style-type: none;
    padding: 0;
    margin: 0px;
}
.dropdown ul li {
    padding: 4px 10px;
    width: 100%;
}
.dropdown ul li:hover {
    background-color: #f3f2f2;
}
.open .dropdown {
    display: block;
}
</style>
