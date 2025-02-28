import { Notes } from "../../interfaces";
import NoteListItem from "./notes-item.view";

type Props = {
  notes: Notes[];
};
function NotesList(props: Props) {
  return props.notes.map((note) => <NoteListItem note={note} key={note.id} />);
}

export default NotesList;
