# 🤝 دليل المساهمة - Contributing Guide

شكراً لاهتمامك بالمساهمة في هذا المشروع! نحن نرحب بجميع أنواع المساهمات.

## 📋 جدول المحتويات

- [كيفية المساهمة](#-كيفية-المساهمة)
- [معايير الكود](#-معايير-الكود)
- [عملية Pull Request](#-عملية-pull-request)
- [الإبلاغ عن المشاكل](#-الإبلاغ-عن-المشاكل)
- [اقتراح ميزات جديدة](#-اقتراح-ميزات-جديدة)
- [إعداد بيئة التطوير](#-إعداد-بيئة-التطوير)
- [البنية المعمارية](#-البنية-المعمارية)
- [معايير Commit](#-معايير-commit)

---

## 🎯 كيفية المساهمة

### أنواع المساهمات المرحب بها:

1. **🐛 إصلاح المشاكل (Bug Fixes)**
   - إصلاح الأخطاء الموجودة
   - تحسين معالجة الأخطاء

2. **✨ ميزات جديدة (New Features)**
   - إضافة features جديدة
   - تحسين features موجودة

3. **📚 توثيق (Documentation)**
   - تحسين التوثيق
   - إضافة أمثلة
   - ترجمة

4. **🧪 اختبارات (Tests)**
   - كتابة اختبارات جديدة
   - تحسين الاختبارات الموجودة

5. **⚡ الأداء (Performance)**
   - تحسين الأداء
   - تحسين الاستعلامات

6. **🎨 جودة الكود (Code Quality)**
   - Refactoring
   - تحسين البنية

---

## 📝 معايير الكود

### 1. TypeScript

```typescript
// ✅ جيد
export interface IUser extends Document {
  _id?: ObjectId | string;
  username: string;
  email: string;
}

export class UserService {
  public async createUser(userData: IUser): Promise<void> {
    await UserModel.create(userData);
  }
}

// ❌ سيء
export class UserService {
  public async createUser(userData: any): Promise<any> {
    return await UserModel.create(userData);
  }
}
```

### 2. Async/Await

```typescript
// ✅ جيد
public async getValue(): Promise<IValue[]> {
  try {
    const values = await ValueModel.find();
    return values;
  } catch (error) {
    throw new ServerError('Error fetching values');
  }
}

// ❌ سيء
public getValue(): Promise<any> {
  return ValueModel.find()
    .then(values => values)
    .catch(error => console.log(error));
}
```

### 3. Error Handling

```typescript
// ✅ جيد
import { BadRequestError } from "@globals/helpers/error-handler";

if (!user) {
  throw new BadRequestError("User not found");
}

// ❌ سيء
if (!user) {
  res.status(400).json({ error: "User not found" });
}
```

### 4. Naming Conventions

```typescript
// ✅ جيد
export class CreateUser {} // PascalCase for classes
export interface IUser {} // I prefix for interfaces
const userService = new UserService(); // camelCase for variables
const BASE_PATH = "/api/v1"; // UPPER_CASE for constants

// ❌ سيء
export class create_user {}
export interface User {}
const UserService = new UserService();
```

### 5. File Structure

```typescript
// كل feature يجب أن يتبع هذه البنية:
features/
└── feature-name/
    ├── controllers/        # PascalCase classes
    ├── interfaces/         # I prefix
    ├── models/            # PascalCase models
    ├── routes/            # camelCase
    └── schema/            # camelCase
```

---

## 🔄 عملية Pull Request

### الخطوات:

1. **Fork المشروع**

   ```bash
   # انقر على Fork في GitHub
   ```

2. **Clone Repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/node-express-mongo-template.git
   cd node-express-mongo-template
   ```

3. **إنشاء Branch جديد**

   ```bash
   git checkout -b feature/your-feature-name
   # أو
   git checkout -b fix/bug-description
   ```

4. **إجراء التغييرات**

   ```bash
   # اكتب الكود
   # أضف الاختبارات
   # حدّث التوثيق
   ```

5. **تشغيل الاختبارات**

   ```bash
   npm run lint:check      # فحص الكود
   npm run prettier:check  # فحص التنسيق
   npm test               # تشغيل الاختبارات
   ```

6. **Commit التغييرات**

   ```bash
   git add .
   git commit -m "feat: add user authentication feature"
   ```

7. **Push إلى GitHub**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **فتح Pull Request**
   - اذهب إلى GitHub
   - انقر على "New Pull Request"
   - املأ النموذج بالتفاصيل

### متطلبات Pull Request:

- ✅ الكود يتبع معايير المشروع
- ✅ جميع الاختبارات تعمل
- ✅ لا توجد أخطاء ESLint
- ✅ التنسيق صحيح (Prettier)
- ✅ التوثيق محدّث
- ✅ Commit messages واضحة
- ✅ لا توجد conflicts مع main branch

### نموذج Pull Request:

```markdown
## الوصف

وصف مختصر للتغييرات

## نوع التغيير

- [ ] إصلاح مشكلة (Bug fix)
- [ ] ميزة جديدة (New feature)
- [ ] تحسين (Enhancement)
- [ ] توثيق (Documentation)
- [ ] أخرى (Other)

## التغييرات

- تم إضافة...
- تم تحسين...
- تم إصلاح...

## الاختبارات

- [ ] تم اختبار الكود محلياً
- [ ] تم إضافة اختبارات جديدة
- [ ] جميع الاختبارات تعمل

## Screenshots (إن وجدت)

## ملاحظات إضافية
```

---

## 🐛 الإبلاغ عن المشاكل

### قبل الإبلاغ:

1. ✅ تحقق من [Issues الموجودة](https://github.com/SaadAlsaree/node-express-mongo-template/issues)
2. ✅ تأكد أنك تستخدم آخر إصدار
3. ✅ جرّب إعادة إنتاج المشكلة

### نموذج Issue:

```markdown
## وصف المشكلة

وصف واضح ومختصر للمشكلة

## خطوات إعادة الإنتاج

1. اذهب إلى '...'
2. انقر على '...'
3. شاهد الخطأ

## السلوك المتوقع

ما الذي كان يجب أن يحدث؟

## السلوك الفعلي

ما الذي حدث بالفعل؟

## Screenshots

إن وجدت

## البيئة

- OS: [مثل: Windows 11]
- Node.js: [مثل: 18.x]
- MongoDB: [مثل: 6.x]
- Browser: [مثل: Chrome 120]

## معلومات إضافية

أي معلومات أخرى مفيدة
```

---

## 💡 اقتراح ميزات جديدة

### نموذج Feature Request:

```markdown
## وصف الميزة

وصف واضح للميزة المقترحة

## المشكلة التي تحلها

ما المشكلة التي ستحلها هذه الميزة؟

## الحل المقترح

كيف تريد تنفيذ هذه الميزة؟

## البدائل المدروسة

هل فكرت في حلول بديلة؟

## أمثلة

أمثلة على كيفية استخدام الميزة

## معلومات إضافية

أي تفاصيل أخرى
```

---

## 🛠️ إعداد بيئة التطوير

### 1. المتطلبات

```bash
# Node.js
node --version  # >= 18.x

# npm
npm --version   # >= 9.x

# MongoDB
mongod --version  # >= 6.x

# Redis
redis-server --version  # >= 7.x
```

### 2. التثبيت

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/node-express-mongo-template.git
cd node-express-mongo-template

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# عدّل .env

# 4. Start databases
docker-compose up -d mongo redis

# 5. Run development server
npm run dev
```

### 3. أدوات مفيدة

```bash
# Watch mode مع nodemon
npm run dev

# Build
npm run build

# Linting
npm run lint:check
npm run lint:fix

# Formatting
npm run prettier:check
npm run prettier:fix

# Testing
npm test
npm test -- --coverage
```

---

## 🏗️ البنية المعمارية

### عند إضافة Feature جديد:

1. **إنشاء الهيكل**

   ```
   features/
   └── your-feature/
       ├── controllers/
       ├── interfaces/
       ├── models/
       ├── routes/
       └── schema/
   ```

2. **إنشاء الملفات بالترتيب**
   - Interface
   - Model
   - Validation Schema
   - Service
   - Controllers
   - Routes

3. **تسجيل Routes**
   - في `src/routes.ts`

4. **إضافة Path Alias**
   - في `tsconfig.json`

5. **كتابة الاختبارات**
   - في مجلد `__tests__`

6. **تحديث التوثيق**
   - README.md
   - DOCUMENTATION.md

### راجع:

- [DOCUMENTATION.md](./DOCUMENTATION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [QUICK_START.md](./QUICK_START.md)

---

## 📝 معايير Commit

### Conventional Commits

نستخدم [Conventional Commits](https://www.conventionalcommits.org/) للـ commit messages:

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### الأنواع (Types):

- `feat`: ميزة جديدة
- `fix`: إصلاح مشكلة
- `docs`: تغييرات في التوثيق
- `style`: تنسيق الكود (لا يؤثر على المعنى)
- `refactor`: إعادة هيكلة الكود
- `perf`: تحسين الأداء
- `test`: إضافة أو تعديل اختبارات
- `build`: تغييرات في نظام البناء
- `ci`: تغييرات في CI configuration
- `chore`: مهام صيانة أخرى
- `revert`: التراجع عن commit سابق

### أمثلة:

```bash
# ميزة جديدة
feat: add user authentication feature
feat(auth): implement JWT token generation

# إصلاح مشكلة
fix: resolve database connection timeout
fix(user): correct email validation regex

# توثيق
docs: update API documentation
docs(readme): add installation instructions

# refactoring
refactor: simplify error handling logic
refactor(service): extract common functions

# أداء
perf: optimize database queries
perf(cache): implement Redis caching strategy

# اختبارات
test: add unit tests for user service
test(auth): add integration tests

# تنسيق
style: format code with prettier
style: fix indentation

# build
build: update dependencies
build(docker): optimize dockerfile
```

### قواعد Commit Messages:

1. ✅ استخدم فعل المضارع (مثل: "add" وليس "added")
2. ✅ لا تنهي بنقطة
3. ✅ اجعلها قصيرة (أقل من 72 حرف)
4. ✅ استخدم السطر الأول كملخص
5. ✅ اترك سطر فارغ قبل الوصف التفصيلي

```bash
# ✅ جيد
feat: add user profile picture upload

Implemented Cloudinary integration for uploading and managing
user profile pictures. Added validation for image formats and size.

# ❌ سيء
Added some changes to the user stuff.
```

---

## ✅ Checklist قبل Submit

### للـ Pull Request:

- [ ] الكود يعمل بدون أخطاء
- [ ] `npm run lint:check` يعمل بدون مشاكل
- [ ] `npm run prettier:check` يعمل بدون مشاكل
- [ ] `npm test` جميع الاختبارات تنجح
- [ ] أضفت اختبارات للكود الجديد
- [ ] حدّثت التوثيق
- [ ] اتبعت معايير الكود
- [ ] Commit messages واضحة ومتبعة للمعايير
- [ ] لا توجد console.log أو debug code
- [ ] راجعت الكود قبل Submit

### للـ Issue:

- [ ] بحثت عن Issues مشابهة
- [ ] املأت النموذج كاملاً
- [ ] أضفت معلومات البيئة
- [ ] أضفت خطوات إعادة الإنتاج
- [ ] أضفت screenshots إن أمكن

---

## 🎓 موارد مفيدة

### للتعلم:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Redis Documentation](https://redis.io/docs/)

### للمساهمة:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 💬 التواصل

### أسئلة؟

- افتح [Discussion](https://github.com/SaadAlsaree/node-express-mongo-template/discussions)
- راسلنا على [البريد الإلكتروني]

### مشكلة؟

- افتح [Issue](https://github.com/SaadAlsaree/node-express-mongo-template/issues)

---

## 📜 Code of Conduct

### توقعاتنا:

#### سلوك إيجابي:

- ✅ استخدام لغة ترحيبية وشاملة
- ✅ احترام وجهات النظر المختلفة
- ✅ قبول النقد البنّاء بأريحية
- ✅ التركيز على ما هو أفضل للمجتمع

#### سلوك غير مقبول:

- ❌ استخدام لغة أو صور جنسية
- ❌ التعليقات المهينة أو المسيئة
- ❌ المضايقة العامة أو الخاصة
- ❌ نشر معلومات خاصة بدون إذن

---

## 🙏 شكراً

شكراً لمساهمتك في جعل هذا المشروع أفضل! 🎉

نحن نقدّر وقتك وجهدك في تحسين هذا المشروع للجميع.

---

**ملاحظة**: هذا الدليل قد يتم تحديثه. تحقق منه بانتظام.

**آخر تحديث**: أكتوبر 2024
