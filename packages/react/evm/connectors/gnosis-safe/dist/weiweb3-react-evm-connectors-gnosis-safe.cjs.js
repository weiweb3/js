'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-react-evm-connectors-gnosis-safe.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-react-evm-connectors-gnosis-safe.cjs.dev.js");
}
