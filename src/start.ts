import { Module } from 'magnet-core/module'

import defaultConfig from './config/greenlock_express'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  async setup () {
    const config = this.prepareConfig('greenlock', defaultConfig)

    this.app.greenlockExpressServer = this.app.greenlockExpress.listen(config.plainPort, config.tlsPort)
  }
}
