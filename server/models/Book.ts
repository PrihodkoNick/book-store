import { Sequelize, Table, Column, Model, DataType, BelongsTo, HasMany } from 'sequelize-typescript';

import Category from '../models/Category';
import Rate from '../models/Rate';
import Favorite from '../models/Favorite';

@Table
class Book extends Model<Book> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: 'id'
  })
  id: BigInt;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'book title'
  })
  title: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'author'
  })
  author: String;

  @Column({
    type: DataType.FLOAT,
    comment: 'book price'
  })
  price: Number;

  @Column({
    type: DataType.STRING,
    comment: 'description'
  })
  description: String;

  @Column({
    type: DataType.FLOAT,
    comment: 'book rating'
  })
  rate: Number;

  @Column({
    type: DataType.TEXT,
    comment: 'fragment of a book'
  })
  fragment: String;

  @Column({
    type: DataType.STRING,
    comment: 'book cover'
  })
  cover: String;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now')
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now')
  })
  updatedAt: Date;
 
  @BelongsTo(() => Category)
  categoryId: Category;

  @HasMany(() => Rate)
  rates: Rate[];

  @HasMany(() => Favorite)
  favorites: Favorite[];
}

export default Book;
