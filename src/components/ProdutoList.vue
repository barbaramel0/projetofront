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
      <h4>Lista de Produtos</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(produto, index) in produtos"
            :key="index"
            @click="setActiveProduto(produto, index)"
        >
          {{ produto.descricao }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentProduto">
        <h4>Detalhes</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentProduto.id }}
        </div>
        <div>
          <label><strong>Descrição:</strong></label> {{ currentProduto.descricao }}
        </div>
        <div>
          <label><strong>Valor Unitário:</strong></label> {{ currentProduto.valoUnitario }}
        </div>
        <button class="m-3 btn btn-sm btn-primary" >
          <a class="badge badge-warning" :href="'/produtos/' + currentProduto.id">
            Editar
          </a>
        </button>

      </div>
      <div v-else>
        <br />
        <p>   Clique em um produto <br> para acessar/editar detalhes <br> </p>
      </div>
    </div>
  </div>
</template>
<script>
import ProdutoService from "../services/ProdutoService";
export default {
  name: "produtos-list",
  data() {
    return {
      produtos: [],
      currentProduto: null,
      currentIndex: -1,
      descricao: "",
      valoUnitario: 0
    };
  },
  methods: {
    recuperaProdutos() {
      ProdutoService.getAll()
          .then(response => {
            this.produtos = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.recuperaProdutos();
      this.currentProduto = null;
      this.currentIndex = -1;
    },
    setActiveProduto(produto, index) {
      this.currentProduto = produto;
      this.currentIndex = index;
    },
    findById() {
      this.currentProduto = null;
      ProdutoService.findById(this.id)
          .then(response => {
            console.log(response.data)
            if(response.data.length == 0){
              this.recuperaProdutos();
              alert("Produto não existe")
              return;
            }
            this.produtos = response.data;
          })
          .catch(e => {
            this.recuperaProdutos();
            console.log(e);
          });
    }
  },
  mounted() {
    this.recuperaProdutos();
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