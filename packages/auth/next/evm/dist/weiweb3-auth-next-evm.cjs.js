'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-auth-next-evm.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-auth-next-evm.cjs.dev.js");
}
