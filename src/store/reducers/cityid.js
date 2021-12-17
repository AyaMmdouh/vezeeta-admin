const INITIAL_VALUE = {
    id: ""
}
export default function cityIdReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "ID":
            return {
                ...state,
                id: action.payload
            };
        default:
            return state;
    }
}