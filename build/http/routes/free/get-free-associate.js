"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/http/routes/free/get-free-associate.ts
var get_free_associate_exports = {};
__export(get_free_associate_exports, {
  getFreeAssociate: () => getFreeAssociate
});
module.exports = __toCommonJS(get_free_associate_exports);
var import_zod2 = __toESM(require("zod"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  JWT_SECRET: import_zod.z.string(),
  APP_URL: import_zod.z.string().url(),
  PORT: import_zod.z.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables.", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/free/get-free-associate.ts
function getFreeAssociate(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().get(
      "/free/associate/:id",
      {
        schema: {
          tags: ["free"],
          summary: "Get associate detail",
          params: import_zod2.default.object({
            id: import_zod2.default.string()
          }),
          response: {
            200: import_zod2.default.object({
              id: import_zod2.default.string().uuid(),
              name: import_zod2.default.string(),
              rg: import_zod2.default.string(),
              emissor: import_zod2.default.string(),
              rg_uf: import_zod2.default.string(),
              shipping_date: import_zod2.default.string(),
              naturalness: import_zod2.default.string(),
              naturalness_uf: import_zod2.default.string(),
              address: import_zod2.default.string(),
              email_data: import_zod2.default.string(),
              profession: import_zod2.default.string(),
              education: import_zod2.default.string(),
              specialization: import_zod2.default.string(),
              email_profession: import_zod2.default.string(),
              acting: import_zod2.default.string(),
              avatar: import_zod2.default.string().nullable(),
              created_at: import_zod2.default.date(),
              updated_at: import_zod2.default.date(),
              valid: import_zod2.default.number(),
              visible: import_zod2.default.boolean(),
              cpf: import_zod2.default.string(),
              birthDate: import_zod2.default.string(),
              phone: import_zod2.default.string(),
              affiliation: import_zod2.default.string(),
              city: import_zod2.default.string(),
              state: import_zod2.default.string(),
              cep: import_zod2.default.string(),
              oab: import_zod2.default.string()
            })
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        const { id } = request.params;
        const checkAssociateExists = yield prisma.associate.findUnique({
          where: {
            id
          }
        });
        if (!checkAssociateExists) {
          throw new BadRequestError("Associate not found");
        }
        return reply.send(__spreadProps(__spreadValues({}, checkAssociateExists), {
          avatar: checkAssociateExists.avatar ? `${env.APP_URL}/files/${checkAssociateExists.avatar}` : null
        }));
      })
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFreeAssociate
});
