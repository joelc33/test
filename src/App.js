import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tarea from './componente/Tarea';
import NuevaTarea from './componente/NuevaTarea';

function App() { 

  var etiquetas = [] ///JSON.parse(localStorage.getItem('etiquetas')||"[]");
  var etiqueta;
  etiqueta={value: 'Etiqueta1', label: 'Etiqueta1'};
  etiquetas.push(etiqueta);
  etiqueta={value: 'Etiqueta1', label: 'Etiqueta2'}
  etiquetas.push(etiqueta);
  localStorage.setItem('etiquetas',JSON.stringify(etiquetas));

    
  return (
    <div className="contenedor-principal">          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Tarea />} />                
              <Route path="/new" element={<NuevaTarea />} />       
              <Route path="/new/:idElement" element={<NuevaTarea />} />                
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
