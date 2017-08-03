import { Module } from 'magnet-core/module'
import * as greenlock from 'greenlock-express'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  init () {
    this.moduleName = 'greenlock-express'
    this.defaultConfig = __dirname
  }

  async setup () {
    if (this.config.magnet.app) {
      this.config.app = this.app[this.config.magnet.app]
    }

    this.insert(greenlock.create(this.config))

    this.app.config[this.config.magnet.plain].wrappers.push(this.app.greenlockExpress.middleware)
    this.app.config[this.config.magnet.tls].wrappers.push(this.app.greenlockExpress.middleware)
    this.app.config[this.config.magnet.tls].httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlockExpress.httpsOptions)
  }
}
