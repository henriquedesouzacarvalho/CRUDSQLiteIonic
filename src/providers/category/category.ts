import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoryProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "select * from categories";

        return db.executeSql(sql, [])
          .then((data:any) => {
            let categories: any[] = [];
            if (data.rows.length > 0) {
              for (let index = 0; index < data.rows.length; index++) {
                var category = data.rows.item(index);
                categories.push(category);
              }
            }
            return categories;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
