import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import { DoSomethingProvider } from './context/context.tsx'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DoSomethingProvider>
      <RouterProvider router={router}/>
    </DoSomethingProvider>
  </React.StrictMode>,
)
