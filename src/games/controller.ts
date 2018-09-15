import { JsonController, Get, Param, NotFoundError, Body, Put, HttpCode, Post, BadRequestError } from 'routing-controllers'
import Game from './entity'

 const checkMoves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
      const games = await Game.find()
      return { games }
    }
    
    @Get('/games/:id')
    async getGame(
        @Param('id') id: number
    ) {
      return await Game.findOne(id)
    }

    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('Cannot find game')

      if (update.board) {
        if(checkMoves(game.board, update.board) <= 1) {
          return Game.merge(game, update).save()
        } else {
          throw new BadRequestError('You cannot make more than one move!')
        } 
      } else if (update.color) {
        if (["red", "blue", "green", "yellow", "magenta"].includes(update.color)) {
          return Game.merge(game, update).save()
        } else {
          throw new BadRequestError('You have to assign one of the following colors: red, blue, green, yellow or magenta')
        }
      } else {
        return Game.merge(game, update).save()
      }
    }

    @Post('/games')
      @HttpCode(201)
      async createGame(
        @Body() game: Game
      ) {
          const {color, ...rest} = game
          const entity = Game.create(rest)  
          await entity.setRandomColor()
          return entity.save()
      }
}
