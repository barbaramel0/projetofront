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
      <h4>Lista de Pessoas</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(pessoa, index) in pessoas"
            :key="index"
            @click="setActivePessoa(pessoa, index)"
        >
          {{ pessoa.nome }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentPessoa">
        <h4>Detalhes</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentPessoa.id }}
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentPessoa.nome }}
        </div>
        <div>
          <label><strong>Cpf:</strong></label> {{ currentPessoa.cpf }}
        </div>
        <div>
          <label><strong>Data de Nascimento:</strong></label> {{ currentPessoa.dataNascimento}}
        </div>
        <button class="m-3 btn btn-sm btn-primary" >
          <a class="badge badge-warning" :href="'/pessoas/' + currentPessoa.id">
            Editar
          </a>
        </button>

      </div>
      <div v-else>
        <br />
        <p>   Clique em uma pessoa <br> para acessar/editar detalhes <br> </p>
      </div>
    </div>
  </div>
</template>
<script>
import PessoaService from "../services/PessoaService";
export default {
  name: "pessoas-list",
  data() {
    return {
      pessoas: [],
      currentPessoa: null,
      currentIndex: -1,
      nome: ""
    };
  },
  methods: {
    retrieveTutorials() {
      PessoaService.getAll()
          .then(response => {
            this.pessoas = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentPessoa = null;
      this.currentIndex = -1;
    },
    setActivePessoa(pessoa, index) {
      this.currentPessoa = pessoa;
      this.currentIndex = index;
    },
    removeAllTutorials() {
      PessoaService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    findById() {
      PessoaService.findById(this.id)
          .then(response => {
            this.pessoas = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveTutorials();
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