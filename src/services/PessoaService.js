import http from "../http-common";
class PessoaService {
    getAll() {
        return http.get("/pessoas");
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }
    create(data) {
        return http.post("/pessoas", data);
    }
    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }
    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }
    deleteAll() {
        return http.delete(`/tutorials`);
    }
    findById(id) {
        return http.get(`/pessoas?id=${id}`);
    }
}
export default new PessoaService();