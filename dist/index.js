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
const greenlock = require("greenlock-express");
// TODO: Increase the speed of get cert, or anyway to cache it?
class Greenlock extends module_1.Module {
    init() {
        this.moduleName = 'greenlock-express';
        this.defaultConfig = __dirname;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.magnet.app) {
                this.config.app = this.app[this.config.magnet.app];
            }
            this.insert(greenlock.create(this.config));
            this.app.config[this.config.magnet.plain].wrappers.push(this.app.greenlock_express.middleware);
            this.app.config[this.config.magnet.tls].wrappers.push(this.app.greenlock_express.middleware);
            this.app.config[this.config.magnet.tls].httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlock_express.httpsOptions);
        });
    }
}
exports.default = Greenlock;
//# sourceMappingURL=index.js.map