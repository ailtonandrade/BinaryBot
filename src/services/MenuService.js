import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'menu';


class MenuService {
  async getAllMenu() {
    return http.post(baseUrl + "/get-all-menu")
  }
  async getPermissionsByMenu(menuId, subMenuId, pageId) {
    return http.post(baseUrl + "/get-perms-menu", { menuId, subMenuId, pageId })
  }
  async getAllPermissions() {
    return http.post(baseUrl + "/get-all-permissions")
  }
  async editMenus(obj) {
    return http.post(baseUrl + "/edit-menus", obj);
  }
}
export default new MenuService();
