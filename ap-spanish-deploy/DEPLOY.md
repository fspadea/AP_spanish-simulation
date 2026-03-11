# AP Spanish Simulation — Deploy Reference

Same setup as the Italian app. Follow the same guide.

## File Structure
```
📁 backend/        → Deploy to Railway (Root Directory: backend)
📁 frontend/       → Deploy to Vercel  (Root Directory: frontend)
📄 .gitignore
📄 DEPLOY.md
```

## Railway (Backend)
- Root Directory: `backend`
- Variable: `ANTHROPIC_API_KEY` = your key

## Vercel (Frontend)
- Root Directory: `frontend`
- Framework: Vite (auto-detected)
- Build Command: `npm run build`
- Output Directory: `dist`
- Variable: `VITE_API_URL` = your Railway URL (e.g. https://something.railway.app)

## Future Updates
1. Get new App.jsx from Claude
2. Go to GitHub → your repo → `frontend/src/App.jsx`
3. Click pencil (Edit) → select all → paste → Commit
4. Vercel redeploys automatically in ~60 seconds
