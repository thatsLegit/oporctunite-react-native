import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('OPORCTUNITE.db');

export const insertTest = (nomEvaluation, noteEval) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Test(nomEvaluation, noteEval) VALUES (?, ?);',
                [nomEvaluation, noteEval], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const dropTests = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Test;',
                [],
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchAllTests = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Test;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

/* export const insertNoteCategories = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(nomCategorieG, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
}; */
/*
export const insertNoteGlobaleCategories = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertNoteSousCategories = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertNoteGlobaleSousCategories = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertNoteEvaluations = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertNoteGlobaleEvaluations = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, lng], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

*/
export const insertNoteGlobaleEvaluations = (Data) => {
    
    let query = "INSERT INTO Bilan(idTest, nomEvaluation, moyenneGlobaleEval, noteEval,dateTest, moyenneGlobaleSousCateg, moyenneSousCateg, nomCateg, nomSousCateg, moyenneGlobaleCateg, moyenneCateg) VALUES";
    for (let i = 0; i < Data.length; ++i) {
      query = query + '("'
        + Data[i][0].idTest 
        + '","'
        + Data[i][0].nomEvaluation 
        + '","'
        + Data[i][0].moyenneGlobaleEval 
        + '","'
        + Data[i][0].noteEval 
        + '","'
        + Data[i][0].dateTest 
        + '","'
        + Data[i][0].nomSousCateg 
        + '","'
        + Data[i][0].moyenneGlobaleSousCateg 
        + '","'
        + Data[i][0].moyenneSousCateg 
        + '","'
        + Data[i][0].nomCateg 
        + '","'
        + Data[i][0].moyenneGlobaleCateg 
        + '","'
        + Data[i][0].moyenneCateg 
        + '")';
      if (i != Data.length - 1) {
        query = query + ',';
      }
    }
    query = query + ';';

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                query,[],
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchBilan = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT idTest, nomEvaluation, moyenneGlobaleEval, noteEval,dateTest, moyenneGlobaleSousCateg, moyenneSousCateg, nomCateg, nomSousCateg, moyenneGlobaleCateg, moyenneCateg FROM Bilan;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //sucess fonction
                    resolve(result);
                    
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const dropBilan = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Bilan;',
                [],
                (_, result) => { //sucess fonction
                    resolve(result);
                },
                (_, err) => { //error function
                    reject(err);
                }
            );
        });
    });
    return promise;
};