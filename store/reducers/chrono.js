import { STOP, RESET, FINISH, START } from "../actions/chrono";

const initialState = {
    isTimerStart: false,
    resetTimer: false,
    timerDuration: 60000
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STOP:
            return {
                ...state,
                resetTimer: false,
                isTimerStart: false
            };
        case START:
            return {
                ...state,
                resetTimer: false,
                isTimerStart: true
            };
        case RESET:
            return {
                ...state,
                isTimerStart: false,
                resetTimer: true
            };
        case FINISH:
            return initialState;
        default:
            return state;
    }
};