import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert() {
    return this.dbProvider.getDB()
    .then()
    .catch((e) => console.error(e));

  }

}

export class Product {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;
}