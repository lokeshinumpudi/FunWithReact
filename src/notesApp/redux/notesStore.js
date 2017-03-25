import { createStore } from "redux";

let initialNoteState = {
  notes: [{ text: "wowo Glorious!", editMode: false, id: Date.now() }]
};

const noteReducer = (state = initialNoteState, action) => {
  switch (action.type) {
    case "addItem": {
      // dont add duplicates
      let dups = null;
      state.notes.forEach((itemObj, index) => {
        if (itemObj.text === action.noteText) {
          dups = true;
        }
      });
      if (dups) {
        return state;
      }
      let updatedNotes = state.notes.concat([
        { text: action.noteText, editMode: false, id: Date.now() }
      ]);
      //   dont mutate state , create new state and return
      return Object.assign({}, state, { notes: updatedNotes });
    } //addItem
    case "deleteItem": {
      let updatedNotes = state.notes.filter(eachNote => {
        return eachNote.text !== action.noteText;
      });
      return Object.assign({}, state, { notes: updatedNotes });
    } //deleteItem
    case "triggerEditMode": {
      let newNotes = state.notes.map((itemObj, index) => {
        if (itemObj.text === action.noteText) {
          return Object.assign(itemObj, {
            editMode: true
          });
        } //if
        return itemObj;
      }); //map

      return Object.assign({}, state, { notes: newNotes });
    } //triggerEditMode
    case "editDone": {
      let newNotes = state.notes.map((itemObj, index) => {
        if (itemObj.text === action.prevVal) {
          return Object.assign(itemObj, {
            editMode: false,
            text: action.newVal
          });
        } //if
        return itemObj;
      }); //map
      //   contains object with edit changes
      return Object.assign({}, state, { notes: newNotes });
    } //editDone
    default: {
      return state;
    }
  } //switch
}; //noteReducer

// @param:reducer
// @param:initialStoreState[options||{}]
let noteStore = createStore(noteReducer);

export default noteStore;
