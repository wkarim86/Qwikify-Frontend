import { useForm } from "react-hook-form";
import { FormFields } from "../../interfaces";

type FormProps = {
  onFormSubmit?: (data: FormFields) => void;
  onCancel?: () => void;
};

function AddNoteForm({ onFormSubmit, onCancel }: FormProps) {
  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      residentName: "",
      authorName: "",
      content: "",
    },
  });
  const onSubmitHandle = (data: FormFields) => {
    onFormSubmit && onFormSubmit(data);
    reset();
  };
  const onCanelHandle = () => {
    reset();
    onCancel && onCancel();
  };
  return (
    <div className="bg-gray-300">
      <div className="w-full flex justify-between items-center bg-gray-400 p-4">
        <h3 className="font-bold">Add Care Note</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className="flex flex-col p-4"
      >
        <div className="flex flex-col my-2">
          <label>Resident Name:</label>
          <input
            className="bg-white p-2 border"
            type="text"
            placeholder="Enter resident name"
            {...register("residentName", { required: true })}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Author Name:</label>
          <input
            className="bg-white p-2 border"
            type="text"
            placeholder="Enter author name"
            {...register("authorName", { required: true })}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Note Content:</label>
          <textarea
            className="bg-white p-2 border"
            placeholder="Enter content"
            {...register("content", { required: true })}
          />
        </div>
        <div className="my-4 flex">
          <button
            type="submit"
            className="bg-green-600 px-8 py-2 rounded text-white mx-2"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-red-600 px-8 py-2 rounded text-white mx-2"
            onClick={() => onCanelHandle()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNoteForm;
