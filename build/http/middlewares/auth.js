"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/middlewares/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(auth_exports);
var import_fastify_plugin = require("fastify-plugin");

// src/http/routes/_errors/unauthorized-error.ts
var UnauthorizedError = class extends Error {
  constructor(message) {
    super(message != null ? message : "Unauthorized");
  }
};

// src/http/middlewares/auth.ts
var auth = (0, import_fastify_plugin.fastifyPlugin)((app) => __async(void 0, null, function* () {
  app.addHook("preHandler", (request) => __async(void 0, null, function* () {
    request.getCurrentUserId = () => __async(void 0, null, function* () {
      try {
        const { sub } = yield request.jwtVerify();
        return sub;
      } catch (err) {
        throw new UnauthorizedError("Invalid auth token, try sign in again.");
      }
    });
  }));
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});
