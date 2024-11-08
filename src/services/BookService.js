import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'book';


class BookService {

  async sendMessage(data) {
    return http.post(baseUrl + "/send-message-book", data);
  }
  async getAllBookInfo(pageConfig) {
    return http.post(baseUrl + "/get-all-book-info", pageConfig)
  }

}
export default new BookService();
