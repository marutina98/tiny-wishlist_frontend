import type IList from './list.interface';
import type ITimestamp from './timestamp.interface';

export default interface IUser extends ITimestamp {
  id: string,
  email: string,
  username: string,
  password?: string,
  lists?: IList[],
}