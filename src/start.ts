import { Module } from 'magnet-core/module'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  init () {
    this.moduleName = 'greenlock-express'
    this.defaultConfig = __dirname
  }

  async setup () {
    this.insert(
      this.app.greenlock_express.listen(this.config.plainPort, this.config.tlsPort),
      'greenlockExpressServer'
    )
  }
}
