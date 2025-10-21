# 🤖 AI Prompt للمساعدة في إنشاء هيكلية مماثلة

استخدم هذا البرومبت مع أي نموذج ذكاء اصطناعي (ChatGPT, Claude, Gemini, إلخ) لإنشاء هيكلية مماثلة لمشروعك:

---

## البرومبت الكامل:

```
أريد منك إنشاء هيكلية مشروع Node.js مع Express و MongoDB و TypeScript باستخدام النمط المعماري التالي:

### المتطلبات الأساسية:

1. **النمط المعماري**: Feature-Based Modular Architecture
   - كل ميزة (Feature) تكون في مجلد منفصل
   - فصل واضح بين الطبقات (Layered Architecture)
   - استخدام Repository Pattern

2. **التقنيات الأساسية**:
   - Node.js مع TypeScript
   - Express.js كإطار عمل
   - MongoDB مع Mongoose
   - Redis للتخزين المؤقت
   - Socket.IO للاتصال في الوقت الفعلي
   - JWT للمصادقة

3. **هيكلية المجلدات الرئيسية**:
```

src/
├── app.ts # نقطة الدخول
├── config.ts # إدارة الإعدادات
├── routes.ts # تجميع المسارات
├── setup-database.ts # إعداد قاعدة البيانات
├── setup-server.ts # إعداد الخادم
├── features/ # الميزات
│ └── [feature-name]/
│ ├── controllers/ # المتحكمات
│ ├── interfaces/ # الواجهات TypeScript
│ ├── models/ # نماذج Mongoose
│ ├── routes/ # مسارات API
│ └── schema/ # التحقق من البيانات (Joi)
└── shared/ # الموارد المشتركة
├── global/
│ ├── decorators/ # Decorators مخصصة
│ └── helpers/ # دوال مساعدة
└── services/
├── db/ # خدمات قاعدة البيانات
└── redis/ # خدمات Redis

````

4. **طبقات كل Feature**:

**Controllers Layer**:
- استقبال طلبات HTTP
- التحقق من البيانات باستخدام Decorator
- استدعاء Services
- إرجاع الاستجابات
- مثال:
```typescript
export class Create {
  @joiValidation(schema)
  public async create(req: Request, res: Response): Promise<void> {
    const data = req.body;
    await service.create(data);
    res.status(201).json({ message: 'Created successfully' });
  }
}
````

**Models Layer**:

- تعريف Schema في Mongoose
- تحديد أنواع البيانات
- إضافة Timestamps
- مثال:

```typescript
const Schema = new Schema({ field1: { type: String, required: true }, field2: { type: Number, required: true } }, { timestamps: true, versionKey: false });

export const Model = model<IInterface>("ModelName", Schema);
```

**Interfaces Layer**:

- تعريف TypeScript Interfaces
- توفير Type Safety
- مثال:

```typescript
export interface IInterface extends Document {
  _id?: ObjectId | string;
  field1: string;
  field2: number;
}
```

**Schema Validation Layer**:

- استخدام Joi للتحقق
- مثال:

```typescript
export const schema: ObjectSchema = Joi.object({ field1: Joi.string().required(), field2: Joi.number().required() });
```

**Routes Layer**:

- تعريف نقاط النهاية
- ربط المسارات بالـ Controllers
- مثال:

```typescript
class Routes {
  private router = Router();

  public routes(): Router {
    this.router.get("/", Controller.prototype.getAll);
    this.router.post("/", Controller.prototype.create);
    return this.router;
  }
}
```

**Service Layer**:

- المنطق التجاري
- التفاعل مع قاعدة البيانات
- عمليات CRUD
- مثال:

```typescript
class Service {
  public async create(data: IInterface): Promise<void> {
    await Model.create(data);
  }

  public async getAll(): Promise<IInterface[]> {
    return await Model.find();
  }
}

export const service = new Service();
```

5. **الملفات الأساسية**:

**app.ts**:

- نقطة الدخول الرئيسية
- تهيئة Config
- الاتصال بقاعدة البيانات
- بدء الخادم

**config.ts**:

- إدارة متغيرات البيئة
- التحقق من الإعدادات
- إنشاء Loggers (Bunyan)
- إعداد Cloudinary

**setup-server.ts**:

- Security Middlewares (Helmet, CORS, HPP)
- Standard Middlewares (Compression, JSON, URL-encoded)
- Routes Registration
- Global Error Handler
- Socket.IO Setup مع Redis Adapter

**setup-database.ts**:

- الاتصال بـ MongoDB
- الاتصال بـ Redis
- معالجة أخطاء الاتصال
- إعادة الاتصال التلقائي

6. **Shared Resources**:

**Decorators**:

- Joi Validation Decorator للتحقق التلقائي

**Error Handler**:

- CustomError Class
- JoiRequestValidationError
- BadRequestError
- NotFoundError
- NotAuthorizedError

**Helpers**:

- دوال مساعدة عامة (firstLetterUppercase, parseJson, إلخ)

**Redis Cache**:

- BaseCache abstract class
- RedisConnection class

7. **Dependencies المطلوبة**:

```json
{ "dependencies": { "express": "^4.21.1", "mongoose": "^8.8.1", "redis": "^4.7.0", "socket.io": "^4.8.1", "@socket.io/redis-adapter": "^8.3.0", "typescript": "^5.6.3", "dotenv": "^16.4.5", "joi": "^17.13.3", "helmet": "^8.0.0", "cors": "^2.8.5", "hpp": "^0.2.3", "compression": "^1.7.5", "cookie-session": "^2.1.0", "bunyan": "^1.8.15", "morgan": "^1.10.0", "http-status-codes": "^2.3.0", "jsonwebtoken": "^9.0.2", "bcryptjs": "^2.4.3", "cloudinary": "^2.5.1", "bull": "^4.16.4", "express-async-errors": "^3.1.1" }, "devDependencies": { "@types/express": "^5.0.0", "@types/node": "latest", "@types/bunyan": "^1.8.11", "@types/cors": "^2.8.17", "@types/compression": "^1.7.5", "ts-node": "^10.9.2", "nodemon": "^3.1.7", "eslint": "^9.14.0", "prettier": "^3.3.3", "jest": "^29.7.0", "ts-jest": "^29.2.5" } }
```

8. **TypeScript Configuration**:

```json
{ "compilerOptions": { "target": "es2015", "module": "commonjs", "outDir": "./build", "rootDir": ".", "strict": true, "esModuleInterop": true, "experimentalDecorators": true, "emitDecoratorMetadata": true, "moduleResolution": "node", "baseUrl": ".", "paths": { "@feature/*": ["src/features/feature/*"], "@globals/*": ["src/shared/global/*"], "@service/*": ["src/shared/services/*"], "@root/*": ["src/*"] } } }
```

9. **Scripts في package.json**:

```json
{ "scripts": { "dev": "nodemon -r tsconfig-paths/register src/app.ts | bunyan", "start": "node build/src/app.js", "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json", "lint:check": "eslint 'src/**/*.ts'", "lint:fix": "eslint 'src/**/*.ts' --fix", "prettier:check": "prettier --check 'src/**/*.{ts,json}'", "prettier:fix": "prettier --write 'src/**/*.{ts,json}'", "test": "jest --coverage=true -w=1 --forceExit --detectOpenHandles" } }
```

10. **Design Patterns المطبقة**:

- Singleton Pattern (Config, Services)
- Decorator Pattern (Validation)
- Repository Pattern (Service Layer)
- Factory Pattern (Logger, Redis clients)
- Middleware Pattern (Express)
- Layered Architecture

11. **Security Best Practices**:

- استخدام Helmet للحماية
- CORS Configuration
- HPP للحماية من Parameter Pollution
- Cookie Session آمن
- JWT للمصادقة
- التحقق من جميع المدخلات

12. **تدفق البيانات**:

```
Client Request → Express Route → Controller (Validation) →
Service Layer → Model → Database → Response
```

### المطلوب:

قم بإنشاء هيكلية كاملة لمشروع باستخدام هذا النمط مع feature واحد كمثال (مثل: User, Product, أو أي feature تراه مناسباً).

يجب أن تشمل:

1. جميع الملفات الأساسية (app.ts, config.ts, setup-server.ts, إلخ)
2. Feature كامل بجميع طبقاته
3. Shared resources (decorators, error handler, helpers)
4. Redis setup
5. Socket.IO setup
6. Configuration files (package.json, tsconfig.json)
7. Dockerfile (optional)
8. .env.example

قم بكتابة الكود الكامل لكل ملف مع التعليقات التوضيحية.

```

---

## 📝 ملاحظات للاستخدام:

### 1. تخصيص البرومبت:
يمكنك تعديل البرومبت حسب احتياجاتك:

```

# لإضافة feature معين:

"أريد Feature للمستخدمين (Users) مع نظام المصادقة والتسجيل"

# لإضافة وظائف معينة:

"أضف دعم لـ File Upload مع Cloudinary"
"أضف Queue System باستخدام Bull"

# لتغيير قاعدة البيانات:

"استخدم PostgreSQL بدلاً من MongoDB مع TypeORM"

```

### 2. برومبت مختصر (للاستخدام السريع):

```

أنشئ لي مشروع Node.js + Express + MongoDB + TypeScript باستخدام:

- Feature-Based Architecture
- طبقات: Controllers, Services, Models, Routes, Interfaces, Schema
- Shared: Decorators, Helpers, Error Handler
- Redis + Socket.IO
- Validation مع Joi Decorators
- Security Middlewares
- TypeScript Path Aliases

مع feature واحد كمثال (User أو Product)

```

### 3. برومبت لإضافة Feature جديد:

```

لدي مشروع Node.js يتبع Feature-Based Architecture.

أريد إضافة Feature جديد باسم [FEATURE_NAME] مع الخصائص التالية:
[قائمة بالخصائص]

يجب أن يحتوي على:

1. Interface
2. Mongoose Model
3. Joi Validation Schema
4. Service مع CRUD operations
5. Controllers (Create, Get, Update, Delete)
6. Routes

الرجاء إنشاء جميع الملفات بالكود الكامل.

```

### 4. برومبت لإضافة وظيفة معينة:

```

لدي مشروع Express + TypeScript.

أريد إضافة [FEATURE_NAME] مثل:

- Email Service مع SendGrid
- File Upload مع Cloudinary
- Queue System مع Bull
- Authentication مع JWT
- Rate Limiting
- API Documentation مع Swagger

الرجاء إنشاء الملفات المطلوبة مع Integration في المشروع.

```

### 5. برومبت لتحويل مشروع موجود:

```

لدي مشروع Express موجود بهيكلية تقليدية.

أريد تحويله إلى Feature-Based Architecture حسب النمط التالي:
[نسخ الهيكلية من أعلى]

هذه هي الملفات الحالية:
[قائمة الملفات]

ساعدني في إعادة هيكلة المشروع.

```

---

## 🎯 أمثلة للاستخدام مع نماذج AI مختلفة:

### مع ChatGPT:
```

استخدم البرومبت الكامل أعلاه، ثم اطلب:
"ابدأ بإنشاء الملفات الأساسية أولاً"
"الآن أنشئ Feature للمستخدمين"
"أضف الآن Shared Resources"

```

### مع Claude:
```

استخدم البرومبت الكامل، ثم:
"قم بإنشاء المشروع على مراحل"
"اشرح كل ملف وأنت تنشئه"

```

### مع GitHub Copilot:
```

ضع البرومبت في تعليق في ملف فارغ:
/_
[البرومبت الكامل]
_/

ثم اطلب من Copilot إنشاء الملفات

```

---

## 🔧 نصائح إضافية:

### 1. للحصول على نتائج أفضل:
- كن محددًا في المتطلبات
- اطلب شرح الكود إذا لزم الأمر
- اطلب Best Practices
- اطلب Error Handling

### 2. للمشاريع الكبيرة:
- قسم البرومبت إلى أجزاء
- ابدأ بالهيكل الأساسي
- أضف Features واحدة تلو الأخرى

### 3. للتخصيص:
- أضف متطلباتك الخاصة
- حدد التقنيات المفضلة
- اذكر أي قيود أو معايير

---

## 📚 موارد إضافية:

بعد إنشاء المشروع، يمكنك طلب:
```

"أنشئ لي README.md شامل للمشروع"
"أنشئ ملف .env.example"
"أنشئ docker-compose.yml"
"أنشئ اختبارات Jest للـ Feature"
"أنشئ API Documentation"

```

---

## ✅ Checklist للتحقق:

بعد إنشاء المشروع، تأكد من:
- [ ] جميع الملفات الأساسية موجودة
- [ ] TypeScript paths تعمل بشكل صحيح
- [ ] Dependencies مثبتة
- [ ] Environment Variables معرفة
- [ ] Database Connection تعمل
- [ ] Redis Connection تعمل
- [ ] Validation تعمل
- [ ] Error Handling موجود
- [ ] Security Middlewares مفعلة
- [ ] Logging يعمل

---

**ملاحظة**: هذا البرومبت مصمم ليكون شاملاً ومرناً. يمكنك تعديله وتخصيصه حسب احتياجات مشروعك المحدد.
```
