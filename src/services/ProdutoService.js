import http from "../http-common";
class ProdutoService {
    getAll() {
        return http.get("/produtos");
    }
    get(id) {
        return http.get(`/produtos/${id}`);
    }
    create(data) {
        return http.post("/produtos", data);
    }
    update(id, data) {
        return http.put(`/produtos/${id}`, data);
    }
    delete(id) {
        return http.delete(`/produtos/${id}`);
    }
    deleteAll() {
        return http.delete(`/produtos`);
    }
    findById(id) {
        return http.get(`/produtos?id=${id}`);
    }
}
export default new ProdutoService();