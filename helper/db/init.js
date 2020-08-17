import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabase('OPORCTUNITE.db');


export const createDB = async () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Evaluation(nomEvaluation VARCHAR(50),description TEXT,nbTruies INT,priorite INT NOT NULL,idLiaison INT NOT NULL,nomCategorieP VARCHAR(50) NOT NULL,PRIMARY KEY(nomEvaluation),FOREIGN KEY(idLiaison) REFERENCES Liaisons(idLiaison),FOREIGN KEY(nomCategorieP) REFERENCES Categorie_P(nomCategorieP));',
                []
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Bilan(idTest INT,nomEvaluation VARCHAR(50) NOT NULL,moyenneGlobaleEval DECIMAL(3,1),noteEval DECIMAL(3,1),dateTest DATE NOT NULL,moyenneGlobaleSousCateg DECIMAL(3,1),moyenneSousCateg DECIMAL(3,1),nomCateg VARCHAR(100) NOT NULL,nomSousCateg VARCHAR(100) NOT NULL,moyenneGlobaleCateg DECIMAL(3,1),moyenneCateg DECIMAL(3,1),PRIMARY KEY(idTest));',
                []
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Fiche(titreFiche VARCHAR(50),urlImage VARCHAR(255),nomCategorieG VARCHAR(50) NOT NULL,PRIMARY KEY(titreFiche),FOREIGN KEY(nomCategorieG) REFERENCES Categorie_G(nomCategorieG));',
                []
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Liaisons(idLiaison INT,nomEvalDouble VARCHAR(100) NOT NULL,PRIMARY KEY(idLiaison));',
                []
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Categorie_P(nomCategorieP VARCHAR(50),nomCategorieG VARCHAR(50) NOT NULL,PRIMARY KEY(nomCategorieP),FOREIGN KEY(nomCategorieG) REFERENCES Categorie_G(nomCategorieG));',
                []
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Categorie_G(nomCategorieG VARCHAR(50),PRIMARY KEY(nomCategorieG));',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const createTableTest = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Test_${idutilisateur}(dateTest DATETIME NOT NULL DEFAULT (datetime('now','localtime')),nomEvaluation VARCHAR(100) NOT NULL,noteEval DECIMAL(3,1) NOT NULL,PRIMARY KEY(dateTest, nomEvaluation),FOREIGN KEY(nomEvaluation) REFERENCES Evaluation(nomEvaluation));`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const createTableFavoris = async idutilisateur => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Favoris_${idutilisateur}(idutilisateur INT(11),titreFiche VARCHAR(50) NOT NULL,dateFavoris DATETIME,PRIMARY KEY(idUtilisateur,titreFiche,dateFavoris));`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};