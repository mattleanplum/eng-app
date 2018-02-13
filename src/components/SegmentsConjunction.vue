<template>
    <div class="segment-conjunction">
        <DropdownMenu :options="options" @click="handleConjunctionChange">
            <span slot="display" class="conjunction">{{join}}</span>
        </DropdownMenu>
    </div>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'
export default {
    components: {
        DropdownMenu
    },
    props: ['join'],
    data(){
        return {
            options: ['AND', 'OR']
        }
    },
    methods: {
        handleConjunctionChange(){
            this.$emit('toggleConjunction')
        }
    }
}
</script>

<style>
.segment-conjunction {
    display: inline-block;
}
.conjunction {
    margin-right: 5px;
}
</style>
