import { JsonController, Get, Param, NotFoundError, Body, Put, HttpCode, Post } from 'routing-controllers'
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
      console.log(game)
      return Game.merge(game, update).save()
    }

    @Post('/games')
      @HttpCode(201)
      createGame(
        @Body() game: Game
      ) {
        console.log(game)
        return game.save()
      }
}
