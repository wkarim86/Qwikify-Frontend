import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFields, Notes } from "../../interfaces";
import localforage from "localforage";
import { notesApi } from "./notes.api";

interface InitialState {
  notes: Notes[] | [];
  filtered: Notes[] | [];
  filterBy: string;
}

const initialState: InitialState = {
  notes: [],
  filtered: [],
  filterBy: "",
};

export const addNotes = createAsyncThunk(
  "notes/add-notes",
  async ({ notes }: { notes: Notes[] }) => {
    await localforage.setItem("notes", notes);
    return notes;
  }
);

export const addNote = createAsyncThunk(
  "notes/add-note",
  async ({ note, id }: { note: FormFields; id: number }) => {
    try {
      const data: Notes = {
        id,
        residentName: note.residentName,
        authorName: note.authorName,
        content: note.content,
        dateTime: new Date().toISOString(),
      };
      const notes = await localforage.getItem<Notes[]>("notes");
      notes!.push(data);
      await localforage.setItem("notes", notes);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchNotes = createAsyncThunk("notes/fetch", async () => {
  const notes = await localforage.getItem<Notes[]>("notes");
  return notes;
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
      };
    },
    setFilterBy: (state, action: PayloadAction<{ filterBy: string }>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setFiltered: (state, action) => {
      return {
        ...state,
        filtered: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes = [...state.notes, action.payload!].slice(-5);
    });
    builder.addCase(addNotes.fulfilled, (state, action) => {
      state.notes = action.payload!.slice(-5);
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload
        ? action.payload!.slice(-5)
        : action.payload!;
    });
    builder.addMatcher(
      notesApi.endpoints.fetchNotes.matchFulfilled,
      (state, action: PayloadAction<Notes[]>) => {
        state.notes = action.payload;
        // if (state.filterBy === "") {
        //   state.notes = action.payload;
        // } else {
        //   state.notes = action.payload.filter(
        //     (note) => note.residentName === state.filterBy
        //   );
        // }
      }
    );
  },
});

export const { setNotes, setFilterBy, setFiltered } = noteSlice.actions;

export default noteSlice.reducer;
