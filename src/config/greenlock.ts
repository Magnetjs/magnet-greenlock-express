export default {
  redirectFromPort: 80, // Enable it for redirect to httpsPort
  httpsPort: 443,

  server: 'staging', // in production use 'https://acme-v01.api.letsencrypt.org/directory'
  // server: 'https://acme-v01.api.letsencrypt.org/directory', // in production use 'https://acme-v01.api.letsencrypt.org/directory'

  // configDir: os.homedir() + '/letsencrypt/etc',
  debug: true,
  agreeTos: true,
  email: 'developer@example.com', // CHANGE ME

  approveDomains: function (options, certs, cb) {
    options.domains = certs && certs.altnames || options.domains

    cb(null, { options, certs })
  }
}
