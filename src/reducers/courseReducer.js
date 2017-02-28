// Reducer takes current state and an action and returns the new state
export default function courseReducer(state =[], action){
    switch (action.type){
        case "CREATE_COURSE":
            // state is immutable. so we can't do this:
            // state.push(action.course);
            // return state;

            // ...too much sugaaa gives developers diabetes of the brian
            // Spread operator ... returns a new instance of the state array, or something?
            // Object.assign copies the object received from action.course into a new object
            return [...state,
                Object.assign({}, action.course)
            ];
        default:
            return state;
    }

}