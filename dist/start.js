"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const http = require("http");
const https = require("https");
const redirectHttps = require("redirect-https");
const greenlock_1 = require("./config/greenlock");
// TODO: Increase the speed of get cert, or anyway to cache it?
class Greenlock extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('greenlock', greenlock_1.default);
            const log = this.log;
            if (config.redirectFromPort) {
                http
                    .createServer(this.app.greenlock.middleware(redirectHttps()))
                    .listen(config.redirectFromPort, function () {
                    log.info("Listening for ACME http-01 challenges on", this.address());
                });
            }
            // handles your app
            https
                .createServer(this.app.greenlock.httpsOptions, this.app.greenlock.middleware(this.app.config.spdy.app))
                .listen(config.httpsPort, function () {
                log.info("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
            });
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
        });
    }
}
exports.default = Greenlock;
//# sourceMappingURL=start.js.map