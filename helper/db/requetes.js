import { db } from './init';


//Test
export const insertTest = async (nomEvaluation, noteEval, idutilisateur) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Test_${idutilisateur}(nomEvaluation, noteEval) VALUES (?, ?);`,
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

export const dropTests = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Test_${idutilisateur};`,
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

export const fetchAllTests = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Test_${idutilisateur};`,
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


//Favoris
export const insertFavoris = (idutilisateur, titreFiche, dateFavoris) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Favoris_${idutilisateur}(idutilisateur, titreFiche, dateFavoris) VALUES (?,?,?);`,
                [idutilisateur, titreFiche, dateFavoris], //prepared statement to avoid sql injections.
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

export const dropFavoris = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Favoris_${idutilisateur};`,
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

export const fetchAllFavoris = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Favoris_${idutilisateur};`,
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

export const fetchFichesFavoris = titreFiche => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Fiche WHERE Fiche.titreFiche = ?;',
                [titreFiche],
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

//userData
export const insertUserData = async (idutilisateur, nomElevage, codePostal, adresse, ville, email, telephone, tailleElevage) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO UserData_${idutilisateur}(nomElevage, codePostal, adresse, ville, email, telephone, tailleElevage) VALUES (?,?,?,?,?,?,?);`,
                [nomElevage, codePostal, adresse, ville, email, telephone, tailleElevage], //prepared statement to avoid sql injections.
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

export const dropUserData = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM UserData_${idutilisateur};`,
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

export const fetchUserData = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM UserData_${idutilisateur};`,
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
                'SELECT DISTINCT nomCateg, moyenneGlobaleCateg, moyenneCateg FROM Bilan WHERE moyenneCateg<>"null" GROUP BY nomCateg;',
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
                'SELECT DISTINCT nomSousCateg, moyenneGlobaleSousCateg, moyenneSousCateg FROM Bilan WHERE nomCateg==? AND moyenneSousCateg<>"null" GROUP BY nomSousCateg;',
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
                // MAX(idTest) permet d'avoir la dernière note de l"évaluation
                'SELECT DISTINCT nomEvaluation, moyenneGlobaleEval, noteEval, MAX(idTest) FROM Bilan WHERE nomSousCateg == ? AND noteEval<>"null" GROUP BY nomEvaluation;',
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
