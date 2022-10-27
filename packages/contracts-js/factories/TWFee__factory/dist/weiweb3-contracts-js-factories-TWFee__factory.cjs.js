'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-contracts-js-factories-TWFee__factory.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-contracts-js-factories-TWFee__factory.cjs.dev.js");
}
