const INITIAL_VALUE = {
    isAuth: false
}
export default function authReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "IS_AUTH":
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;
    }
}