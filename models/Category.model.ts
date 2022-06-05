import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import Question from './Question.model';

@Table({
  timestamps: true
})
export default class Category extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Question)
  questions: Question[];
}
