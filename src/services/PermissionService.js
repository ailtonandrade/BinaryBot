import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'permission';


class PermissionService {
  async register(data) {
    return http.post(baseUrl + "/register", data);
  }
  async remove(data) {
    return http.post(baseUrl + "/remove", data);
  }
  async edit(data) {
    return http.post(baseUrl + "/edit", data);
  }
  async getAllPermissions(pagination, orderBy, filterSearch) {
    return http.post(baseUrl + "/get-all-permission?" +
      "filterSearch=" + filterSearch +
      "&orderField=" + orderBy.field +
      "&orderAsc=" + orderBy.order +
      "&offset=" + pagination.offset +
      "&maxItems=" + pagination.maxItems +
      "&limit=" + pagination.limit)
  }
  async insertPermission(data) {
    return http.post(baseUrl + "/insert-permission", data);
  }
  async editPermission(data) {
    return http.post(baseUrl + "/edit-permission", data);
  }
  async removePermission(data) {
    return http.post(baseUrl + "/remove-permission", data);
  }

}
export default new PermissionService();
