import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
// import { IsString} from 'class-validator'

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

const getRandomColor = () => {
    const colorsArray = ["red", "blue", "green", "yellow", "magenta"]
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

  //@IsString()
  //@IsIn(["red", "blue", "green", "yellow", "magenta"])
  @Column('text', {default: `${getRandomColor()}`})
  color: string

  @Column('json', {default: defaultBoard })
  board: string[][]
}


// const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length


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

