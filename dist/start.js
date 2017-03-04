"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const module_1 = require("magnet-core/module");
const http = require("http");
const https = require("https");
const redirectHttps = require("redirect-https");
const greenlock_1 = require("./config/greenlock");
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
            https
                .createServer(this.app.greenlock.httpsOptions, this.app.greenlock.middleware(this.app.config.spdy.app))
                .listen(config.httpsPort, function () {
                log.info("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Greenlock;
//# sourceMappingURL=start.js.map