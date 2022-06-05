import { Table, Model, Column, HasMany, Sequelize } from 'sequelize-typescript';
import Question from './Question.model';
import {Op} from 'sequelize';

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

  static async findByName(nameLike:string) {
    console.log(nameLike)
    let category = await this.findAll({where:{name:{
      [Op.iLike]: `%${nameLike}%`,
    }}});

    return category;
  }

}
