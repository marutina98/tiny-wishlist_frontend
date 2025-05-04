export default interface IRequestNewList {
  title: string,
  description: string,
  thumbnail: string,
  archived: boolean,
  private: boolean,
  userId: string,
  priorityId: number,
}