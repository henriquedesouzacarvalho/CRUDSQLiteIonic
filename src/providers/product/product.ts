import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "insert into products (name, price, duedate, active, category_id) values (?, ?, ?, ?, ?)";
        let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "update products set name = ?, price = ?, duedate = ?, active = ?, category_id = ? where id = ?";
        let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id, product.id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "delete from products where id = ?";
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "select * from products where id = ?";
        let data = [id];
        return db.executeSql(sql, data)
          .then((data:any) => {
            if (data.rows.item(0).length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.price = item.price;
              product.duedate = item.duedate;
              product.active = item.active;
              product.category_id = item.category_id;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(active: boolean, name:string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where p.active = ?";
        let data: any = [active ? 0 : 1];

        if (name) {
          sql += " and p.name like ?";
          data.push("%" + name + "%");
        }

        return db.executeSql(sql, data)
          .then((data:any) => {
            let products: any[] = [];
            if (data.rows.length > 0) {
              for (let index = 0; index < data.rows.length; index++) {
                var product = data.rows.item(index);
                products.push(product);
              }
              // return products;
            // } else {
            //   return [];
            }
            return products;
            // return null;
          })
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