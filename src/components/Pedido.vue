<template>
  <div v-if="currentPedido" class="edit-form">
    <h4>Pedido</h4>
    <form>
      <div class="form-group">
        <label for="id">Id</label>
        <input type="text" class="form-control" id="id"
               v-model="currentPedido.id"
        />
      </div>
      <div class="form-group">
        <label for="nome">Id do Cliente</label>
        <input type="text" class="form-control" id="nome"
               v-model="currentPedido.idCliente"
        />
      </div>
      <div class="form-group">
        <label for="valorTotal">Valor total</label>
        <input type="text"  class="form-control" id="valorTotal"
               v-model="currentPedido.valorTotal"
        />
      </div>
      <div class="form-group">
        <label for="dataPedido">Data do pedido</label>
        <input type="text"  class="form-control" id="dataPedido"
               v-model="currentPedido.dataPedido"
        />
      </div>
      <div class="form-group">
        <label for="dataPedido">Itens do pedido</label>
        <input type="text"  class="form-control" id="itens"
               v-model="currentPedido.itens"
        />
      </div>
    </form>
    <br/>
    <button class="badge badge-danger mr-2 btn-danger"
            @click="deletePedido"
    >
      Remover
    </button>

    <button style="margin-left: 10px" type="submit" class="badge badge-success btn-primary"
            @click="updatePedido"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Selecione um pedido</p>
  </div>
</template>
<script>
import PedidoService from "../services/PedidoService";
// import PessoaService  from "@/services/PessoaService";
export default {
  name: "Pedido",
  data() {
    return {
      currentPedido: null,
      message: ''
    };
  },
  methods: {
    getPedido(id) {
      PedidoService.get(id)
          .then(response => {
            this.currentPedido = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePublished() {
      var data = {
        id: this.currentPedido.id,
        idCliente: this.currentPessoa.$id,
        valorTotal: this.currentPedido.valorTotal,
        dataPedido:  this.currentPedido.dataPedido

      };
      PedidoService.update(this.currentPedido.id, data)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePedido() {
      PedidoService.update(this.currentPedido.id, this.currentPedido)
          .then(response => {
            console.log(response.data);

            this.message = 'Dados atualizados com sucesso !';

          })
          .catch(e => {
            console.log(e);
          });
    },
    deletePedido() {
      PedidoService.delete(this.currentPedido.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "pedidos" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getPedido(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>