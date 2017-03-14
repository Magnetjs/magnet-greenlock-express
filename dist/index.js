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
const greenlock_express_1 = require("./config/greenlock_express");
// TODO: Increase the speed of get cert, or anyway to cache it?
class Greenlock extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('greenlock_express', greenlock_express_1.default);
            if (config.magnet.app) {
                config.app = this.app[config.magnet.app];
            }
            this.app.greenlockExpress = greenlock.create(config);
            this.app.config[config.magnet.plain].wrappers.push(this.app.greenlockExpress.middleware);
            this.app.config[config.magnet.tls].wrappers.push(this.app.greenlockExpress.middleware);
            this.app.config[config.magnet.tls].httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlockExpress.httpsOptions);
        });
    }
}
exports.default = Greenlock;
//# sourceMappingURL=index.js.map