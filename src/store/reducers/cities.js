const INITIAL_VALUE = {
    city: []
}
export default function citiesReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "CITIES":
            return {
                ...state,
                city: action.payload
            };
        default:
            return state;
    }
}



