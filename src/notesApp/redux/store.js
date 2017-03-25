import { createStore, combineReducers } from "redux";

// reducer{always returns a object}
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "Incr":
      return {count:state.count + 1};
    case "Decr":
      return {count:state.count - 1};
    default:
      return state;
  } //switch
} //counter reducer

function usersReducer(state = { users: [] }, action) {
  switch (action.type) {
    case "addUser":
      return state.users.concat([action.user]);
    default:
      return state;
  } //switch
} //usersReducer

let reducers = combineReducers({
  countState: counterReducer,
  usersState: usersReducer
});

// Api {subscribe,dispatch,getState}
let store = createStore(reducers);

//all updates to state are sent here:generally ui subscribes to the store
// react-redux is useful here
// store.subscribe(() => {
//   // returns current state
//   console.log(store.getState());
// });

// now we dispatch actions with payload{optional}
//
setInterval(()=>{
   store.dispatch({ type: "Incr" });
},5000);

//  store.dispatch({ type: "Incr" });

// store.dispatch({ type: "addUser",user:"awesomekis"});


export default store;