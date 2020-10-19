import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stores } from './stores';
import { products } from './reducer';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StoresserviceService {
  private API_URL = environment.API_URL
  constructor(private http: HttpClient) { }
  adduser(user) {


    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.http.post(this.API_URL + '/api/register', body, { 'headers': headers })

  }
  login(user) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.http.post(this.API_URL + '/api/login', body, { 'headers': headers })

  }
  getstores(id) {

    return this.http.get(this.API_URL + '/api/admin/stores/' + id);

  }
  getuserstores() {

    return this.http.get(this.API_URL + '/api/admin/stores');

  }
  filterstores(cat) {

    return this.http.get(this.API_URL + '/api/admin/stores/filter/' + cat);

  }
  getdashboard() {

    return this.http.get(this.API_URL + '/api/count/dashboard');

  }
  getcart(objectid) {

    return this.http.get(this.API_URL + '/api/dashboard/cart/' + objectid);

  }
  getproduct(objectid) {

    return this.http.get(this.API_URL + '/api/admin/stores/edit' + objectid);

  }
  forgotpassword(object) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(object);
    return this.http.post(this.API_URL + '/api/forgotPassword', body, { 'headers': headers })
  }
  reset(object, id) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(object);
    return this.http.post(this.API_URL + '/api/resetPassword/' + id, body, { 'headers': headers })
  }
  addtocart(object, id) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(object);
    return this.http.post(this.API_URL + '/api/dashboard/addtocart/' + id, body, { 'headers': headers })

  }
  addstores(store: Stores) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    return this.http.post(this.API_URL + '/api/admin/addstore', body, { 'headers': headers })

  }
  editstores(store: Stores, objectid: any) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    return this.http.patch(this.API_URL + '/api/admin/stores/' + objectid, body, { 'headers': headers })

  }
  deletestores(objectid: any) {

    const headers = { 'content-type': 'application/json' }

    return this.http.delete(this.API_URL + '/api/admin/stores/' + objectid, { 'headers': headers })

  }
  deleteproduct(id: any, userid) {

    const headers = { 'content-type': 'application/json' }

    return this.http.delete(this.API_URL + '/api/dashboard/delete/' + id + '/' + userid, { 'headers': headers })

  }
  addproduct(store: Stores) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(store);
    return this.http.post(this.API_URL + '/api/admin/stores/addproduct', body, { 'headers': headers })

  }
  getproducts(objectid) {


    return this.http.get(this.API_URL + '/api/admin/stores/products/' + objectid);

  }
  searchproducts(objectid, term) {


    return this.http.get(this.API_URL + '/api/admin/stores/products/' + objectid + "/" + term);

  }
  editproducts(product, objectid: any) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(product);
    return this.http.patch(this.API_URL + '/api/admin/stores/products/' + objectid, body, { 'headers': headers })

  }
  deleteproducts(objectid: any) {

    const headers = { 'content-type': 'application/json' }

    return this.http.delete(this.API_URL + '/api/admin/stores/products/' + objectid, { 'headers': headers })

  }
} 
