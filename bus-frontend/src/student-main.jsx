import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Student from './Student.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Student.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Student/>
  </StrictMode>,
)
