import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

const getRandomColor = () => {
    const colorsArray = ["red", "blue","green", "yellow", "magenta"]
    var randomIndex = Math.floor(Math.random() * colorsArray.length); 
    var randomColor = colorsArray[randomIndex];

    return randomColor
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @Column('text', {nullable:false})
  name: string

  @Column('text', {default: getRandomColor()})
  color: string

  @Column('json', {default: defaultBoard})
  board: string[][]
}

