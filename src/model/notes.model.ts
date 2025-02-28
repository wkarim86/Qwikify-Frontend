export class NotesModel {
  id: number;
  residentName: string;
  authorName: string;
  content: string;
  dateTime: string;

  constructor(
    id: number,
    residentName: string,
    authorName: string,
    content: string
  ) {
    this.id = id;
    this.residentName = residentName;
    this.authorName = authorName;
    this.content = content;
    this.dateTime = new Date().toISOString();
  }
}
