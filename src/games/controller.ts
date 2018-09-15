import { JsonController, Get, Param, NotFoundError, Body, Put, HttpCode, Post, BadRequestError } from 'routing-controllers'
import Game from './entity'

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

      console.log("The game is: ", game.board, "Update: ", update.board)
      console.log(game)

      if(game.checkMoves(game.board, update.board) <= 1) {
        return Game.merge(game, update).save()
      } else {
        throw new BadRequestError('You cannot make more than one move!')
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
