<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="id">Id</label>
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
        <label for="nome">Nome</label>
        <input
            type="text"
            class="form-control"
            id="nome"
            required
            v-model="pedido.nome"
            name="nome"
        />
      </div>
      <div class="form-group">
        <label for="cpf">Cpf</label>
        <input
            v-mask="'###.###.###-##'"
            class="form-control"
            id="cpf"
            required
            v-model="pedido.cpf"
            name="cpf"
        />
      </div>
      <div class="form-group">
        <label for="dataNascimento">Data de Nascimento</label>
        <input
            v-mask="'####-##-##'"
            type="text"
            class="form-control"
            id="dataNascimento"
            required
            v-model="pedido.dataNascimento"
            name="dataNascimento"
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
        nome: "",
        cpf: "",
        dataNascimento: ""
      },
      submitted: false
    };
  },
  methods: {

    salvarPedido() {
      var data = {
        id: this.pedido.id,
        nome: this.pedido.nome,
        cpf: this.pedido.cpf,
        dataNascimento: this.pedido.dataNascimento
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