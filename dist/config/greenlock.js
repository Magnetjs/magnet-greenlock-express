"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    redirectFromPort: 80,
    httpsPort: 443,
    server: 'staging',
    // server: 'https://acme-v01.api.letsencrypt.org/directory', // in production use 'https://acme-v01.api.letsencrypt.org/directory'
    // configDir: os.homedir() + '/letsencrypt/etc',
    debug: true,
    agreeTos: true,
    email: 'developer@example.com',
    approveDomains: function (options, certs, cb) {
        options.domains = certs && certs.altnames || options.domains;
        cb(null, { options, certs });
    }
};
//# sourceMappingURL=greenlock.js.map