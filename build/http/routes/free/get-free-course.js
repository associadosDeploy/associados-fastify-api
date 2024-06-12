"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/http/routes/free/get-free-course.ts
var get_free_course_exports = {};
__export(get_free_course_exports, {
  getFreeCourse: () => getFreeCourse
});
module.exports = __toCommonJS(get_free_course_exports);

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

// src/http/routes/free/get-free-course.ts
var import_zod2 = require("zod");

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/free/get-free-course.ts
function getFreeCourse(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().get(
      "/free/course/:id",
      {
        schema: {
          tags: ["free"],
          params: import_zod2.z.object({
            id: import_zod2.z.string()
          }),
          summary: "Get all courses",
          response: {
            200: import_zod2.z.object({
              id: import_zod2.z.string().uuid(),
              link: import_zod2.z.string().url(),
              title: import_zod2.z.string(),
              description: import_zod2.z.string(),
              created_at: import_zod2.z.date(),
              updated_at: import_zod2.z.date(),
              user_id: import_zod2.z.string().nullable(),
              avatar: import_zod2.z.string().nullable()
            })
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        const { id } = request.params;
        const checkCourseExists = yield prisma.course.findUnique({
          where: {
            id
          }
        });
        if (!checkCourseExists) {
          throw new BadRequestError("Course not found");
        }
        return reply.send(__spreadProps(__spreadValues({}, checkCourseExists), {
          avatar: checkCourseExists.avatar ? `${env.APP_URL}/files/${checkCourseExists.avatar}` : null
        }));
      })
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFreeCourse
});
