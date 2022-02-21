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
        },
        {
            path: "/produtos",
            alias: "/produtos",
            name: "produtos",
            component: () => import("./components/ProdutoList")
        },
        {
            path: "/produtos/:id",
            name: "produtos-details",
            component: () => import("./components/Produto")
        },
        {
            path: "/addProdutos",
            name: "addProdutos",
            component: () => import("./components/AddProduto")
        },        {
            path: "/pedidos",
            alias: "/pedidos",
            name: "pedidos",
            component: () => import("./components/PedidoList")
        },
        {
            path: "/pedidos/:id",
            name: "pedidos-details",
            component: () => import("./components/Pedido")
        },
        {
            path: "/addPedidos",
            name: "addPedidos",
            component: () => import("./components/AddPedido")
        },
    ]
});