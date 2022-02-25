<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pesquisar por id"
               v-model="id"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="findById">
            Buscar
          </button>

        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de pedidos</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(pedido, index) in pedidos"
            :key="index"
            @click="setActivePedido(pedido, index)"
        >
          Id : {{ pedido.id }}; Data Pedido: {{pedido.dataEmissao}}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentPedido">
        <h4>Detalhes</h4>
        <div>
          <label><strong>Nº do Pedido:</strong></label> {{ currentPedido.id }}
        </div>
        <div>
          <label><strong>Id do Cliente:</strong></label> {{ currentPedido.cliente.id }}
        </div>
        <div>
          <label><strong>Nome do  Cliente:</strong></label> {{ currentPedido.cliente.nome }}
        </div>
        <div>
          <label><strong>Valor Total do Pedido:</strong></label> {{ currentPedido.valorTotal }}
        </div>
        <div>
          <label><strong>Data do Pedido:</strong></label> {{ currentPedido.dataEmissao }}
        </div>
        <br>
        <h4><strong>Produtos do Pedido</strong></h4>
        <div   v-for="item in currentPedido.itens"  v-bind:key="item.id">
          <label><strong>Item:</strong></label> {{ item.id}}<br>
          <label><strong>Produto Id:</strong></label> {{ item.produto.id}}<br>
          <label><strong>Produto Descrição:</strong></label> {{ item.produto.descricao}}<br>
          <label><strong>Valor:</strong></label> {{ item.valor}}<br>
          <label><strong>Quantidade:</strong></label> {{ item.quantidade}}<br>
          <label><strong>Subtotal:</strong></label> {{ item.subtotal}}<br>

          <br>
        </div>
        <button class="m-3 btn btn-sm btn-primary" >
          <a class="badge badge-warning" :href="'/pedidos/' + currentPedido.id">
            Editar
          </a>
        </button>

      </div>
      <div v-else>
        <br />
        <p>   Clique em umm pedido  <br> para acessar/editar detalhes <br> </p>
      </div>
    </div>
  </div>
</template>
<script>
import PedidoService from "../services/PedidoService";
export default {
  name: "pedidos-list",
  data() {
    return {
      pedidos: [],
      currentPedido: null,
      currentIndex: -1,
      nome: ""
    };
  },
  methods: {
    recuperaPedido() {
      this.currentPedido = {
        id: null,
        cliente:{
          id: null,
          nome: null
        },
        dataEmissao:null,
        valorTotal:null,
        itens:[{
          id: null,
          produto:{
            id: null,
            descricao: null
          },
          valor: null,
          quantidade: null,
          subtotal:null
        }]
      }

      PedidoService.getAll()
          .then(response => {
            this.pedidos = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.recuperaPedido();
      this.currentPedido = null;
      this.currentIndex = -1;
    },
    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentIndex = index;
    },
    findById() {
      PedidoService.findById(this.id)
          .then(response => {
            this.pedidos = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.recuperaPedido();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;

}
p{
  background-color:darkgoldenrod ;
  color:white;
  border-radius: 10px;
  left: 50px;;
  text-align: center;
}
</style>