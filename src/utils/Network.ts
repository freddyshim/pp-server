export class Network {
  static get address(): string {
    if (process.env.NODE_ENV === 'production') {
      return 'https://pp.freddyshim.com'
    } else {
      return 'http://localhost:3000'
    }
  }
}
