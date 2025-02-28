/**
 * Backend Server Endpoints
 */
import { FormFields, Notes } from "../../interfaces";
import { endPoints } from "../../redux/base.api";

export const notesApi = endPoints.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotes: builder.query({
      query: () => ({
        url: "/care-notes",
      }),
    }),
    insertNote: builder.mutation<Notes, FormFields>({
      query: (body) => ({
        url: "/care-notes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const { useFetchNotesQuery, useInsertNoteMutation } = notesApi;
