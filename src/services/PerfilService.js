import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'perfil';


class PerfilService {
  async register(data) {
    return http.post(baseUrl + "/register", data);
  }
  async remove(data) {
    return http.post(baseUrl + "/remove", data);
  }
  async edit(data) {
    return http.post(baseUrl + "/edit", data);
  }
  async getAllPerfils(pagination, orderBy, filterSearch) {
    return http.post(baseUrl + "/get-all-perfil?" +
      "filterSearch=" + filterSearch +
      "&orderField=" + orderBy.field +
      "&orderAsc=" + orderBy.order +
      "&offset=" + pagination.offset +
      "&maxItems=" + pagination.maxItems +
      "&limit=" + pagination.limit)
  }
  async insertPerfil(data) {
    return http.post(baseUrl + "/insert-perfil", data);
  }
  async editPerfil(data) {
    return http.post(baseUrl + "/edit-perfil", data);
  }
  async removePerfil(data) {
    return http.post(baseUrl + "/remove-perfil", data);
  }
  async editPermission(data) {
    return http.post(baseUrl + "/set-permissions", data);
  }
  async getPermissionsByPerfil(perfilId) {
    return http.post(baseUrl + "/get-permissions?perfilId=" + perfilId);
  }

}
export default new PerfilService();
