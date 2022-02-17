<template>
  <div v-if="currentPessoa" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="id">Id</label>
        <input type="text" class="form-control" id="id"
               v-model="currentPessoa.id"
        />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome"
               v-model="currentPessoa.nome"
        />
      </div>
      <div class="form-group">
        <label for="cpf">Cpf</label>
        <input type="text"  v-mask="'###.###.###-##'" class="form-control" id="cpf"
               v-model="currentPessoa.cpf"
        />
      </div>
      <div class="form-group">
        <label for="dataNascimento">Data de nascimento</label>
        <input type="text" v-mask="'####-##-##'" class="form-control" id="dataNascimento"
               v-model="currentPessoa.dataNascimento"
        />
      </div>
    </form>
 <br/>
    <button class="badge badge-danger mr-2 btn-danger"
            @click="deletePessoa"
    >
      Remover
    </button>

    <button style="margin-left: 10px" type="submit" class="badge badge-success btn-primary"
            @click="updatePessoa"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Selecione uma pessoa</p>
  </div>
</template>
<script>
import PessoaService from "../services/PessoaService";
export default {
  name: "tutorial",
  data() {
    return {
      currentPessoa: null,
      message: ''
    };
  },
  methods: {
    getTutorial(id) {
      PessoaService.get(id)
          .then(response => {
            this.currentPessoa = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePublished() {
      var data = {
        id: this.currentPessoa.id,
        nome: this.currentPessoa.nome,
        cpf: this.currentPessoa.cpf,
        dataNascimento:  this.currentPessoa.dataNascimento
      };
      PessoaService.update(this.currentPessoa.id, data)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePessoa() {
      PessoaService.update(this.currentPessoa.id, this.currentPessoa)
          .then(response => {
            console.log(response.data);
            this.message = 'Dados atualizados com sucesso atualizada com sucesso!';

          })
          .catch(e => {
            console.log(e);
          });
    },
    deletePessoa() {
      PessoaService.delete(this.currentPessoa.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "pessoas" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>