import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './User.model';
import Category from './Category.model';
import Sequelize, { DataTypes } from 'sequelize';
import { shuffleArray } from '../utils';

@Table({
  timestamps: true
})
class Question extends Model {
  @Column
  text: string;

  @Column(
  {
    type: DataTypes.TEXT, 
      get: function() {
        return JSON.parse(this.getDataValue('answers'));
      }, 
      set: function(val) {
        return this.setDataValue('answers', JSON.stringify(val));
      } 
  })
  answers: string[]

  @Column(
  {
    type: DataTypes.VIRTUAL, 
  })
  answer: string

  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @BelongsTo(() => User, 'creatorId')
  creator: User;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;

  static async getRandom() {
    let question = await this.findOne({ order: Sequelize.literal('random()') });
    if (question) {
      question.answer = await question.answers[0];
      question.answers = await shuffleArray(question.answers);
    }
    return question;
  }

}

export default Question;
