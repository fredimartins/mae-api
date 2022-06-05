import {
  Table,
  Model,
  Column,
  Unique,
  DefaultScope,
  Scopes,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  AllowNull
} from 'sequelize-typescript';
import Task from './Question.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
@Table({
  timestamps: true
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
  
}
