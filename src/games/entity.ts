import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Column('text', {nullable:false})
  name: string

   // @IsIn(["red", "blue", "green", "yellow", "magenta"])
  @Column('text', {nullable:false})
  color: string

  @Column('json', {default: defaultBoard })
  board: JSON

  setRandomColor = () => {
    const colorsArray = ["red", "blue", "green", "yellow", "magenta"]
    const randomIndex = Math.floor(Math.random() * colorsArray.length); 
    const randomColor = colorsArray[randomIndex];
  
    this.color = randomColor
  }
}

