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
            v-model="produto.id"
            name="id"
        />
      </div>
      <div class="form-group">
        <label for="valoUnitario">valor Unitario</label>
        <input
            type="text"
            class="form-control"
            id="valoUnitario"
            required
            v-model="produto.valoUnitario"
            name="valoUnitario"
        />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input

            class="form-control"
            id="descricao"
            required
            v-model="produto.descricao"
            name="descricao"
        />
      </div>

      <br>
      <button @click="salvarProduto" class="btn btn-success">Salvar Produto</button>
    </div>
    <div v-else>
      <h4>Cadastro realizado com sucesso</h4>
      <button class="btn btn-success" @click="novoProduto">Novo Produto</button>
      <button class="btn btn-primary ">
        <a class="badge badge-warning" :href="'/produtos'">Voltar</a>
      </button>
    </div>
  </div>
</template>
<script>
import ProdutoService from "../services/ProdutoService";

export default {
  name: "add-produto",
  data() {
    return {
      produto: {
        id: null,
        descricao: "",
        valoUnitario: null
      },
      submitted: false
    };
  },
  methods: {

    salvarProduto() {
      var data = {
        id: this.produto.id,
        descricao: this.produto.descricao,
        valoUnitario: this.produto.valoUnitario
      };


      if (data.id != null && data.valoUnitario != null && data.descricao != '') {

        ProdutoService.create(data)
            .then(response => {
              this.produto.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        alert("Preencha todos os campos, por favor")
      }

    },


    novoProduto() {
      this.submitted = false;
      this.produto = {};
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