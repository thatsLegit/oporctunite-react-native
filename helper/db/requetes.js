import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('OPORCTUNITE.db');

//Test
export const insertTest = (nomEvaluation, noteEval) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Test(nomEvaluation, noteEval) VALUES (?, ?);',
                [nomEvaluation, noteEval], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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
                (_, result) => { //success fonction
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
                (_, result) => { //success fonction
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


//Categorie_G
export const insertCategorieG = nomCategorieG => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Categorie_G(nomCategorieG) VALUES (?);',
                [nomCategorieG], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const dropCategorieG = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Categorie_G;',
                [],
                (_, result) => { //success fonction
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

export const fetchAllCategoriesG = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Categorie_G;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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


//Categorie_P
export const insertCategorieP = (nomCategorieP, nomCategorieG) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Categorie_P(nomCategorieP, nomCategorieG) VALUES (?,?);',
                [nomCategorieP, nomCategorieG], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const dropCategorieP = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Categorie_P;',
                [],
                (_, result) => { //success fonction
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

export const fetchAllCategoriesP = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Categorie_P;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const getSousCategoriesGivenCateg = categ => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Categorie_P where nomCategorieG = ?;',
                [categ], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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


//Evaluation
export const insertEvaluation = (nomEvaluation, description, nbTruies, priorite, idLiaison, nomCategorieP) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Evaluation(nomEvaluation, description, nbTruies, priorite, idLiaison, nomCategorieP) VALUES (?,?,?,?,?,?);',
                [nomEvaluation, description, nbTruies, priorite, idLiaison, nomCategorieP], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const dropEvaluation = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Evaluation;',
                [],
                (_, result) => { //success fonction
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

export const fetchAllEvaluations = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Evaluation;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const getEvaluationGivenSousCateg = sCateg => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Evaluation where nomCategorieP = ?;',
                [sCateg], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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


//Liaisons
export const insertLiaisons = (idLiaison, nomEvalDouble) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Liaisons(idLiaison, nomEvalDouble) VALUES (?,?);',
                [idLiaison, nomEvalDouble], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const dropLiaisons = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Liaisons;',
                [],
                (_, result) => { //success fonction
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

export const fetchAllLiaisons = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Liaisons;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

//Fiche
export const insertFiche = (titreFiche, urlImage, nomCategorieG) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Fiche(titreFiche, urlImage, nomCategorieG) VALUES (?, ?, ?);',
                [titreFiche, urlImage, nomCategorieG], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

export const dropFiches = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Fiche;',
                [],
                (_, result) => { //success fonction
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

export const fetchAllFiches = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Fiche;',
                [], //prepared statement to avoid sql injections.
                (_, result) => { //success fonction
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

    let query = "INSERT INTO Bilan(idTest, nomEvaluation, moyenneGlobaleEval, noteEval, dateTest, nomSousCateg, moyenneGlobaleSousCateg, moyenneSousCateg, nomCateg, moyenneGlobaleCateg, moyenneCateg) VALUES";
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
                query, [],
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


export const fetchMoyenneCategorieBilan = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                // Attention bien "null" et pas null
                'SELECT DISTINCT nomCateg, moyenneGlobaleCateg, CASE WHEN moyenneCateg == "null" THEN 0 ELSE moyenneCateg END AS moyenneCateg FROM Bilan GROUP BY nomCateg;',
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

export const fetchMoyenneSousCategorieBilan = nomCategorie => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT DISTINCT nomSousCateg, moyenneGlobaleSousCateg, CASE WHEN moyenneSousCateg == "null" THEN 0 ELSE moyenneSousCateg END AS moyenneSousCateg FROM Bilan WHERE nomCateg==? GROUP BY nomSousCateg;',
                [nomCategorie], //prepared statement to avoid sql injections.
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

export const fetchMoyenneEvaluationParSousCategorieBilan = nomSousCateg => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
     
                'SELECT nomEvaluation, moyenneGlobaleEval, CASE WHEN AVG(noteEval) == "null" THEN 0 ELSE AVG(noteEval) END AS moyenneEval FROM Bilan WHERE nomSousCateg = ? AND noteEval<>"null"  GROUP BY nomEvaluation;',
                [nomSousCateg], //prepared statement to avoid sql injections.
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

export const fetchMoyenneEvaluationBilan = nomEval => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
     
                "SELECT dateTest, noteEval FROM Bilan WHERE nomEvaluation = ? AND noteEval <> 'null'  GROUP BY dateTest ORDER BY dateTest DESC;",
                [nomEval], //prepared statement to avoid sql injections.
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