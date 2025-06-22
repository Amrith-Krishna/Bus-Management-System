import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Student.css'
import Admin from './Admin';
import {arr} from './Arr.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Admin rows={arr}/>
  </StrictMode>,
)

console.log(arr+"main");