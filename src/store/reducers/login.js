const INITIAL_VALUE = {
    login: ""
}
export default function loginReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                login: action.payload
            };
        default:
            return state;
    }
}