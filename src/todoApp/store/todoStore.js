import { createStore } from "redux";

let initialStore = {
  filter: "SHOW_UNDONE",
  todos: [],
  syncStatus: false,
  lastSync: null,
  loadFromCloud: false,
  loadError:false,
  userCode:null
};
//Todo reducer
function todoReducer(store = initialStore, action) {
  switch (action.type) {
    case "ADD_TODO": {
      //add todo without mutating the store
      let newTodos = store.todos.concat({
        text: action.text,
        completed: false,
        id: Date.now()
      });
      return Object.assign({}, store, { todos: newTodos });
    }

    case "TOGGLE_DONE": {
      let newTodos = store.todos.map(eachTodo => {
        if (eachTodo.id === action.id) {
          return Object.assign(eachTodo, { completed: !eachTodo.completed });
        }
        return eachTodo;
      });
      return Object.assign({}, store, { todos: newTodos });
    }

    case "LOAD_FROM_CLOUD": {
      let cloudState = action.cloudState;
      return Object.assign({}, store, cloudState, { loadFromCloud: true,loadError:false });
    }

    case "USER_NOT_FOUND":{
      return Object.assign({},initialStore,{loadError:true});
    }

    case "SYNC_STATUS": {
      let localeTime = new Date(action.time).toLocaleTimeString();
      return { ...store, syncStatus: action.syncStatus, lastSync: localeTime,userCode:action.userCode };
    }

    case "SHOW_ALL": {
      return { ...store, filter: "SHOW_ALL" };
    }
    case "SHOW_DONE": {
      return { ...store, filter: "SHOW_DONE" };
    }
    case "SHOW_UNDONE": {
      return { ...store, filter: "SHOW_UNDONE" };
    }
    default:
      return store;
  } //switch
}

// let a = {"filter":"SHOW_UNDONE","todos":[{"text":"asd","completed":false,"id":1488814255955},{"text":"wowo","completed":false,"id":1488814257025},{"text":"hey babes","completed":false,"id":1488814258968},{"text":"well well well","completed":false,"id":1488814262936},{"text":"i like that","completed":true,"id":1488814265889}]};

// console.log(a);
let store = createStore(todoReducer);

// store.subscribe(()=>{
//   console.log(store.getState());
// });

export default store;
