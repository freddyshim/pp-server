import passport from 'passport';
import { Request, Response } from 'express';
import { Controller, Use, Get } from './decorators';
import { UserDocument } from '../models/User';

@Controller('/auth')
class AuthController {
  @Get('/twitch')
  @Use(passport.authenticate('twitch', { failureRedirect: '/' }))
  getTwitchAuth(): void {}

  @Get('/twitch/callback')
  @Use(passport.authenticate('twitch', { failureRedirect: '/' }))
  getTwitchAuthCallback(req: Request, res: Response): void {
    const user = req.user as UserDocument | null;
    if (user) {
      const redirectUrl =
        `com.anookday.rpistream://oauth2callback?` +
        `id=${user.id}&accessToken=${user.auth.accessToken}`;
      res.redirect(redirectUrl);
    }
  }

  @Get('/logout')
  getLogout(req: Request, res: Response): void {
    req.logout();
    res.send({ logout: true });
  }
}
