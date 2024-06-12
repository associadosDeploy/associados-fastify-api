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

// src/http/routes/users/create-user.ts
var create_user_exports = {};
__export(create_user_exports, {
  createUser: () => createUser
});
module.exports = __toCommonJS(create_user_exports);
var import_zod = __toESM(require("zod"));

// src/http/middlewares/auth.ts
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

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/users/create-user.ts
var import_bcryptjs = require("bcryptjs");
function createUser(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().register(auth).post(
      "/users",
      {
        schema: {
          tags: ["users"],
          summary: "Create a new Users",
          security: [{ bearerAuth: [] }],
          body: import_zod.default.object({
            name: import_zod.default.string(),
            email: import_zod.default.string(),
            password: import_zod.default.string()
          }),
          response: {
            201: import_zod.default.object({
              userId: import_zod.default.string().uuid()
            })
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        yield request.getCurrentUserId();
        const { name, email, password } = request.body;
        const checkUserExists = yield prisma.user.findFirst({
          where: { email }
        });
        if (checkUserExists) {
          throw new BadRequestError("Email address already used.");
        }
        const hashedPassword = yield (0, import_bcryptjs.hash)(password, 8);
        const user = yield prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });
        return reply.status(201).send({
          userId: user.id
        });
      })
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser
});
