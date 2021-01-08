export class Keys {
  static twitchClientId: string = process.env.TWITCH_CLIENT_ID || '';
  static twitchClientSecret: string = process.env.TWITCH_CLIENT_SECRET || '';
  static mongoURI: string = process.env.MONGO_URI || '';
}
