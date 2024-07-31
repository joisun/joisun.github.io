import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { router, RouterProvider } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
