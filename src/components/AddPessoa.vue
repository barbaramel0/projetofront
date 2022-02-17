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
            v-mask="'###.###.###-##'"
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
            v-mask="'####-##-##'"
            type="text"
            class="form-control"
            id="dataNascimento"
            required
            v-model="pessoa.dataNascimento"
            name="dataNascimento"
        />
      </div>
      <br>
      <button @click="salvarPessoa" class="btn btn-success">Salvar Pessoa</button>
    </div>
    <div v-else>
      <h4>Cadastro realizado com sucesso</h4>
      <button class="btn btn-success" @click="novaPessoa">Nova pessoa</button>
      <button class="btn btn-primary ">
        <a class="badge badge-warning" :href="'/pessoas'">Voltar</a>
      </button>
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

    salvarPessoa() {
      var data = {
        id: this.pessoa.id,
        nome: this.pessoa.nome,
        cpf: this.pessoa.cpf,
        dataNascimento: this.pessoa.dataNascimento
      };
      let isValidCpf = this.validarCPF(data.cpf);
      console.log(isValidCpf);
      if (!isValidCpf) {
        alert("Cpf não é valido, por favor preencha com cpf valido")

        return null;
      }

      if (data.id != null && data.nome != '' && data.dataNascimento != '') {

        PessoaService.create(data)
            .then(response => {
              this.pessoa.id = response.data.id;
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

    validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf == '') return false;
      // Elimina CPFs invalidos conhecidos
      if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999")
        return false;
      // Valida 1o digito
      let add = 0;
      for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return false;
      // Valida 2o digito
      add = 0;
      for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
        return false;
      return true;
    },
    novaPessoa() {
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

.btn {
  margin: 10px;
}

h4 {
  font-size: medium;
}
</style>