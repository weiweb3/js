'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cookie = require('cookie');
var sdk = require('@weiweb3/sdk');

function redirectWithError(req, res, error) {
  const encodedError = encodeURIComponent(error);
  const url = new URL(req.headers.referer);
  url.searchParams.set("error", encodedError);
  return res.redirect(url.toString());
}

async function handler$2(req, res, ctx) {
  var _ctx$callbacks;

  if (req.method !== "GET") {
    return redirectWithError(req, res, "INVALID_METHOD");
  }

  const {
    sdk,
    domain
  } = ctx; // Get signed login payload from the frontend

  const payload = JSON.parse(atob(req.query.payload));

  if (!payload) {
    redirectWithError(req, res, "MISSING_LOGIN_PAYLOAD");
  }

  let token;

  try {
    // Generate an access token with the SDK using the signed payload
    token = await sdk.auth.generateAuthToken(domain, payload);
  } catch {
    return redirectWithError(req, res, "INVALID_LOGIN_PAYLOAD");
  } // Securely set httpOnly cookie on request to prevent XSS on frontend
  // And set path to / to enable weiweb3_auth_token usage on all endpoints


  res.setHeader("Set-Cookie", cookie.serialize("weiweb3_auth_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  }));

  if ((_ctx$callbacks = ctx.callbacks) !== null && _ctx$callbacks !== void 0 && _ctx$callbacks.login) {
    const address = sdk.auth.verify(domain, payload);
    await ctx.callbacks.login(address);
  }

  return res.status(301).redirect(req.query.redirect);
}

async function handler$1(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({
      error: "Invalid method. Only GET supported."
    });
  } // Set the access token to 'none' and expire in 5 seconds


  res.setHeader("Set-Cookie", cookie.serialize("weiweb3_auth_token", "", {
    path: "/",
    expires: new Date(Date.now() + 5 * 1000)
  }));
  return res.status(301).redirect(req.headers.referer);
}

async function handler(req, res, ctx) {
  if (req.method !== "GET") {
    return res.status(400).json({
      error: "Invalid method. Only GET supported."
    });
  }

  const {
    sdk,
    domain
  } = ctx;
  let user = null;
  const token = req.cookies.weiweb3_auth_token;

  if (token) {
    try {
      var _ctx$callbacks;

      const address = await sdk.auth.authenticate(domain, token);

      if ((_ctx$callbacks = ctx.callbacks) !== null && _ctx$callbacks !== void 0 && _ctx$callbacks.user) {
        user = await ctx.callbacks.user(address);
      }

      user = { ...user,
        address
      };
    } catch {// No-op
    }
  }

  return res.status(200).json(user);
}

async function Weiweb3AuthRouter(req, res, ctx) {
  // Catch-all route must be named with [...weiweb3]
  const {
    weiweb3
  } = req.query;
  const action = weiweb3 === null || weiweb3 === void 0 ? void 0 : weiweb3[0];

  switch (action) {
    case "login":
      return await handler$2(req, res, ctx);

    case "user":
      return await handler(req, res, ctx);

    case "logout":
      return await handler$1(req, res);

    default:
      return res.status(400).json({
        message: "Invalid route for authentication."
      });
  }
}

function Weiweb3Auth(cfg) {
  const ctx = { ...cfg,
    sdk: sdk.Weiweb3SDK.fromPrivateKey(cfg.privateKey, "mainnet")
  };

  function Weiweb3AuthHandler() {
    if (arguments.length === 0) {
      return async (req, res) => await Weiweb3AuthRouter(req, res, ctx);
    }

    return Weiweb3AuthRouter(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], ctx);
  }

  async function getUser(req) {
    const {
      sdk,
      domain
    } = ctx;
    let user = null;
    const token = typeof req.cookies.get === "function" ? req.cookies.get("weiweb3_auth_token") : req.cookies.weiweb3_auth_token;

    if (token) {
      try {
        const address = await sdk.auth.authenticate(domain, token);
        user = {
          address
        };
      } catch {// No-op
      }
    }

    return user;
  }

  return {
    Weiweb3AuthHandler,
    getUser
  };
}

exports.Weiweb3Auth = Weiweb3Auth;
