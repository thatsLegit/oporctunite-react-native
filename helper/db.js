import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('OPORCTUNITE');

//Creation de la tables places dans la bd places
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        //Wrap the query around a transaction to avoid data corruption.
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL NOT NULL);',
                [],
                () => { //sucess fonction
                    resolve();
                },
                (_, err) => { //error function: first arg: query, by putting _ we basically mean that we don't care about this arg
                    reject(err);
                }
            );
        });
    });
    return promise;
};