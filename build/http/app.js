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

// src/http/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_swagger = __toESM(require("@fastify/swagger"));
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"));
var import_fastify = __toESM(require("fastify"));
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/http/routes/free/get-free-associates.ts
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

// src/http/routes/free/get-free-associates.ts
function getFreeAssociates(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().get(
      "/free/associate",
      {
        schema: {
          tags: ["free"],
          summary: "Get all associates",
          querystring: import_zod2.default.object({
            name: import_zod2.default.string().optional()
          }),
          response: {
            200: import_zod2.default.array(
              import_zod2.default.object({
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
            )
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        const { name } = request.query;
        const associates = yield prisma.associate.findMany({
          where: {
            name: name ? { contains: name } : void 0,
            visible: true,
            valid: 1
          }
        });
        const formattedAssociates = associates.map((associate) => {
          return __spreadProps(__spreadValues({}, associate), {
            avatar: associate.avatar ? `${env.APP_URL}/files/${associate.avatar}` : null
          });
        });
        return reply.send(formattedAssociates);
      })
    );
  });
}

// src/http/routes/free/get-free-associate.ts
var import_zod3 = __toESM(require("zod"));

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/free/get-free-associate.ts
function getFreeAssociate(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().get(
      "/free/associate/:id",
      {
        schema: {
          tags: ["free"],
          summary: "Get associate detail",
          params: import_zod3.default.object({
            id: import_zod3.default.string()
          }),
          response: {
            200: import_zod3.default.object({
              id: import_zod3.default.string().uuid(),
              name: import_zod3.default.string(),
              rg: import_zod3.default.string(),
              emissor: import_zod3.default.string(),
              rg_uf: import_zod3.default.string(),
              shipping_date: import_zod3.default.string(),
              naturalness: import_zod3.default.string(),
              naturalness_uf: import_zod3.default.string(),
              address: import_zod3.default.string(),
              email_data: import_zod3.default.string(),
              profession: import_zod3.default.string(),
              education: import_zod3.default.string(),
              specialization: import_zod3.default.string(),
              email_profession: import_zod3.default.string(),
              acting: import_zod3.default.string(),
              avatar: import_zod3.default.string().nullable(),
              created_at: import_zod3.default.date(),
              updated_at: import_zod3.default.date(),
              valid: import_zod3.default.number(),
              visible: import_zod3.default.boolean(),
              cpf: import_zod3.default.string(),
              birthDate: import_zod3.default.string(),
              phone: import_zod3.default.string(),
              affiliation: import_zod3.default.string(),
              city: import_zod3.default.string(),
              state: import_zod3.default.string(),
              cep: import_zod3.default.string(),
              oab: import_zod3.default.string()
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

// src/http/routes/free/get-free-courses.ts
var import_zod4 = __toESM(require("zod"));
function getFreeCourses(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().get(
      "/free/course",
      {
        schema: {
          tags: ["free"],
          summary: "Get all courses",
          response: {
            200: import_zod4.default.array(
              import_zod4.default.object({
                id: import_zod4.default.string().uuid(),
                link: import_zod4.default.string().url(),
                title: import_zod4.default.string(),
                description: import_zod4.default.string(),
                created_at: import_zod4.default.date(),
                updated_at: import_zod4.default.date(),
                user_id: import_zod4.default.string().nullable(),
                avatar: import_zod4.default.string().nullable()
              })
            )
          }
        }
      },
      (request, reply) => __async(this, null, function* () {
        const courses = yield prisma.course.findMany();
        const formattedCourses = courses.map((course) => {
          return __spreadProps(__spreadValues({}, course), {
            avatar: course.avatar ? `${env.APP_URL}/files/${course.avatar}` : null
          });
        });
        return reply.send(formattedCourses);
      })
    );
  });
}

// src/http/routes/free/get-free-course.ts
var import_zod5 = require("zod");
function getFreeCourse(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().get(
      "/free/course/:id",
      {
        schema: {
          tags: ["free"],
          params: import_zod5.z.object({
            id: import_zod5.z.string()
          }),
          summary: "Get all courses",
          response: {
            200: import_zod5.z.object({
              id: import_zod5.z.string().uuid(),
              link: import_zod5.z.string().url(),
              title: import_zod5.z.string(),
              description: import_zod5.z.string(),
              created_at: import_zod5.z.date(),
              updated_at: import_zod5.z.date(),
              user_id: import_zod5.z.string().nullable(),
              avatar: import_zod5.z.string().nullable()
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

// src/http/routes/auth/authenticate-with-password.ts
var import_bcryptjs = require("bcryptjs");
var import_zod6 = __toESM(require("zod"));
function authenticateWithPassword(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().post(
      "/sessions",
      {
        schema: {
          tags: ["auth"],
          summary: "Authenticate with password",
          body: import_zod6.default.object({
            email: import_zod6.default.string(),
            password: import_zod6.default.string()
          }),
          response: {
            201: import_zod6.default.object({
              token: import_zod6.default.string(),
              user: import_zod6.default.object({
                id: import_zod6.default.string(),
                name: import_zod6.default.string(),
                email: import_zod6.default.string(),
                password: import_zod6.default.string(),
                created_at: import_zod6.default.date(),
                updated_at: import_zod6.default.date()
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

// src/http/routes/users/create-user.ts
var import_zod7 = __toESM(require("zod"));

// src/http/middlewares/auth.ts
var import_fastify_plugin = require("fastify-plugin");

// src/http/routes/_errors/unauthorized-error.ts
var UnauthorizedError = class extends Error {
  constructor(message) {
    super(message != null ? message : "Unauthorized");
  }
};

// src/http/middlewares/auth.ts
var auth = (0, import_fastify_plugin.fastifyPlugin)((app2) => __async(void 0, null, function* () {
  app2.addHook("preHandler", (request) => __async(void 0, null, function* () {
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

// src/http/routes/users/create-user.ts
var import_bcryptjs2 = require("bcryptjs");
function createUser(app2) {
  return __async(this, null, function* () {
    app2.withTypeProvider().register(auth).post(
      "/users",
      {
        schema: {
          tags: ["users"],
          summary: "Create a new Users",
          security: [{ bearerAuth: [] }],
          body: import_zod7.default.object({
            name: import_zod7.default.string(),
            email: import_zod7.default.string(),
            password: import_zod7.default.string()
          }),
          response: {
            201: import_zod7.default.object({
              userId: import_zod7.default.string().uuid()
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
        const hashedPassword = yield (0, import_bcryptjs2.hash)(password, 8);
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

// src/http/error-handler.ts
var import_zod8 = require("zod");
var errorHandler = (error, request, reply) => {
  if (error instanceof import_zod8.ZodError) {
    reply.status(400).send({
      message: "Validation error",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequestError) {
    reply.status(400).send({
      message: error.message
    });
  }
  if (error instanceof UnauthorizedError) {
    reply.status(401).send({
      message: error.message
    });
  }
  console.error(error);
  reply.status(500).send({ message: "Internal server error" });
};

// src/http/app.ts
var app = (0, import_fastify.default)().withTypeProvider();
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setErrorHandler(errorHandler);
app.register(import_swagger.default, {
  openapi: {
    info: {
      title: "API APJESC",
      description: "Api do apjesc",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  prefix: "/docs"
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET
});
app.register(import_cors.default);
app.register(getFreeAssociates);
app.register(getFreeAssociate);
app.register(getFreeCourses);
app.register(getFreeCourse);
app.register(authenticateWithPassword);
app.register(createUser);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
