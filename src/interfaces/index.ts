export type ObjectValues<T> = T[keyof T];

export interface Notes {
  id: number;
  residentName: string;
  authorName: string;
  content: string;
  dateTime: string;
}

export interface Note {
  residentName: string;
  authorName: string;
  content: string;
}

export const status = {
  idle: "idle",
  loading: "loading",
  completed: "completed",
  failed: "failed",
} as const;

export type NoteStatus = ObjectValues<typeof status>;

export interface FormFields {
  residentName: string;
  authorName: string;
  content: string;
}
