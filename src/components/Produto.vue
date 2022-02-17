<template>
  <div v-if="currentProduto" class="edit-form">
    <h4>Produto</h4>
    <form>
      <div class="form-group">
        <label for="id">Id</label>
        <input type="text" class="form-control" id="id"
               v-model="currentProduto.id"
        />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input type="text" class="form-control" id="descricao"
               v-model="currentProduto.descricao"
        />
      </div>
      <div class="form-group">
        <label for="valoUnitario">Valor Unitário</label>
        <input type="text"  class="form-control" id="valoUnitario"
               v-model="currentProduto.valoUnitario"
        />
      </div>

    </form>
    <br/>
    <button class="badge badge-danger mr-2 btn-danger"
            @click="deleteProduto"
    >
      Remover
    </button>

    <button style="margin-left: 10px" type="submit" class="badge badge-success btn-primary"
            @click="updateProduto"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Selecione um produto</p>
  </div>
</template>
<script>
import ProdutoService from "../services/ProdutoService";
export default {
  name: "Produto",
  data() {
    return {
      currentProduto: null,
      message: ''
    };
  },
  methods: {
    getProduto(id) {
      ProdutoService.get(id)
          .then(response => {
            this.currentProduto = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePublished() {
      var data = {
        id: this.currentProduto.id,
        descricao: this.currentProduto.descricao,
        valoUnitario: this.currentProduto.valoUnitario
      };
      ProdutoService.update(this.currentProduto.id, data)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updateProduto() {
      ProdutoService.update(this.currentProduto.id, this.currentProduto)
          .then(response => {
            console.log(response.data);

            this.message = 'Dados atualizados com sucesso !';

          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteProduto() {
      ProdutoService.delete(this.currentProduto.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "produtos" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getProduto(this.$route.params.id);
  }
};
</script>
<style>

.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>