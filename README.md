# 📦 Node.js Express MongoDB TypeScript Template

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

قالب احترافي لبناء تطبيقات Backend قابلة للتوسع باستخدام Node.js و Express و MongoDB و TypeScript

[الميزات](#-الميزات) • [البدء السريع](#-البدء-السريع) • [التوثيق](#-التوثيق) • [البنية](#-البنية-المعمارية) • [المساهمة](#-المساهمة)

</div>

---

## 📋 نظرة عامة

هذا القالب يوفر بنية قوية وقابلة للتوسع لبناء تطبيقات Backend باستخدام أحدث التقنيات والممارسات. يتبع المشروع **Feature-Based Architecture** مع فصل واضح بين الطبقات، مما يجعله مثالياً للمشاريع من جميع الأحجام.

## ✨ الميزات

### 🏗️ البنية المعمارية

- ✅ **Feature-Based Modular Architecture** - كل ميزة في مجلد منفصل
- ✅ **Layered Architecture** - فصل واضح بين الطبقات (Controller → Service → Model)
- ✅ **TypeScript** - Type safety كامل
- ✅ **Path Aliases** - استيراد نظيف وسهل القراءة

### 🔐 الأمان

- ✅ **Helmet** - حماية HTTP Headers
- ✅ **CORS** - إدارة الطلبات عبر النطاقات
- ✅ **HPP** - الحماية من HTTP Parameter Pollution
- ✅ **Cookie Session** - إدارة جلسات آمنة
- ✅ **JWT Ready** - جاهز للمصادقة
- ✅ **Joi Validation** - التحقق من صحة البيانات مع Decorators

### ⚡ الأداء

- ✅ **Redis Caching** - تخزين مؤقت للبيانات
- ✅ **Compression** - ضغط الاستجابات
- ✅ **MongoDB Aggregation** - استعلامات محسنة
- ✅ **Connection Pooling** - إدارة اتصالات فعالة

### 🔄 Real-time

- ✅ **Socket.IO** - اتصالات في الوقت الفعلي
- ✅ **Redis Adapter** - توزيع Socket.IO على سيرفرات متعددة

### 📊 المراقبة والسجلات

- ✅ **Bunyan Logger** - سجلات منظمة بصيغة JSON
- ✅ **Morgan** - سجلات HTTP
- ✅ **Swagger Stats** - مراقبة أداء API
- ✅ **Error Tracking** - معالجة موحدة للأخطاء

### 🧪 الاختبارات والجودة

- ✅ **Jest** - إطار عمل للاختبارات
- ✅ **ESLint** - فحص جودة الكود
- ✅ **Prettier** - تنسيق تلقائي للكود
- ✅ **TypeScript Strict Mode** - فحص صارم للأنواع

### 🚀 DevOps

- ✅ **Docker Support** - دعم كامل لـ Docker
- ✅ **Hot Reload** - إعادة تشغيل تلقائي في التطوير
- ✅ **Production Ready** - جاهز للإنتاج

### 📦 إضافات

- ✅ **Bull Queues** - إدارة المهام الخلفية
- ✅ **Cloudinary** - رفع وإدارة الملفات
- ✅ **Email Service** - إرسال البريد الإلكتروني
- ✅ **Bcrypt** - تشفير كلمات المرور

---

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js >= 18.x
- MongoDB >= 6.x
- Redis >= 7.x
- npm أو yarn

### التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd node-express-mongo-template

# 2. تثبيت Dependencies
npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env
# عدّل ملف .env حسب احتياجاتك

# 4. تشغيل قواعد البيانات (باستخدام Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest
docker run -d -p 6379:6379 --name redis redis:latest

# 5. تشغيل التطبيق
npm run dev
```

### التحقق من التشغيل

```bash
# اختبار API
curl http://localhost:5000/api/v1/values

# فتح API Monitoring
# افتح http://localhost:5000/api-monitoring في المتصفح
```

---

## 📁 هيكل المشروع

```
src/
├── app.ts                     # نقطة الدخول الرئيسية
├── config.ts                  # إدارة الإعدادات والبيئة
├── routes.ts                  # تجميع جميع المسارات
├── setup-database.ts          # إعداد الاتصال بقواعد البيانات
├── setup-server.ts            # إعداد الخادم والـ Middlewares
│
├── features/                  # الميزات (Features)
│   └── value/                 # مثال على Feature
│       ├── controllers/       # المتحكمات (Presentation Layer)
│       │   ├── create-value.ts
│       │   └── get-value.ts
│       ├── interfaces/        # الواجهات TypeScript
│       │   └── value.interface.ts
│       ├── models/            # نماذج قاعدة البيانات (Data Layer)
│       │   └── value.schema.ts
│       ├── routes/            # مسارات API
│       │   └── value.routes.ts
│       └── schema/            # مخططات التحقق (Joi Validation)
│           └── value.ts
│
└── shared/                    # الموارد المشتركة
    ├── global/                # الأدوات العامة
    │   ├── decorators/        # Decorators مخصصة
    │   │   └── joi-validation.decorators.ts
    │   └── helpers/           # الدوال المساعدة
    │       ├── error-handler.ts
    │       └── helpers.ts
    └── services/              # الخدمات المشتركة
        ├── db/                # خدمات قاعدة البيانات
        │   └── value.service.ts
        └── redis/             # خدمات Redis
            ├── base.cache.ts
            └── redis.connection.ts
```

---

## 🎯 إنشاء Feature جديد

### مثال سريع: إنشاء feature للمستخدمين

```bash
# 1. إنشاء الهيكل
mkdir -p src/features/user/{controllers,interfaces,models,routes,schema}

# 2. اتبع الدليل الكامل في:
# QUICK_START.md - دليل خطوة بخطوة
```

### الخطوات الأساسية:

1. **Interface** - تعريف الواجهة TypeScript
2. **Model** - تعريف Mongoose Schema
3. **Validation Schema** - تعريف قواعد Joi
4. **Service** - المنطق التجاري وعمليات قاعدة البيانات
5. **Controllers** - معالجة طلبات HTTP
6. **Routes** - تعريف نقاط النهاية
7. **Registration** - تسجيل Routes في `routes.ts`
8. **Path Alias** - إضافة في `tsconfig.json`

**مثال كامل متوفر في**: [QUICK_START.md](./QUICK_START.md)

---

## 📚 التوثيق

### 📖 الدلائل المتوفرة

| الملف                                            | الوصف                                   |
| ------------------------------------------------ | --------------------------------------- |
| [DOCUMENTATION.md](./DOCUMENTATION.md)           | التوثيق الشامل للمشروع                  |
| [ARCHITECTURE.md](./ARCHITECTURE.md)             | شرح مفصل للمعمارية والأنماط المستخدمة   |
| [QUICK_START.md](./QUICK_START.md)               | دليل البدء السريع مع أمثلة عملية        |
| [AI_PROMPT_TEMPLATE.md](./AI_PROMPT_TEMPLATE.md) | برومبت لإنشاء مشاريع مماثلة باستخدام AI |

### 🔍 محتويات التوثيق

#### DOCUMENTATION.md

- نظرة عامة على التطبيق
- التقنيات المستخدمة بالتفصيل
- شرح كل طبقة وملف
- Best Practices المطبقة
- كيفية إضافة Features جديدة

#### ARCHITECTURE.md

- النمط المعماري المستخدم
- تدفق البيانات (Data Flow)
- Design Patterns المطبقة
- Security Architecture
- Performance Optimization
- Scalability Strategy

#### QUICK_START.md

- خطوات التثبيت والتشغيل
- إنشاء Feature كامل خطوة بخطوة
- أمثلة عملية (Auth, Upload, Email)
- استكشاف الأخطاء
- Docker Usage

#### AI_PROMPT_TEMPLATE.md

- برومبت كامل لنماذج AI
- أمثلة للاستخدام
- تخصيص البرومبت
- نصائح للحصول على نتائج أفضل

---

## 🏗️ البنية المعمارية

### Feature-Based Modular Architecture

```
Feature (مثل: User, Product)
├── Presentation Layer (Controllers)
│   └── يستقبل HTTP Requests
│   └── يتحقق من البيانات (Decorators)
│   └── يستدعي Business Layer
│
├── Business Logic Layer (Services)
│   └── المنطق التجاري
│   └── معالجة البيانات
│   └── يتعامل مع Data Layer
│
└── Data Access Layer (Models)
    └── تعريف Schema
    └── التفاعل مع قاعدة البيانات
```

### تدفق البيانات

```
Client → Routes → Controller → Validation Decorator → Service → Model → Database
```

**المزيد**: راجع [ARCHITECTURE.md](./ARCHITECTURE.md) للتفاصيل الكاملة

---

## 🛠️ Scripts المتاحة

```bash
# Development
npm run dev              # تشغيل مع hot reload

# Production
npm run build            # بناء المشروع
npm start                # تشغيل النسخة المبنية

# Code Quality
npm run lint:check       # فحص الكود
npm run lint:fix         # إصلاح مشاكل الكود
npm run prettier:check   # فحص التنسيق
npm run prettier:fix     # إصلاح التنسيق

# Testing
npm test                 # تشغيل الاختبارات
```

---

## 🔧 التكوين

### متغيرات البيئة الأساسية

```env
# Server
SERVER_PORT=5000
NODE_ENV=development

# Database
DATABASE_URI=mongodb://localhost:27017/yourdb

# Security
JWT_TOKEN=your_secret_key
SECRET_KEY_ONE=secret1
SECRET_KEY_TWO=secret2

# Redis
REDIS_HOST=redis://localhost:6379

# Client
CLIENT_URL=http://localhost:3000
```

**ملف كامل**: راجع `.env.example`

---

## 🐳 Docker

### استخدام Docker Compose

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
```

```bash
# تشغيل
docker-compose up -d

# إيقاف
docker-compose down
```

---

## 📊 API Endpoints

### Value Feature (مثال)

| Method | Endpoint             | الوصف                 |
| ------ | -------------------- | --------------------- |
| GET    | `/api/v1/values`     | الحصول على جميع القيم |
| GET    | `/api/v1/values/:id` | الحصول على قيمة محددة |
| POST   | `/api/v1/values`     | إنشاء قيمة جديدة      |

### مثال على Request

```bash
# Create Value
curl -X POST http://localhost:5000/api/v1/values \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test",
    "value": 100
  }'

# Response
{
  "message": "Value created successfully"
}
```

---

## 🧪 الاختبارات

```typescript
// مثال على Unit Test
describe("ValueService", () => {
  describe("createValue", () => {
    it("should create a value successfully", async () => {
      const mockValue = { name: "test", value: 100 };

      const result = await valueService.createValue(mockValue);
      expect(result).toBeDefined();
    });
  });
});
```

```bash
# تشغيل الاختبارات
npm test

# مع coverage
npm test -- --coverage
```

---

## 🎨 Design Patterns

هذا المشروع يطبق عدة Design Patterns:

- **Singleton Pattern** - Config, Services, Redis Connection
- **Decorator Pattern** - Joi Validation
- **Repository Pattern** - Service Layer
- **Factory Pattern** - Logger Creation
- **Adapter Pattern** - Socket.IO Redis Adapter

**التفاصيل**: [ARCHITECTURE.md](./ARCHITECTURE.md#-design-patterns)

---

## 🔐 الأمان

### Middlewares الأمنية المطبقة:

- ✅ Helmet - حماية HTTP headers
- ✅ CORS - التحكم في الوصول
- ✅ HPP - الحماية من Parameter Pollution
- ✅ Cookie Session - جلسات آمنة
- ✅ Joi Validation - التحقق من المدخلات

### Best Practices:

- ✅ تشفير كلمات المرور (bcrypt)
- ✅ JWT للمصادقة
- ✅ Environment Variables للمفاتيح السرية
- ✅ معالجة الأخطاء المركزية
- ✅ Validation على جميع المدخلات

---

## 📈 الأداء

### تحسينات مطبقة:

- ✅ Redis Caching
- ✅ MongoDB Aggregation
- ✅ Response Compression
- ✅ Connection Pooling
- ✅ Async/Await
- ✅ Error Handling بدون blocking

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:

1. Fork المشروع
2. إنشاء Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 🤖 استخدام مع AI

هل تريد إنشاء مشروع مماثل؟ استخدم البرومبت الموجود في [AI_PROMPT_TEMPLATE.md](./AI_PROMPT_TEMPLATE.md) مع أي نموذج AI (ChatGPT, Claude, Gemini) لإنشاء هيكلية مماثلة بسرعة!

---

## 📝 الترخيص

هذا المشروع متاح للاستخدام الحر.

---

## 👨‍💻 المطور

تم تطويره بواسطة SaadAlsaree

---

## 🌟 دعم المشروع

إذا أعجبك هذا المشروع:

- ⭐ أعطه نجمة على GitHub
- 📢 شاركه مع الآخرين
- 🐛 أبلغ عن المشاكل
- 💡 اقترح تحسينات

---

<div align="center">

**صُنع بـ ❤️ للمطورين العرب**

[التوثيق](./DOCUMENTATION.md) • [المعمارية](./ARCHITECTURE.md) • [البدء السريع](./QUICK_START.md) • [AI Prompt](./AI_PROMPT_TEMPLATE.md)

</div>
