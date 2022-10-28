'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-sdk-solana-server.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-sdk-solana-server.cjs.dev.js");
}
