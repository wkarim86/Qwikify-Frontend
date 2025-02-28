import { combineReducers } from "redux";
import noteSlice from "../components/CareNotes/notes.slice";
import { endPoints } from "./base.api";
import { RootState } from "./store";

export const reducers = combineReducers({
  mainState: noteSlice,
  [endPoints.reducerPath]: endPoints.reducer,
});

export const getResidentNames = (state: RootState) => {
  return state.mainState.notes.map((note) => note.residentName);
};
