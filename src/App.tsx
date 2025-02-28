import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NotesList from "./components/CareNotes/notes-list.view";
import {
  useFetchNotesQuery,
  useInsertNoteMutation,
} from "./components/CareNotes/notes.api";
import FilterDropdown from "./components/FilterDropdown/filter-dropdown";
import { FormFields, Notes } from "./interfaces";
import AddNoteForm from "./components/AddNote/add-note.form";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  addNote,
  fetchNotes,
  setFiltered,
} from "./components/CareNotes/notes.slice";
import localforage from "localforage";

function App() {
  const dispatch = useAppDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [isOnline, setOnline] = useState<boolean>(true);
  const { notes, filtered } = useAppSelector((state) => state.mainState);
  const [insertNote] = useInsertNoteMutation();

  //Fetch notes from server after every 60 sec
  const { data, isLoading } = useFetchNotesQuery(
    {},
    {
      pollingInterval: 30000,
      skipPollingIfUnfocused: true,
    }
  );

  // Network status update function
  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  //Form submit handler
  const onFormSubmitHandle = (data: FormFields) => {
    dispatch(
      addNote({
        note: data,
        id: notes.length + 1,
      })
    );
  };

  //Add note button toggle
  const onAddNoteButtonHandle = () => {
    setShowAddForm(true);
  };

  //React component lifecycle hooks
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    if (notes) {
      setNames(notes.map((item) => item.residentName));
    }
  }, [notes]);

  const uploadNotesToSever = useCallback(async () => {
    //upload data to server, when internet is up
    if (isOnline) {
      const localNotes: Notes[] | null = await localforage.getItem("notes");
      await Promise.all(
        localNotes!.map((note: Notes) => {
          insertNote({
            residentName: note.residentName,
            authorName: note.authorName,
            content: note.content,
          })
            .unwrap()
            .then(async () => {
              //remove local data
              await localforage.setItem("notes", []);
            })
            .catch((error) => {
              console.log(error);
            });
        })
      );
    }
  }, [insertNote, isOnline]);

  const loadData = useCallback(async () => {
    if (data) {
      const localNotes: Notes[] | null = await localforage.getItem("notes");
      if (localNotes!.length > 0) {
        uploadNotesToSever();
      }
    } else {
      const localNotes: Notes[] | null = await localforage.getItem("notes");
      if (!localNotes || localNotes.length === 0) {
        await localforage.setItem("notes", []);
      }
    }
  }, [data, uploadNotesToSever]);

  useEffect(() => {
    loadData();
  }, [data, dispatch, insertNote, isOnline, loadData, notes]);

  /**
   * Network Connectivity Checking
   */
  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <div className="w-full h-ful">
      <div className="container mx-auto">
        {!isOnline && (
          <div className="bg-green-600 px-4 py-2 rounded text-white my-2">
            You're offline. Check your internet connection.
          </div>
        )}
        <div className="w-full flex justify-between items-center bg-gray-400 p-4">
          <h3 className="font-bold">Care Note</h3>
          <FilterDropdown
            residentNames={names}
            onChange={(e) =>
              dispatch(
                setFiltered(
                  e !== ""
                    ? notes.filter((note: Notes) => note.residentName === e)
                    : notes
                )
              )
            }
          />
        </div>
        <div className="p-4 flex flex-col items-start">
          <button
            className="bg-green-600 px-8 py-2 rounded text-white"
            onClick={() => onAddNoteButtonHandle()}
          >
            + Add Note
          </button>
        </div>
        <div className="p-4">
          {isLoading ? (
            "...Loading notes"
          ) : notes.length > 0 ? (
            <NotesList notes={filtered.length === 0 ? notes : filtered} />
          ) : (
            "No care notes found"
          )}
        </div>
        <div className="p-4">
          {showAddForm && (
            <AddNoteForm
              onCancel={() => setShowAddForm(false)}
              onFormSubmit={onFormSubmitHandle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
