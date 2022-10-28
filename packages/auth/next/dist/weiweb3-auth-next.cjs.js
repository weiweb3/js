'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./weiweb3-auth-next.cjs.prod.js");
} else {
  module.exports = require("./weiweb3-auth-next.cjs.dev.js");
}
