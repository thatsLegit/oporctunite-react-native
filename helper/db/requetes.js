import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('OPORCTUNITE.db');

export const insertTest = (nomEvaluation, noteEval) => {
    const dateT = new Date(Date.now().toLocaleString('fr-FR'));
    console.log(dateT);
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Test(dateT, nomEvaluation, noteEval) VALUES (?, ?, ?);',
                [dateT, nomEvaluation, noteEval], //prepared statement to avoid sql injections.
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
export const insertNoteGlobaleEvaluations = (data) => {
    
    
    let query = "INSERT INTO Categorie_P (nomCategorieP , nomCategorieG) VALUES";
    for (let i = 0; i < data.length; ++i) {
      query = query + "('"
        + data[i].nomCategorieP //id
        + "','"
        + data[i].nomCategorieG //first_name
        + "')";
      if (i != data.length - 1) {
        query = query + ",";
      }
    }
    query = query + ";";
    console.log(query);

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
                'SELECT nomCategorieP, nomCategorieG FROM Categorie_P;',
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
