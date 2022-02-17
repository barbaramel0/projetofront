import http from "../http-common";
class PessoaService {
    getAll() {
        return http.get("/pessoas");
    }
    get(id) {
        return http.get(`/pessoas/${id}`);
    }
    create(data) {
        return http.post("/pessoas", data);
    }
    update(id, data) {
        return http.put(`/pessoas/${id}`, data);
    }
    delete(id) {
        return http.delete(`/pessoas/${id}`);
    }
    deleteAll() {
        return http.delete(`/pessoas`);
    }
    findById(id) {
        return http.get(`/pessoas?id=${id}`);
    }
}
export default new PessoaService();