'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-auth-next-auth.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-auth-next-auth.cjs.dev.js");
}
