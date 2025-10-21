# 🏗️ معمارية التطبيق - Architecture Overview

## نظرة شاملة على النمط المعماري

هذا المستند يشرح بالتفصيل النمط المعماري المستخدم في المشروع والأسباب وراء كل قرار معماري.

---

## 📐 النمط المعماري الرئيسي

### Feature-Based Modular Architecture

**التعريف**: نمط معماري يقسم التطبيق إلى وحدات (Modules) مستقلة بناءً على الميزات (Features) بدلاً من الطبقات (Layers).

### لماذا هذا النمط؟

#### ✅ المزايا:

1. **سهولة الصيانة**: كل feature في مجلد واحد
2. **القابلية للتوسع**: إضافة features جديدة بسهولة
3. **إعادة الاستخدام**: Features مستقلة يمكن نقلها
4. **العمل الجماعي**: فرق مختلفة تعمل على features مختلفة
5. **الوضوح**: من السهل فهم بنية التطبيق

#### ⚠️ التحديات:

1. **Code Duplication**: قد يحدث تكرار بين Features
2. **Shared Resources**: إدارة الموارد المشتركة
3. **Dependencies**: إدارة التبعيات بين Features

#### 💡 الحل المطبق:

- مجلد `shared/` للموارد المشتركة
- استخدام Dependency Injection
- Path Aliases لسهولة الوصول

---

## 🎯 الطبقات المعمارية (Architectural Layers)

### 1. Presentation Layer (Controllers)

**المسؤولية**: التفاعل مع العالم الخارجي

```typescript
// مثال من المشروع
export class Create {
  @joiValidation(addValueSchema)
  public async value(req: Request, res: Response): Promise<void> {
    // 1. استقبال البيانات
    const { value, name } = req.body;

    // 2. تحويل البيانات
    const valueCreate: IValue = { name, value } as IValue;

    // 3. استدعاء Business Layer
    await valueService.createValue(valueCreate);

    // 4. إرجاع الاستجابة
    res.status(HTTP_STATUS.CREATED).json({ message: "Value created successfully" });
  }
}
```

**المبادئ**:

- ✅ لا تحتوي على منطق تجاري
- ✅ تتعامل فقط مع HTTP
- ✅ تحول البيانات للصيغة المطلوبة
- ✅ تستدعي Service Layer

### 2. Business Logic Layer (Services)

**المسؤولية**: المنطق التجاري

```typescript
// مثال من المشروع
class ValueService {
  public async createValue(value: IValue): Promise<void> {
    // المنطق التجاري (إن وجد)
    // مثل: التحقق من عدم وجود قيمة مكررة

    // حفظ في قاعدة البيانات
    await ValueModel.create(value);

    // يمكن إضافة: إرسال إشعار، تحديث cache، إلخ
  }

  public async getValues(): Promise<IValue[]> {
    // استخدام aggregation للأداء
    let values: IValue[];
    values = (await ValueModel.aggregate([{ $project: { _id: 1, value: 1, name: 1 } }])) as IValue[];

    return values;
  }
}
```

**المبادئ**:

- ✅ تحتوي على المنطق التجاري
- ✅ مستقلة عن HTTP
- ✅ يمكن اختبارها بسهولة
- ✅ تتعامل مع Data Layer

### 3. Data Access Layer (Models)

**المسؤولية**: التفاعل مع قاعدة البيانات

```typescript
// مثال من المشروع
const ValueSchema: Schema = new Schema(
  { value: { type: Number, required: true }, name: { type: String, required: true } },
  {
    timestamps: true, // إضافة createdAt & updatedAt تلقائياً
    versionKey: false, // إزالة __v
  },
);

const ValueModel: Model<IValue> = model<IValue>("Value", ValueSchema, "values");
```

**المبادئ**:

- ✅ تعريف بنية البيانات
- ✅ Validation على مستوى قاعدة البيانات
- ✅ Indexes للأداء
- ✅ Virtuals و Methods

---

## 🔄 تدفق البيانات (Data Flow)

### Request Flow (من العميل إلى قاعدة البيانات)

```
┌─────────────┐
│   Client    │ يرسل POST /api/v1/values
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Express Router     │ value.routes.ts
│  POST /values       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Middleware Chain           │
│  1. Body Parser             │
│  2. CORS                    │
│  3. Authentication (if any) │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Controller              │ create-value.ts
│  Create.value()          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  @joiValidation          │ Decorator
│  Validates req.body      │
└──────┬───────────────────┘
       │
       ▼ (if validation passes)
┌──────────────────────────┐
│  Service Layer           │ value.service.ts
│  valueService.create()   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Model Layer             │ value.schema.ts
│  ValueModel.create()     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  MongoDB                 │
│  Insert Document         │
└──────┬───────────────────┘
       │
       ▼ Response flows back
┌──────────────────────────┐
│  Client receives         │
│  201 Created             │
└──────────────────────────┘
```

### Error Flow (معالجة الأخطاء)

```
┌─────────────────┐
│  Any Layer      │ يحدث خطأ
└────────┬────────┘
         │
         ▼
┌────────────────────────────┐
│  throw CustomError         │ مثل JoiRequestValidationError
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Express Error Handler     │ في setup-server.ts
│  app.use((error, req, res) │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  CustomError.serialize()   │ تحويل إلى JSON
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Client receives           │
│  {message, status, code}   │
└────────────────────────────┘
```

---

## 🎨 Design Patterns

### 1. Singleton Pattern

**الاستخدام في المشروع**:

```typescript
// config.ts
export const config: Config = new Config(); // نسخة واحدة فقط

// value.service.ts
export const valueService: ValueService = new ValueService();

// redis.connection.ts
export const redisConnection: RedisConnection = new RedisConnection();
```

**الفائدة**:

- نسخة واحدة فقط في الذاكرة
- سهولة الوصول من أي مكان
- مشاركة الحالة (State)

### 2. Decorator Pattern

**الاستخدام في المشروع**:

```typescript
// joi-validation.decorators.ts
export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const { error } = await Promise.resolve(schema.validate(req.body));

      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// الاستخدام
export class Create {
  @joiValidation(addValueSchema) // تطبيق الـ decorator
  public async value(req: Request, res: Response): Promise<void> {
    // لا حاجة للتحقق هنا، الـ decorator يقوم بذلك
  }
}
```

**الفائدة**:

- فصل منطق التحقق عن المنطق الأساسي
- إعادة استخدام منطق التحقق
- كود أنظف وأقصر

### 3. Repository Pattern

**الاستخدام في المشروع**:

```typescript
// Service Layer يعمل كـ Repository
class ValueService {
  // جميع عمليات قاعدة البيانات هنا
  public async createValue(value: IValue): Promise<void>;
  public async getValues(): Promise<IValue[]>;
  public async getValueById(valueId: string): Promise<IValue>;
  public async updateValueById(valueId: string, value: IValue): Promise<void>;
  public async deleteValueById(valueId: string): Promise<void>;
}
```

**الفائدة**:

- فصل منطق قاعدة البيانات
- سهولة تغيير قاعدة البيانات
- سهولة الاختبار (Mocking)

### 4. Factory Pattern

**الاستخدام في المشروع**:

```typescript
// config.ts
public createLogger(name: string): bunyan {
  return bunyan.createLogger({ name, level: 'debug' });
}

// الاستخدام
const log: Logger = config.createLogger('Database');
```

**الفائدة**:

- إنشاء كائنات بطريقة موحدة
- إخفاء تفاصيل الإنشاء
- سهولة التغيير

### 5. Adapter Pattern

**الاستخدام في المشروع**:

```typescript
// setup-server.ts
const pubClient = createClient({ url: config.REDIS_HOST });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
io.adapter(createAdapter(pubClient, subClient)); // Adapter للـ Socket.IO
```

**الفائدة**:

- توزيع Socket.IO على سيرفرات متعددة
- استخدام Redis كوسيط

---

## 🔐 Security Architecture

### Defense in Depth (دفاع متعدد الطبقات)

```
┌─────────────────────────────────────┐
│  Layer 1: Network (Firewall, etc.)  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 2: Helmet (HTTP Headers)     │
│  - XSS Protection                   │
│  - Content Security Policy          │
│  - Frameguard                       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 3: CORS (Cross-Origin)       │
│  - Allowed Origins                  │
│  - Allowed Methods                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 4: HPP (Parameter Pollution) │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 5: Validation (Joi)          │
│  - Input Validation                 │
│  - Type Checking                    │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 6: Business Logic            │
│  - Authorization                    │
│  - Business Rules                   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Layer 7: Database (Mongoose)       │
│  - Schema Validation                │
│  - Sanitization                     │
└─────────────────────────────────────┘
```

### Security Middlewares في المشروع:

```typescript
// setup-server.ts
private securityMiddleware(app: Application): void {
  // 1. Session Management
  app.use(cookieSession({
    name: 'ERM-Session',
    keys: [config.SECRET_KEY_TWO!, config.SECRET_KEY_ONE!],
    maxAge: 24 * 7 * 3600000,
    httpOnly: true,      // منع الوصول من JavaScript
    secure: false,       // يجب أن يكون true في production مع HTTPS
  }));

  // 2. HTTP Parameter Pollution Protection
  app.use(hpp());

  // 3. Security Headers
  app.use(helmet());

  // 4. Cross-Origin Resource Sharing
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  }));
}
```

---

## 🚀 Performance Architecture

### 1. Caching Strategy (Redis)

```
┌──────────────────────────────────────────┐
│  Request for Data                        │
└────────────┬─────────────────────────────┘
             │
             ▼
        ┌─────────┐
        │ Cache?  │
        └────┬────┘
             │
      ┌──────┴──────┐
      │             │
     Yes           No
      │             │
      ▼             ▼
┌───────────┐  ┌──────────┐
│ Return    │  │ Query DB │
│ from      │  └────┬─────┘
│ Cache     │       │
└───────────┘       ▼
            ┌───────────────┐
            │ Store in Cache│
            └───────┬───────┘
                    │
                    ▼
            ┌───────────────┐
            │ Return Data   │
            └───────────────┘
```

**التطبيق**:

```typescript
// base.cache.ts - Base class لجميع Cache operations
export abstract class BaseCache {
  client: RedisClient;
  log: Logger;

  constructor(cacheName: string) {
    this.client = createClient({ url: config.REDIS_HOST });
    this.log = config.createLogger(cacheName);
    this.cacheError();
  }

  private cacheError(): void {
    this.client.on("error", (error: unknown) => {
      this.log.error(error);
    });
  }
}
```

### 2. Database Optimization

**استخدام Aggregation للأداء**:

```typescript
// بدلاً من
const values = await ValueModel.find();

// نستخدم
const values = await ValueModel.aggregate([{ $project: { _id: 1, value: 1, name: 1 } }]);
```

**الفوائد**:

- أسرع في الأداء
- معالجة البيانات في قاعدة البيانات
- تقليل استخدام الذاكرة

### 3. Compression

```typescript
// setup-server.ts
app.use(compression()); // ضغط الاستجابات
```

**الفائدة**:

- تقليل حجم البيانات المرسلة
- سرعة أكبر للمستخدم
- توفير bandwidth

---

## 📊 Scalability Architecture

### Horizontal Scaling مع Socket.IO

```
┌──────────────┐     ┌──────────────┐
│  Server 1    │     │  Server 2    │
│  Socket.IO   │     │  Socket.IO   │
└──────┬───────┘     └──────┬───────┘
       │                     │
       └──────────┬──────────┘
                  │
                  ▼
           ┌──────────────┐
           │    Redis     │
           │   Adapter    │
           └──────────────┘
```

**التطبيق**:

```typescript
// setup-server.ts
private async createSocketIO(httpServer: http.Server): Promise<Server> {
  const io: Server = new Server(httpServer, {
    cors: {
      origin: config.CLIENT_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  // استخدام Redis Adapter للتوزيع
  const pubClient = createClient({ url: config.REDIS_HOST });
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  return io;
}
```

**الفائدة**:

- إمكانية تشغيل عدة سيرفرات
- توزيع الحمل (Load Balancing)
- High Availability

---

## 🧪 Testing Architecture

### Unit Testing Strategy

```
┌─────────────────────────────────────┐
│  Test Structure                     │
├─────────────────────────────────────┤
│  Unit Tests                         │
│  ├── Controllers                    │
│  ├── Services                       │
│  └── Helpers                        │
├─────────────────────────────────────┤
│  Integration Tests                  │
│  ├── API Endpoints                  │
│  ├── Database Operations            │
│  └── Cache Operations               │
├─────────────────────────────────────┤
│  E2E Tests                          │
│  └── Full User Flows                │
└─────────────────────────────────────┘
```

**مثال على Unit Test**:

```typescript
// value.service.spec.ts
describe("ValueService", () => {
  describe("createValue", () => {
    it("should create a value successfully", async () => {
      const mockValue: IValue = { name: "test", value: 100 };

      const result = await valueService.createValue(mockValue);

      expect(result).toBeDefined();
    });
  });
});
```

---

## 🔍 Monitoring & Logging Architecture

### Logging Levels

```
┌─────────────────────────────────────┐
│  DEBUG   │ Development details      │
├──────────┴──────────────────────────┤
│  INFO    │ General information      │
├──────────┴──────────────────────────┤
│  WARN    │ Warning messages         │
├──────────┴──────────────────────────┤
│  ERROR   │ Error messages           │
├──────────┴──────────────────────────┤
│  FATAL   │ Critical errors          │
└─────────────────────────────────────┘
```

**التطبيق**:

```typescript
// config.ts
public createLogger(name: string): bunyan {
  return bunyan.createLogger({
    name,
    level: 'debug' // يتغير حسب البيئة
  });
}

// الاستخدام
const log: Logger = config.createLogger('ValueService');
log.info('Value created successfully');
log.error('Error creating value:', error);
```

### API Monitoring

```typescript
// setup-server.ts
private apiMonitoring(app: Application): void {
  app.use(apiStats.getMiddleware({
    uriPath: '/api-monitoring',
  }));
}
```

**يوفر**:

- Request/Response metrics
- Error rates
- Performance metrics
- API usage statistics

---

## 🎯 Best Practices المطبقة

### 1. SOLID Principles

**Single Responsibility**:

- كل Controller مسؤول عن عملية واحدة
- كل Service مسؤول عن feature واحد

**Open/Closed**:

- BaseCache يمكن توسيعه بدون تعديل

**Liskov Substitution**:

- CustomError classes يمكن استبدالها

**Interface Segregation**:

- Interfaces صغيرة ومحددة

**Dependency Inversion**:

- Controllers تعتمد على abstraction (Service Interface)

### 2. DRY (Don't Repeat Yourself)

- Shared resources في مجلد واحد
- Decorators لتجنب تكرار الكود
- Base classes (BaseCache)

### 3. Separation of Concerns

- طبقات منفصلة
- Features منفصلة
- Shared resources منفصلة

### 4. Type Safety

- استخدام TypeScript
- Interfaces لجميع البيانات
- Strict mode enabled

---

## 📝 خلاصة المعمارية

### النقاط الرئيسية:

1. ✅ **Modular**: كل feature مستقل
2. ✅ **Scalable**: سهل التوسع
3. ✅ **Maintainable**: سهل الصيانة
4. ✅ **Testable**: سهل الاختبار
5. ✅ **Secure**: أمان متعدد الطبقات
6. ✅ **Performant**: تحسينات للأداء
7. ✅ **Type-Safe**: TypeScript
8. ✅ **Well-Documented**: توثيق شامل

### القرارات المعمارية الرئيسية:

1. **Feature-Based** بدلاً من Layer-Based
2. **TypeScript** للـ Type Safety
3. **Mongoose** للـ MongoDB
4. **Redis** للـ Caching و Session
5. **Socket.IO** للـ Real-time
6. **Joi** للـ Validation
7. **Bunyan** للـ Logging
8. **Express** للسهولة والمرونة

---

هذه المعمارية توفر أساساً قوياً لبناء تطبيقات قابلة للتوسع والصيانة.
