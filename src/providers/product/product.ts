import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(product: Product) {
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) => {
      let sql = "insert into products (name, price, duedate, active, category_id) values (?, ?, ?, ?, ?)";
      let data = [product.name, product.price, product.duedate, product.active, product.category_id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
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