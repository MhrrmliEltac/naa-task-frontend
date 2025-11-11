# Frontend Application

React + TypeScript + Vite ile qurulmuş frontend aplikasiyası.

## İşə Salınması

**QEYD: Bu aplikasiyanı işə salmazdan əvvəl backend serveri işə salmalısınız. Server işləmədikdə frontend düzgün işləməyəcək.**

### Serveri İşə Salmaq

1. Backend serveri işə salın (əksər hallarda `http://localhost:5000` ünvanında işləyir)
2. Serverin uğurla işlədiyini yoxlayın

### Frontendi İşə Salmaq

1. Proyektin dependencies-lərini quraşdırın:
```bash
npm install
```

2. Development serveri işə salın:
```bash
npm run dev
```

3. Browser-də `http://localhost:5173` (və ya göstərilən port) ünvanını açın

## API Konfiqurasiyası

Frontend aplikasiyası default olaraq `http://localhost:5000/api` ünvanında backend serveri ilə əlaqə qurur. Bu ünvanı `.env` faylında `REACT_APP_API_URL` environment variable ilə dəyişdirmək olar.

## Build Etmək

Production üçün build etmək:
```bash
npm run build
```

Build olunmuş faylları preview etmək:
```bash
npm run preview
```

## Texnologiyalar

- React 19
- TypeScript
- Vite
- Material-UI
- React Query
- React Router
- Tailwind CSS
- Axios

---

**Xatırlatma: Backend serveri işə salmadan frontend aplikasiyası düzgün işləməyəcək.**
