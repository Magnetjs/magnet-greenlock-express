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
const greenlock = require("greenlock-express");
const greenlock_1 = require("./config/greenlock");
class Greenlock extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('greenlock', greenlock_1.default);
            this.app.greenlock = greenlock.create(config);
            this.app.config.spdy.options = Object.assign(this.app.config.spdy.options, this.app.greenlock);
            this.app.config.spdy.app = this.app.greenlock.middleware(this.app.koa.callback());
            this.app.config.koaSslify.wrappers.push(this.app.greenlock.middleware);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Greenlock;
//# sourceMappingURL=index.js.map