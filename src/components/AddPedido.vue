<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="id">N° do Pedido </label>
        <input
            type="text"
            class="form-control"
            id="id"
            required
            v-model="pedido.id"
            name="id"
        />
      </div>
      <div class="form-group">
        <label for="idCliente">Id do Cliente</label>
        <input
            type="text"
            class="form-control"
            id="idCliente"
            required
            v-model="cliente.id"
            name="idCliente"
        />
      </div>
      <div class="form-group">
        <label for="nomeCliente">Nome do Cliente</label>
        <input
            type="text"
            class="form-control"
            id="nomeCliente"
            required
            v-model="cliente.nome"
            name="nomeCliente"
        />
      </div>
      <div class="form-group">
        <label for="valorTotal">valorTotal</label>
        <input
            class="form-control"
            id="valorTotal"
            required
            v-model="pedido.valorTotal"
            name="valorTotal"
        />
      </div>
      <div class="form-group">
        <label for="dataEmissao">Data de Emissao</label>
        <input
            v-mask="'####-##-##'"
            type="text"
            class="form-control"
            id="dataEmissao"
            required
            v-model="pedido.dataEmissao"
            name="dataEmissao"
        />
      </div>
      <br>
      <button @click="salvarPedido" class="btn btn-success">Salvar Pedido</button>
    </div>
    <div v-else>
      <h4>Pedido realizado com sucesso</h4>
      <button class="btn btn-success" @click="novoPedido">Novo Pedido</button>
      <button class="btn btn-primary ">
        <a class="badge badge-warning" :href="'/pedidos'">Voltar</a>
      </button>
    </div>
  </div>
</template>
<script>
import PedidoService from "../services/PedidoService";

export default {
  name: "add-pedidos",
  data() {
    return {
      pedido: {
        id: null,
        idCliente: null,
        nomeCliente:"",
        valorTotal: "",
        dataEmissao: ""
      },
      submitted: false
    };
  },
  methods: {

    salvarPedido() {
      var data = {
        id: this.pedido.id,
        nome: this.pedido.nome,
        valorTotal: this.pedido.valorTotal,
        dataEmissao: this.pedido.dataEmissao
      };
     

      

        PedidoService.create(data)
            .then(response => {
              this.pedido.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
            })
            .catch(e => {
              console.log(e);
            });
     
    },

    
    novoPedido() {
      this.submitted = false;
      this.pedido = {};
    }
  }
};


</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.btn {
  margin: 10px;
}

h4 {
  font-size: medium;
}
</style>