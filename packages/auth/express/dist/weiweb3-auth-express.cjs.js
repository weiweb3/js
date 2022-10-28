'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-auth-express.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-auth-express.cjs.dev.js");
}
