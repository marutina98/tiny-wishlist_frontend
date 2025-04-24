import type IItem from './item.interface';
import type ITimestamp from './timestamp.interface';

export default interface IGroup extends ITimestamp {
  id: string,
  title: string,
  archived: boolean,
  listId: string,
  items: IItem[],
}