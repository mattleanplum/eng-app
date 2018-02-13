import Vue from "vue";
import App from './components/App'

let v = new Vue({
    el: "#app",
    data: { name: "World" },
    render: h => h(App)
});