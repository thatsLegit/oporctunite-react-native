
export const STOP = 'STOP';
export const START = 'START';
export const RESET = 'RESET';
export const FINISH = 'FINISH';

export const stopChrono = () => {
    return { type: STOP };
};

export const startChrono = () => {
    return { type: START };
};

export const resetChrono = () => {
    return { type: RESET };
};

export const finishedChrono = () => {
    return { type: FINISH };
};