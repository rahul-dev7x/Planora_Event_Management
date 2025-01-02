
import { createRoot } from 'react-dom/client'
import './index.css'


import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'


import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import { Toaster } from 'sonner'




createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  
    <RouterProvider router={router}/>
    <Toaster />

  </PersistGate>
</Provider>
)
