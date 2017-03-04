import { Module } from 'magnet-core/module'
import * as http from 'http'
import * as https from 'https'
import * as redirectHttps from 'redirect-https'

import defaultConfig from './config/greenlock'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  async setup () {
    const config = this.prepareConfig('greenlock', defaultConfig)
    const log = this.log

    if (config.redirectFromPort) {
      http
      .createServer(this.app.greenlock.middleware(redirectHttps()))
      .listen(config.redirectFromPort, function () {
        log.info("Listening for ACME http-01 challenges on", this.address())
      })
    }

    // handles your app
    https
    .createServer(this.app.greenlock.httpsOptions, this.app.greenlock.middleware(this.app.config.spdy.app))
    .listen(config.httpsPort, function () {
      log.info("Listening for ACME tls-sni-01 challenges and serve app on", this.address())
    })

    // return
    // // const this.app.grenlock = greenlock.create(config)
    //
    // this.app.greenlockServer = https.createServer(
    //   this.app.grenlock.httpsOptions,
    //   this.app.grenlock.middleware(this.app.koa.callback())
    // )
    //
    // const log = this.log
    // this.app.greenlockServer.listen(config.httpsPort, function () {
    //   log.info(`Spdy https server (Greenlock) started at port ${this.address().port}`)
    // })

    // if (config.httpPort) {
    //   const redirectToHttps = new Koa().use(sslify()).callback()
    //   http
    //     .createServer(this.app.grenlock.middleware(redirectToHttps))
    //     .listen(
    //       config.httpPort,
    //       () => {
    //         this.log.info('handle ACME http-01 challenge and redirect to https')
    //       }
    //     )
    // }
  }
}
