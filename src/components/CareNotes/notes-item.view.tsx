import dayjs from "dayjs";
import { Notes } from "../../interfaces";

type Props = {
  note: Notes;
};

function NoteListItem(props: Props) {
  return (
    <div className="bg-white p-4 flex flex-col my-2">
      <h3 className="text-color font-bold text-[14px]">
        {props.note.residentName}
      </h3>
      <span className="text-gray-400 text-[12px]">
        {dayjs(props.note.dateTime).format("YYYY-MM-DD A")} -{" "}
        {props.note.authorName}
      </span>
      <p className="text-black text-[14px]">{props.note.content}</p>
    </div>
  );
}

export default NoteListItem;
