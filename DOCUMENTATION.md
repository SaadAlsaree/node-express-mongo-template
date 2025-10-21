# Node Express MongoDB TypeScript Template - التوثيق الكامل

## 📋 نظرة عامة

هذا المشروع هو قالب احترافي لبناء تطبيقات Backend باستخدام Node.js و Express و MongoDB و TypeScript. يتبع المشروع معايير البرمجة الحديثة ويطبق نمط **Feature-based Architecture** مع **Separation of Concerns**.

## 🏗️ البنية المعمارية (Architecture Pattern)

### النمط الرئيسي: Feature-Based Modular Architecture

المشروع يتبع نمط **Feature-Based Architecture** حيث:

- كل ميزة (Feature) هي وحدة مستقلة تحتوي على جميع مكوناتها
- فصل واضح بين طبقات التطبيق (Layered Architecture)
- استخدام نمط Repository Pattern للتعامل مع قاعدة البيانات
- تطبيق Dependency Injection Pattern

### هيكل المجلدات الرئيسي

```
├── src/
│   ├── app.ts                 # نقطة الدخول الرئيسية
│   ├── config.ts              # إدارة الإعدادات والبيئة
│   ├── routes.ts              # تجميع جميع المسارات
│   ├── setup-database.ts      # إعداد الاتصال بقاعدة البيانات
│   ├── setup-server.ts        # إعداد الخادم والـ Middlewares
│   │
│   ├── features/              # الميزات (Features)
│   │   └── value/             # مثال على Feature
│   │       ├── controllers/   # التحكم في المنطق
│   │       ├── interfaces/    # الواجهات والأنواع
│   │       ├── models/        # نماذج قاعدة البيانات
│   │       ├── routes/        # مسارات الـ API
│   │       └── schema/        # مخططات التحقق من البيانات
│   │
│   └── shared/                # الموارد المشتركة
│       ├── global/            # الأدوات العامة
│       │   ├── decorators/    # الـ Decorators المخصصة
│       │   └── helpers/       # الدوال المساعدة
│       └── services/          # الخدمات المشتركة
│           ├── db/            # خدمات قاعدة البيانات
│           └── redis/         # خدمات التخزين المؤقت
```

## 🔧 التقنيات المستخدمة

### Core Dependencies

- **Node.js**: بيئة التشغيل
- **Express.js**: إطار عمل الويب
- **TypeScript**: لغة البرمجة
- **MongoDB + Mongoose**: قاعدة البيانات و ORM
- **Redis**: التخزين المؤقت
- **Socket.IO**: الاتصال في الوقت الفعلي

### Security & Validation

- **Helmet**: أمان Headers
- **CORS**: إدارة الطلبات عبر النطاقات
- **HPP**: الحماية من هجمات HTTP Parameter Pollution
- **Joi**: التحقق من صحة البيانات
- **JWT**: المصادقة
- **bcryptjs**: تشفير كلمات المرور

### Development Tools

- **ESLint**: فحص الكود
- **Prettier**: تنسيق الكود
- **Jest**: الاختبارات
- **Nodemon**: إعادة التشغيل التلقائي
- **Bunyan**: السجلات (Logging)
- **Morgan**: سجلات HTTP

### Additional Features

- **Bull**: إدارة الـ Queues
- **Cloudinary**: رفع وإدارة الملفات
- **Socket.IO Redis Adapter**: توزيع الـ Socket.IO
- **Swagger Stats**: مراقبة الـ API

## 📁 تفصيل الطبقات (Layers)

### 1. Application Layer (app.ts)

```typescript
class Application {
  public initialize(): void;
  private loadConfig(): void;
}
```

**المسؤولية**:

- نقطة الدخول الرئيسية
- تهيئة الإعدادات
- بدء الاتصال بقاعدة البيانات
- تشغيل الخادم

### 2. Configuration Layer (config.ts)

```typescript
class Config {
  public validateConfig(): void;
  public cloudinaryConfig(): void;
  public createLogger(name: string): bunyan;
}
```

**المسؤولية**:

- إدارة متغيرات البيئة
- التحقق من صحة الإعدادات
- إنشاء Loggers
- إعداد الخدمات الخارجية

### 3. Server Setup Layer (setup-server.ts)

```typescript
class SetupServer {
  public start(): void;
  private securityMiddleware(app: Application): void;
  private standardMiddleware(app: Application): void;
  private routesMiddleware(app: Application): void;
  private globalErrorHandler(app: Application): void;
  private createSocketIO(httpServer: http.Server): Promise<Server>;
}
```

**المسؤولية**:

- إعداد الـ Middlewares الأمنية
- إعداد الـ Middlewares القياسية
- تسجيل المسارات
- معالجة الأخطاء العامة
- إعداد Socket.IO

### 4. Database Layer (setup-database.ts)

```typescript
const connect = () => {
  mongoose.connect();
  redisConnection.connect();
};
```

**المسؤولية**:

- الاتصال بـ MongoDB
- الاتصال بـ Redis
- معالجة أخطاء الاتصال
- إعادة الاتصال التلقائي

### 5. Routes Layer (routes.ts)

```typescript
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, featureRoutes.routes());
  };
};
```

**المسؤولية**:

- تجميع جميع مسارات الـ Features
- تحديد الـ Base Path
- تنظيم الـ API Versioning

## 🎯 Feature Structure (Value Feature Example)

### 1. Controllers Layer

```typescript
// create-value.ts
export class Create {
  @joiValidation(addValueSchema)
  public async value(req: Request, res: Response): Promise<void>
}

// get-value.ts
export class GetValueController {
  public async getValues(req: Request, res: Response): Promise<void>
  public async getValueById(req: Request, res: Response): Promise<void>
}
```

**المسؤولية**:

- استقبال الطلبات HTTP
- التحقق من صحة البيانات
- استدعاء الخدمات
- إرجاع الاستجابات

### 2. Models Layer

```typescript
// value.schema.ts
const ValueSchema: Schema = new Schema({ value: { type: Number, required: true }, name: { type: String, required: true } }, { timestamps: true, versionKey: false });

const ValueModel: Model<IValue> = model<IValue>("Value", ValueSchema, "values");
```

**المسؤولية**:

- تعريف بنية البيانات في MongoDB
- تحديد أنواع الحقول
- إضافة Timestamps تلقائيًا

### 3. Interfaces Layer

```typescript
// value.interface.ts
export interface IValue extends Document {
  _id?: ObjectId | string;
  value: number;
  name: string;
}
```

**المسؤولية**:

- تعريف الواجهات TypeScript
- توفير Type Safety
- توثيق بنية البيانات

### 4. Schema Validation Layer

```typescript
// value.ts
export const addValueSchema: ObjectSchema = Joi.object({ value: Joi.number().required(), name: Joi.string().required() });
```

**المسؤولية**:

- التحقق من صحة البيانات الواردة
- تحديد قواعد التحقق
- إنشاء رسائل الأخطاء

### 5. Routes Layer

```typescript
// value.routes.ts
class ValueRoutes {
  public routes(): Router {
    this.router.get("/values", GetValueController.prototype.getValues);
    this.router.get("/values/:id", GetValueController.prototype.getValueById);
    this.router.post("/values", Create.prototype.value);
    return this.router;
  }
}
```

**المسؤولية**:

- تعريف نقاط النهاية (Endpoints)
- ربط المسارات بالـ Controllers
- تنظيم الـ HTTP Methods

### 6. Service Layer

```typescript
// value.service.ts
class ValueService {
  public async createValue(value: IValue): Promise<void>;
  public async getValues(): Promise<IValue[]>;
  public async getValueById(valueId: string): Promise<IValue>;
  public async updateValueById(valueId: string, value: IValue): Promise<void>;
  public async deleteValueById(valueId: string): Promise<void>;
}
```

**المسؤولية**:

- المنطق التجاري (Business Logic)
- التفاعل مع قاعدة البيانات
- عمليات CRUD
- معالجة البيانات

## 🔐 Shared Resources

### 1. Decorators

```typescript
// joi-validation.decorators.ts
export function joiValidation(schema: ObjectSchema): IJoiDecorator;
```

**الاستخدام**: التحقق التلقائي من البيانات باستخدام Decorators

### 2. Error Handler

```typescript
// error-handler.ts
export abstract class CustomError extends Error
export class JoiRequestValidationError extends CustomError
export class BadRequestError extends CustomError
export class NotFoundError extends CustomError
export class NotAuthorizedError extends CustomError
```

**الاستخدام**: معالجة موحدة للأخطاء

### 3. Helpers

```typescript
// helpers.ts
export class Helpers {
  static firstLetterUppercase(str: string): string;
  static lowerCase(str: string): string;
  static generateRandomIntegers(integerLength: number): number;
  static parseJson(prop: string): any;
  static isDataURL(value: string): boolean;
}
```

**الاستخدام**: دوال مساعدة عامة

### 4. Redis Cache

```typescript
// base.cache.ts
export abstract class BaseCache {
  client: RedisClient;
  log: Logger;
}

// redis.connection.ts
class RedisConnection extends BaseCache {
  async connect(): Promise<void>;
}
```

**الاستخدام**: إدارة التخزين المؤقت

## 🚀 كيفية الاستخدام

### 1. التثبيت

```bash
npm install
```

### 2. إعداد متغيرات البيئة

```env
SERVER_PORT=5000
DATABASE_URI=mongodb://localhost:27017/yourdb
JWT_TOKEN=your_jwt_secret
SECRET_KEY_ONE=secret1
SECRET_KEY_TWO=secret2
CLIENT_URL=http://localhost:3000
REDIS_HOST=redis://localhost:6379
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### 3. التشغيل في بيئة التطوير

```bash
npm run dev
```

### 4. البناء والإنتاج

```bash
npm run build
npm start
```

## 📝 إضافة Feature جديد

### الخطوات:

1. **إنشاء المجلد**:

```
src/features/new-feature/
├── controllers/
├── interfaces/
├── models/
├── routes/
└── schema/
```

2. **إنشاء Interface**:

```typescript
// interfaces/new-feature.interface.ts
export interface INewFeature extends Document {
  _id?: ObjectId | string;
  // ... properties
}
```

3. **إنشاء Model**:

```typescript
// models/new-feature.schema.ts
const NewFeatureSchema: Schema = new Schema(
  {
    // ... fields
  },
  { timestamps: true, versionKey: false },
);

export const NewFeatureModel: Model<INewFeature> = model<INewFeature>("NewFeature", NewFeatureSchema);
```

4. **إنشاء Validation Schema**:

```typescript
// schema/new-feature.ts
export const addNewFeatureSchema: ObjectSchema = Joi.object({
  // ... validation rules
});
```

5. **إنشاء Service**:

```typescript
// shared/services/db/new-feature.service.ts
class NewFeatureService {
  public async create(data: INewFeature): Promise<void> {}
  public async getAll(): Promise<INewFeature[]> {}
  // ... other methods
}

export const newFeatureService = new NewFeatureService();
```

6. **إنشاء Controllers**:

```typescript
// controllers/create-new-feature.ts
export class CreateNewFeature {
  @joiValidation(addNewFeatureSchema)
  public async create(req: Request, res: Response): Promise<void> {
    // implementation
  }
}
```

7. **إنشاء Routes**:

```typescript
// routes/new-feature.routes.ts
class NewFeatureRoutes {
  private router = Router();

  public routes(): Router {
    this.router.post("/new-feature", CreateNewFeature.prototype.create);
    // ... other routes
    return this.router;
  }
}

export const newFeatureRoutes = new NewFeatureRoutes();
```

8. **تسجيل Routes في routes.ts**:

```typescript
import { newFeatureRoutes } from "@new-feature/routes/new-feature.routes";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, newFeatureRoutes.routes());
  };
  routes();
};
```

## 🎨 Design Patterns المستخدمة

### 1. **Singleton Pattern**

- `Config class`
- `ValueService`
- `RedisConnection`

### 2. **Decorator Pattern**

- `@joiValidation` للتحقق من البيانات
- TypeScript Decorators

### 3. **Repository Pattern**

- Service Layer للتعامل مع قاعدة البيانات

### 4. **Factory Pattern**

- إنشاء Logger instances
- إنشاء Redis clients

### 5. **Middleware Pattern**

- Express middlewares
- Error handling

### 6. **Layered Architecture**

- Controller → Service → Model

## 🔒 الأمان (Security)

### Middlewares الأمنية المطبقة:

1. **Helmet**: حماية HTTP Headers
2. **CORS**: التحكم في الوصول عبر النطاقات
3. **HPP**: الحماية من Parameter Pollution
4. **Cookie Session**: إدارة الجلسات الآمنة
5. **Compression**: ضغط الاستجابات
6. **Rate Limiting**: (يمكن إضافته)

## 📊 Monitoring & Logging

### 1. Bunyan Logger

- سجلات منظمة بصيغة JSON
- مستويات مختلفة (debug, info, error)

### 2. Morgan

- سجلات HTTP requests

### 3. Swagger Stats

- مراقبة أداء الـ API
- متوفر على `/api-monitoring`

## 🧪 الاختبارات (Testing)

### إعداد Jest:

```typescript
// jest.config.ts
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  // ... configurations
};
```

### تشغيل الاختبارات:

```bash
npm test
```

## 🐳 Docker

### Dockerfile

```dockerfile
FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./src ./src
RUN npm install
RUN npm run build
CMD ["node", "build/src/app.js"]
```

## 📦 Scripts المتاحة

```json
{ "dev": "التشغيل في بيئة التطوير", "start": "التشغيل في بيئة الإنتاج", "build": "بناء المشروع", "lint:check": "فحص الكود", "lint:fix": "إصلاح مشاكل الكود", "prettier:check": "فحص التنسيق", "prettier:fix": "إصلاح التنسيق", "test": "تشغيل الاختبارات" }
```

## 🎯 Best Practices

1. ✅ استخدام TypeScript للـ Type Safety
2. ✅ فصل واضح بين الطبقات (Separation of Concerns)
3. ✅ استخدام Async/Await بدلاً من Callbacks
4. ✅ معالجة الأخطاء المركزية
5. ✅ التحقق من صحة البيانات
6. ✅ استخدام Environment Variables
7. ✅ Logging منظم
8. ✅ Code Documentation
9. ✅ استخدام ESLint و Prettier
10. ✅ Feature-based structure

## 🔄 تدفق البيانات (Data Flow)

```
Client Request
    ↓
Express Route
    ↓
Controller (Validation via Decorator)
    ↓
Service Layer (Business Logic)
    ↓
Model (Database Query)
    ↓
MongoDB/Redis
    ↓
Response back to Client
```

## 🌟 المميزات الرئيسية

1. ✨ بنية معيارية قابلة للتوسع
2. ✨ TypeScript Type Safety
3. ✨ Redis Caching
4. ✨ Socket.IO Real-time
5. ✨ JWT Authentication Ready
6. ✨ File Upload (Cloudinary)
7. ✨ Queue Management (Bull)
8. ✨ API Monitoring
9. ✨ Docker Support
10. ✨ Error Handling
11. ✨ Validation Layer
12. ✨ Security Middlewares

## 📚 الموارد الإضافية

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Socket.IO Documentation](https://socket.io/)
- [Redis Documentation](https://redis.io/)

---

## 👨‍💻 المساهمة

هذا القالب قابل للتوسع والتخصيص حسب احتياجات مشروعك.

## 📄 License

هذا المشروع متاح للاستخدام الحر.
