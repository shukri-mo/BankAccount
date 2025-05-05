import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { Provider } from 'react-redux'
import Store from "./RTK/Store"
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={Store}>
  <UserProvider>   <App /></UserProvider>

  </Provider>
 
  </StrictMode>,
)
