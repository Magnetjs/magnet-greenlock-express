import { Module } from 'magnet-core/module'
import * as greenlock from 'greenlock-express'

import defaultConfig from './config/greenlock'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  async setup () {
    const config = this.prepareConfig('greenlock', defaultConfig)

    this.app.greenlock = greenlock.create(config)

    // Any better way?
    this.app.config.spdy.options = Object.assign(this.app.config.spdy.options, this.app.greenlock)
    this.app.config.spdy.app = this.app.greenlock.middleware(this.app.koa.callback())
    this.app.config.koaSslify.wrappers.push(this.app.greenlock.middleware)
  }
}
