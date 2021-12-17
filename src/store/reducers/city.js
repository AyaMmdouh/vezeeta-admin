const REGION_INITIAL_VALUE = {
    city: {}
}
export default function cityReducer(state = REGION_INITIAL_VALUE, action) {
    switch (action.type) {
        case "CITY":
            return {
                ...state,
                city: action.payload
            };
        default:
            return state;
    }
}