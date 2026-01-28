# Link-in-bio (Kirka style) — Vercel-ready ✅

Це Next.js-проєкт, який працює на Vercel **без PHP**:
- / — публічний link-in-bio
- /admin — адмінка (логін + редагування)
- Дані зберігаються як JSON у **Vercel KV** (Redis), тобто персистентно.

## Локально
```bash
npm i
npm run dev
```

## Vercel налаштування
1) Vercel Dashboard → Storage → **KV** → Create  
   (Vercel сам додасть потрібні env для `@vercel/kv`)

2) Project → Settings → Environment Variables:
- `AUTH_SECRET` (довгий секрет 40+ символів)
- `ADMIN_PASSWORD_HASH` (bcrypt-хеш пароля)

## Як зробити bcrypt-хеш
```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 10));"
```

## Деплой
Залий у GitHub → Import у Vercel → Deploy.

Стартові дані: `src/lib/defaultData.ts`

Примітка: Vercel не дозволяє надійно **писати у файли** під час виконання, тому використано KV як «JSON-сховище».
