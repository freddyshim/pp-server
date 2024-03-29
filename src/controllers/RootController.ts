import { Request, Response } from 'express'
import { Controller, Use, Get, Post } from './decorators'
import { requireLogin } from '../middlewares/requireLogin'
import { areUsersEqual } from '../utils/user'
import { User, UserDocument } from '../models/User'

@Controller('')
class RootController {
  @Get('/')
  getRoot(req: Request, res: Response): void {
    res.status(200).send('Great success!')
  }

  @Get('/user')
  @Use(requireLogin)
  getUser(req: Request, res: Response): void {
    res.send(req.user as UserDocument)
  }

  @Post('/user')
  @Use(requireLogin)
  async postUser(req: Request, res: Response): Promise<void> {
    const localUser = req.body as UserDocument
    const databaseUser = req.user as UserDocument
    if (!areUsersEqual(localUser, databaseUser)) {
      await User.updateOne({ id: localUser.id }, localUser)
    }

    res.send({})
  }
}
