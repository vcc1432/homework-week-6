import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
// import { IsString, IsIn} from 'class-validator'

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @Column('text', {nullable:false})
  name: string

  // @IsString()
  // @IsIn(["red", "blue", "green", "yellow", "magenta"])
  @Column('text')
  color: string

  @Column('json', {default: defaultBoard })
  board: JSON

  setRandomColor() {
    const colorsArray = ["red", "blue", "green", "yellow", "magenta"]
    const randomIndex = Math.floor(Math.random() * colorsArray.length); 
    const randomColor = colorsArray[randomIndex];
    
    this.color = randomColor
  }

}


// checkMoves(_board: string[][]) {
//   const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length

// }


// const updateGame = (id: number) => new Promise<UserEntity | null>((resolve, reject) => {
//   setTimeout(() => {
//     if (+id === 123) resolve(alice)
//     else if (id > 1000) reject(new Error('getUser error!'))
//     else resolve(null)
//   }, 500)
// })

// const toUser = (entity: UserEntity): UserResponse => {
//   const user = {
//       user: {
//           name: `${entity.firstName} ${entity.lastName}`, 
//           age: moment().diff(entity.birthDate, 'years')
//      }
//  }
//  return user
// }

