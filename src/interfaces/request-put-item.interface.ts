export default interface IRequestPutItem {
  id: string,
  title?: string,
  description?: string,
  thumbnail?: string,
  url?: string,
  quantity?: number,
  price?: string,
  archived?: boolean,
  reserved?: boolean,
  groupId?: string,
}