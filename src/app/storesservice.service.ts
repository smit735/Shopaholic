import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stores } from './stores';
import { products } from './reducer';

@Injectable({
  providedIn: 'root'
})
export class StoresserviceService {

  constructor(private http: HttpClient) { }
  getstores() {

    return this.http.get('http://localhost:3000/admin/stores');

  }
  addstores(store: Stores) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    return this.http.post('http://localhost:3000/admin/addstore', body, { 'headers': headers })

  }
  editstores(store: Stores, objectid: any) {
    console.log(objectid);

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    console.log(store);
    return this.http.patch('http://localhost:3000/admin/stores/' + objectid, body, { 'headers': headers })

  }
  deletestores(objectid: any) {
    console.log(objectid);

    const headers = { 'content-type': 'application/json' }
    // const body = JSON.stringify(store);
    // console.log(store);
    return this.http.delete('http://localhost:3000/admin/stores/' + objectid, { 'headers': headers })

  }
  addproduct(store: Stores) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    return this.http.post('http://localhost:3000/admin/stores/addproduct', body, { 'headers': headers })

  }
  getproducts() {

    return this.http.get('http://localhost:3000/admin/stores/products');

  }
  editproducts(product, objectid: any) {
    console.log(objectid);

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(product);
    console.log(product);
    return this.http.patch('http://localhost:3000/admin/stores/products/' + objectid, body, { 'headers': headers })

  }
  deleteproducts(objectid: any) {
    console.log(objectid);

    const headers = { 'content-type': 'application/json' }
    // const body = JSON.stringify(store);
    // console.log(store);
    return this.http.delete('http://localhost:3000/admin/stores/products/' + objectid, { 'headers': headers })

  }
} 
