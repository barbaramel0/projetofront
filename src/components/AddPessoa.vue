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
            v-model="pessoa.id"
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
            v-model="pessoa.nome"
            name="nome"
        />
      </div>
      <div class="form-group">
        <label for="cpf">Cpf</label>
        <input
            class="form-control"
            id="cpf"
            required
            v-model="pessoa.cpf"
            name="cpf"
        />
      </div>
      <div class="form-group">
        <label for="dataNascimento">Data de Nascimento</label>
        <input
            type="text"
            class="form-control"
            id="dataNascimento"
            required
            v-model="pessoa.dataNascimento"
            name="dataNascimento"
        />
      </div>
      <br>
      <button @click="saveTutorial" class="btn btn-success">Salvar Pessoa</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>
<script>
import PessoaService from "../services/PessoaService";
export default {
  name: "add-pessoa",
  data() {
    return {
      pessoa: {
        id: null,
        nome: "",
        cpf: "",
        dataNascimento: ""
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        id: this.pessoa.id,
        nome: this.pessoa.nome,
        cpf: this.pessoa.cpf,
        dataNascimento: this.pessoa.dataNascimento        
      };
      PessoaService.create(data)
          .then(response => {
            this.pessoa.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newTutorial() {
      this.submitted = false;
      this.pessoa = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>