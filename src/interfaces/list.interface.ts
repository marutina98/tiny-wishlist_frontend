import type IUser from './user.interface';
import type IGroup from './group.interface';
import type IPriority from './priority.interface';
import type ITimestamp from './timestamp.interface';

export default interface IList extends ITimestamp {
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  archived: boolean,
  private: boolean,
  userId: string,
  priorityId: number,
  priority: IPriority,
  groups: IGroup[],
  user: IUser,
}