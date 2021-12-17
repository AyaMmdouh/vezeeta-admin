const INITIAL_VALUE = {
    regions:[]
}
export default function regionsReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "REGIONS":
            return {
                ...state,
                regions: action.payload
            };
        default:
            return state;
    }
}