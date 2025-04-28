import type ITimestamp from './timestamp.interface';

export default interface IItem extends ITimestamp {
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  url: string,
  quantity: number,
  price: string,
  archived: boolean,
  reserved: boolean,
  groupId: string,
}