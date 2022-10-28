'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-sdk-solana.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-sdk-solana.cjs.dev.js");
}
