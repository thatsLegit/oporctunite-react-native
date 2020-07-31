import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('places.db');

//Creation de la tables places dans la bd places
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        //Wrap the query around a transaction to avoid data corruption.
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Categorie_G(nomCategorieG VARCHAR(50),PRIMARY KEY(nomCategorieG));CREATE TABLE IF NOT EXISTS Categorie_P(nomCategorieP VARCHAR(50),nomCategorieG VARCHAR(50) NOT NULL,PRIMARY KEY(nomCategorieP),FOREIGN KEY(nomCategorieG) REFERENCES Categorie_G(nomCategorieG));CREATE TABLE IF NOT EXISTS Liaisons(idLiaison INT,nomEvalDouble VARCHAR(100) NOT NULL,PRIMARY KEY(idLiaison));CREATE TABLE IF NOT EXISTS Fiche(titreFiche VARCHAR(50),urlImage VARCHAR(255),nomCategorieG VARCHAR(50) NOT NULL,PRIMARY KEY(titreFiche),FOREIGN KEY(nomCategorieG) REFERENCES Categorie_G(nomCategorieG));CREATE TABLE IF NOT EXISTS Bilan(idTest INT,nomEvaluation VARCHAR(50) NOT NULL,moyenneGlobaleEval DECIMAL(3,1),noteEval DECIMAL(3,1),dateTest DATE NOT NULL,moyenneGlobaleSousCateg DECIMAL(3,1),moyenneSousCateg DECIMAL(3,1),nomCateg VARCHAR(100) NOT NULL,nomSousCateg VARCHAR(100) NOT NULL,moyenneGlobaleCateg DECIMAL(3,1),moyenneCateg DECIMAL(3,1),PRIMARY KEY(idTest));CREATE TABLE IF NOT EXISTS Evaluation(nomEvaluation VARCHAR(50),description TEXT,nbTruies INT,priorite INT NOT NULL,idLiaison INT NOT NULL,nomCategorieP VARCHAR(50) NOT NULL,PRIMARY KEY(nomEvaluation),FOREIGN KEY(idLiaison) REFERENCES Liaisons(idLiaison),FOREIGN KEY(nomCategorieP) REFERENCES Categorie_P(nomCategorieP));CREATE TABLE IF NOT EXISTS Test(dateTest DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,nomEvaluation VARCHAR(100) NOT NULL,noteEval DECIMAL(3,1) NOT NULL,nomEvaluation_1 VARCHAR(50) NOT NULL,PRIMARY KEY(dateTest),FOREIGN KEY(nomEvaluation_1) REFERENCES Evaluation(nomEvaluation));',
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


export const fetchCategories = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT nomCategorieG FROM Categorie_G;',
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
 */