import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/pessoas",
            name: "pessoas",
            component: () => import("./components/PessoasList")
        },
        {
            path: "/pessoas/:id",
            name: "pessoas-details",
            component: () => import("./components/Pessoa")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddPessoa")
        }
    ]
});