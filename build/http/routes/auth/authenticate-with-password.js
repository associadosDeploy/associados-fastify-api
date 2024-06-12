"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/http/routes/auth/authenticate-with-password.ts
var authenticate_with_password_exports = {};
__export(authenticate_with_password_exports, {
  authenticateWithPassword: () => authenticateWithPassword
});
module.exports = __toCommonJS(authenticate_with_password_exports);
var import_bcryptjs = require("bcryptjs");
var import_zod = __toESM(require("zod"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/auth/authenticate-with-password.ts
function authenticateWithPassword(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().post(
      "/sessions",
      {
        schema: {
          tags: ["auth"],
          summary: "Authenticate with password",
          body: import_zod.default.object({
            email: import_zod.default.string(),
            password: import_zod.default.string()
          }),
          response: {
            201: import_zod.default.object({
              token: import_zod.default.string(),
              user: import_zod.default.object({
                id: import_zod.default.string(),
                name: import_zod.default.string(),
                email: import_zod.default.string(),
                password: import_zod.default.string(),
                created_at: import_zod.default.date(),
                updated_at: import_zod.default.date()
              })
            })
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        const { email, password } = request.body;
        const userFromEmail = yield prisma.user.findFirst({
          where: {
            email
          }
        });
        if (!userFromEmail) {
          throw new BadRequestError("Invalid credentials");
        }
        const isPasswordValid = yield (0, import_bcryptjs.compare)(password, userFromEmail.password);
        if (!isPasswordValid) {
          throw new BadRequestError("Invalid credentials");
        }
        const token = yield reply.jwtSign(
          {
            sub: userFromEmail.id
          },
          {
            sign: {
              expiresIn: "7d"
            }
          }
        );
        return reply.status(200).send({ user: userFromEmail, token });
      })
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateWithPassword
});
