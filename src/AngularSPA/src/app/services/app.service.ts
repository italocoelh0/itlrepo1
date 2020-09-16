import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {

  eventosMenu = new EventEmitter();
  eventosCertificado = new EventEmitter();
  constructor(private http: HttpClient) {

  }

  apiUrl = environment.apiUrl;

  postItems(caminho, objeto) {
    return this.http.post(this.apiUrl + `${caminho}`, objeto)
  }

  getItems(caminho){
    return this.http.get(this.apiUrl + `${caminho}`)
  }

  deleteItems(caminho){
    return this.http.delete(this.apiUrl + `${caminho}`)
  }

  putItems(caminho, objeto){
    return this.http.put(this.apiUrl + `${caminho}`, objeto)
  }
}
