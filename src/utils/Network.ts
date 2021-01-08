export class Network {
  static get address(): string {
    if (process.env.NODE_ENV === 'production') {
      return 'https://anookday.dev';
    } else {
      return 'http://localhost:3000';
    }
  }
}
