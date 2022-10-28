'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-react-solana.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-react-solana.cjs.dev.js");
}
