import { Module } from 'magnet-core/module'
import * as greenlock from 'greenlock-express'

import defaultConfig from './config/greenlock_express'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  async setup () {
    const config = this.prepareConfig('greenlock_express', defaultConfig)

    if (config.magnet.app) {
      config.app = this.app[config.magnet.app]
    }

    this.app.greenlockExpress = greenlock.create(config)

    this.app.config[config.magnet.plain].wrappers.push(this.app.greenlockExpress.middleware)
    this.app.config[config.magnet.tls].wrappers.push(this.app.greenlockExpress.middleware)
    this.app.config[config.magnet.tls].httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlockExpress.httpsOptions)
  }
}
