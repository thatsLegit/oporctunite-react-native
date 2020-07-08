
export const lineBreaker = (phrase, number) => {
    let phraseRetour = "";
    const mots = phrase.split(' ');
    const nbMots = mots.length;
    let indexMot = 0;

    while (nbMots > indexMot) {
        if ((mots[indexMot + 1] != undefined) && ((mots[indexMot].length + mots[indexMot + 1].length) <= number)) {
            phraseRetour += mots[indexMot] + " " + mots[indexMot + 1] + "\n";
            indexMot = indexMot + 2;
        }
        else {
            phraseRetour += mots[indexMot] + "\n";
            indexMot++;
        }
    }

    return phraseRetour;
};