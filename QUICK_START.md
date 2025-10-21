# 🚀 دليل الاستخدام السريع - Quick Start Guide

## 📚 نظرة عامة

هذا الدليل يساعدك على البدء بسرعة في استخدام وتطوير مشاريع جديدة باستخدام هذا القالب.

---

## 🎯 خطوات البدء السريع

### 1️⃣ استنساخ المشروع

```bash
# استنساخ المشروع
git clone <repository-url>
cd node-express-mongo-template

# أو استخدام هذا القالب
# انقر على "Use this template" في GitHub
```

### 2️⃣ تثبيت المتطلبات

```bash
# تثبيت Node.js dependencies
npm install

# أو باستخدام yarn
yarn install
```

### 3️⃣ إعداد متغيرات البيئة

```bash
# إنشاء ملف .env
cp .env.example .env

# تعديل الملف
# أو يدوياً:
```

```env
# Server Configuration
SERVER_PORT=5000
NODE_ENV=development

# Database
DATABASE_URI=mongodb://localhost:27017/yourapp

# Security
JWT_TOKEN=your_jwt_secret_key_here
SECRET_KEY_ONE=your_secret_key_one_here
SECRET_KEY_TWO=your_secret_key_two_here

# Client
CLIENT_URL=http://localhost:3000

# Redis
REDIS_HOST=redis://localhost:6379

# Cloudinary (Optional)
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (Optional)
SENDER_EMAIL=your_email@example.com
SENDER_EMAIL_PASSWORD=your_email_password
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_SENDER=your_sender_email@example.com

# JWT
JWT_EXPIRE=7d
```

### 4️⃣ تشغيل قواعد البيانات

#### MongoDB:

```bash
# باستخدام Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# أو تثبيت MongoDB محلياً
# https://www.mongodb.com/try/download/community
```

#### Redis:

```bash
# باستخدام Docker
docker run -d -p 6379:6379 --name redis redis:latest

# أو تثبيت Redis محلياً
# https://redis.io/download
```

#### باستخدام Docker Compose (موصى به):

```bash
# إنشاء ملف docker-compose.yml
# ثم تشغيل:
docker-compose up -d
```

### 5️⃣ تشغيل التطبيق

```bash
# Development mode مع hot reload
npm run dev

# Production build
npm run build
npm start
```

### 6️⃣ التحقق من التشغيل

افتح المتصفح على:

- API: http://localhost:5000
- API Monitoring: http://localhost:5000/api-monitoring

جرب endpoint:

```bash
# Get all values
curl http://localhost:5000/api/v1/values

# Create a value
curl -X POST http://localhost:5000/api/v1/values \
  -H "Content-Type: application/json" \
  -d '{"name":"test","value":100}'
```

---

## 📁 إنشاء Feature جديد

### السيناريو: إنشاء feature للمستخدمين (Users)

#### خطوة 1: إنشاء هيكل المجلدات

```bash
# في مجلد src/features/
mkdir -p user/controllers
mkdir -p user/interfaces
mkdir -p user/models
mkdir -p user/routes
mkdir -p user/schema
```

#### خطوة 2: إنشاء Interface

```typescript
// src/features/user/interfaces/user.interface.ts
import { ObjectId } from "mongodb";

export interface IUser extends Document {
  _id?: ObjectId | string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}
```

#### خطوة 3: إنشاء Model

```typescript
// src/features/user/models/user.schema.ts
import { Schema, model, Model } from "mongoose";
import { IUser } from "@user/interfaces/user.interface";

const UserSchema: Schema = new Schema({ username: { type: String, required: true, unique: true }, email: { type: String, required: true, unique: true }, password: { type: String, required: true } }, { timestamps: true, versionKey: false });

export const UserModel: Model<IUser> = model<IUser>("User", UserSchema, "users");
```

#### خطوة 4: إنشاء Validation Schema

```typescript
// src/features/user/schema/user.ts
import Joi, { ObjectSchema } from "joi";

export const createUserSchema: ObjectSchema = Joi.object({ username: Joi.string().min(3).max(30).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required() });

export const loginSchema: ObjectSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
```

#### خطوة 5: إنشاء Service

```typescript
// src/shared/services/db/user.service.ts
import { IUser } from "@user/interfaces/user.interface";
import { UserModel } from "@user/models/user.schema";
import bcrypt from "bcryptjs";

class UserService {
  public async createUser(userData: IUser): Promise<void> {
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await UserModel.create({ ...userData, password: hashedPassword });
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  public async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find().select("-password");
  }
}

export const userService: UserService = new UserService();
```

#### خطوة 6: إنشاء Controllers

```typescript
// src/features/user/controllers/create-user.ts
import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@globals/decorators/joi-validation.decorators";
import { createUserSchema } from "@user/schema/user";
import { userService } from "@service/db/user.service";
import { IUser } from "@user/interfaces/user.interface";

export class CreateUser {
  @joiValidation(createUserSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    const userData: IUser = { username, email, password } as IUser;

    await userService.createUser(userData);

    res.status(HTTP_STATUS.CREATED).json({ message: "User created successfully" });
  }
}
```

```typescript
// src/features/user/controllers/get-user.ts
import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { userService } from "@service/db/user.service";

export class GetUser {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.status(HTTP_STATUS.OK).json({ message: "All Users", users });
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(HTTP_STATUS.OK).json({ message: "User By Id", user });
  }
}
```

#### خطوة 7: إنشاء Routes

```typescript
// src/features/user/routes/user.routes.ts
import express, { Router } from "express";
import { CreateUser } from "@user/controllers/create-user";
import { GetUser } from "@user/controllers/get-user";

class UserRoutes {
  private router = Router();

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/users", CreateUser.prototype.create);
    this.router.get("/users", GetUser.prototype.getAllUsers);
    this.router.get("/users/:id", GetUser.prototype.getUserById);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
```

#### خطوة 8: تسجيل Routes

```typescript
// src/routes.ts
import { Application } from "express";
import { valueRoutes } from "@value/routes/value.routes";
import { userRoutes } from "@user/routes/user.routes"; // إضافة

const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, valueRoutes.routes());
    app.use(BASE_PATH, userRoutes.routes()); // إضافة
  };
  routes();
};
```

#### خطوة 9: إضافة Path Alias

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@value/*": ["src/features/value/*"],
      "@user/*": ["src/features/user/*"], // إضافة
      "@globals/*": ["src/shared/global/*"],
      "@service/*": ["src/shared/services/*"],
      "@root/*": ["src/*"]
    }
  }
}
```

#### خطوة 10: اختبار Feature الجديد

```bash
# تشغيل التطبيق
npm run dev

# اختبار API
# إنشاء مستخدم
curl -X POST http://localhost:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456"}'

# الحصول على جميع المستخدمين
curl http://localhost:5000/api/v1/users
```

---

## 🎨 تخصيص المشروع

### تغيير اسم المشروع

1. **في package.json**:

```json
{ "name": "your-project-name", "description": "Your project description" }
```

2. **في setup-server.ts**:

```typescript
cookieSession({
  name: "Your-App-Session", // تغيير الاسم
  // ...
});
```

### تغيير Base Path

```typescript
// src/routes.ts
const BASE_PATH = "/api/v2"; // تغيير الإصدار
```

### إضافة Middleware جديد

```typescript
// src/setup-server.ts
private standardMiddleware(app: Application): void {
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // إضافة middleware جديد
  app.use(yourCustomMiddleware());

  if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
}
```

---

## 🔧 أدوات التطوير

### ESLint

```bash
# فحص الكود
npm run lint:check

# إصلاح مشاكل الكود
npm run lint:fix
```

### Prettier

```bash
# فحص التنسيق
npm run prettier:check

# إصلاح التنسيق
npm run prettier:fix
```

### Testing

```bash
# تشغيل الاختبارات
npm test

# تشغيل الاختبارات مع Coverage
npm test -- --coverage
```

---

## 🐳 استخدام Docker

### بناء صورة Docker

```bash
# بناء الصورة
docker build -t your-app-name .

# تشغيل Container
docker run -p 5000:5000 --env-file .env your-app-name
```

### Docker Compose (كامل)

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URI=mongodb://mongo:27017/yourapp
      - REDIS_HOST=redis://redis:6379
    depends_on:
      - mongo
      - redis
    restart: unless-stopped

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  mongo-data:
  redis-data:
```

```bash
# تشغيل جميع الخدمات
docker-compose up -d

# إيقاف الخدمات
docker-compose down

# عرض السجلات
docker-compose logs -f
```

---

## 📝 أمثلة عملية

### مثال 1: إضافة Authentication

```typescript
// src/shared/global/helpers/auth.helper.ts
import jwt from "jsonwebtoken";
import { config } from "@root/config";

export class AuthHelper {
  public static generateToken(userId: string): string {
    return jwt.sign({ userId }, config.JWT_TOKEN!, { expiresIn: config.JWT_EXPIRE });
  }

  public static verifyToken(token: string): any {
    return jwt.verify(token, config.JWT_TOKEN!);
  }
}
```

```typescript
// src/shared/global/helpers/auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@globals/helpers/error-handler";
import { AuthHelper } from "@globals/helpers/auth.helper";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new NotAuthorizedError("Token is not available");
  }

  try {
    const decoded = AuthHelper.verifyToken(token);
    req.currentUser = decoded;
    next();
  } catch (error) {
    throw new NotAuthorizedError("Token is invalid");
  }
};
```

```typescript
// استخدام في Routes
this.router.get("/protected", authMiddleware, Controller.prototype.method);
```

### مثال 2: إضافة File Upload

```typescript
// src/shared/services/cloudinary/cloudinary.service.ts
import cloudinary from "cloudinary";

class CloudinaryService {
  public async uploadImage(file: string, folder: string): Promise<string> {
    const result = await cloudinary.v2.uploader.upload(file, { folder });
    return result.secure_url;
  }

  public async deleteImage(publicId: string): Promise<void> {
    await cloudinary.v2.uploader.destroy(publicId);
  }
}

export const cloudinaryService = new CloudinaryService();
```

### مثال 3: إضافة Email Service

```typescript
// src/shared/services/email/email.service.ts
import nodemailer from "nodemailer";
import { config } from "@root/config";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({ service: "gmail", auth: { user: config.SENDER_EMAIL, pass: config.SENDER_EMAIL_PASSWORD } });
  }

  public async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({ from: config.SENDER_EMAIL, to, subject, html });
  }
}

export const emailService = new EmailService();
```

---

## 🚨 استكشاف الأخطاء

### المشكلة: لا يمكن الاتصال بـ MongoDB

**الحل**:

```bash
# تحقق من تشغيل MongoDB
docker ps | grep mongo

# أو
mongosh

# تحقق من DATABASE_URI في .env
```

### المشكلة: لا يمكن الاتصال بـ Redis

**الحل**:

```bash
# تحقق من تشغيل Redis
docker ps | grep redis

# أو
redis-cli ping

# يجب أن يرجع PONG
```

### المشكلة: TypeScript Path Aliases لا تعمل

**الحل**:

```bash
# تأكد من تثبيت
npm install --save-dev tsconfig-paths tsc-alias

# في package.json
"dev": "nodemon -r tsconfig-paths/register src/app.ts"
"build": "tsc && tsc-alias -p tsconfig.json"
```

### المشكلة: Validation لا يعمل

**الحل**:

```typescript
// تأكد من إضافة experimentalDecorators في tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## 📚 موارد إضافية

### التوثيق الكامل

- [DOCUMENTATION.md](./DOCUMENTATION.md) - التوثيق الشامل
- [ARCHITECTURE.md](./ARCHITECTURE.md) - المعمارية
- [AI_PROMPT_TEMPLATE.md](./AI_PROMPT_TEMPLATE.md) - البرومبت للـ AI

### الأدوات المستخدمة

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [Socket.IO](https://socket.io/)

---

## ✅ Checklist للبدء

- [ ] استنساخ المشروع
- [ ] تثبيت Dependencies
- [ ] إعداد .env
- [ ] تشغيل MongoDB
- [ ] تشغيل Redis
- [ ] تشغيل التطبيق
- [ ] اختبار API الموجود
- [ ] إنشاء Feature جديد
- [ ] اختبار Feature الجديد
- [ ] قراءة التوثيق الكامل

---

## 🎉 مبروك!

أنت الآن جاهز لبدء التطوير. استمتع بالبرمجة! 🚀
