import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnserI} from '../interfaces/anser.interface';

const projectId = '76bde480-70de-484b-4b87-c993642d8130-008c'
const contractId ='772f25c98a804fb29a7c3a69f8b9a4b5'
const url = 'https://be6p23ysj7.execute-api.us-east-1.amazonaws.com/dev'

@Injectable({
  providedIn: 'root'
})
export class AnserService {

  constructor(private http: HttpClient) { }

  //  https://be6p23ysj7.execute-api.us-east-1.amazonaws.com/dev
 //  /projects/{projectId}/contracts/{contractId}/management/items/

  obtenerDatos (){
  return  this.http.get(`${url}/projects/${projectId}/contracts/${contractId}/management/items/`);
  }
  obtenerContrato(){
    return this.http.get(`${url}/projects/${projectId}/contracts`);
  }
}

