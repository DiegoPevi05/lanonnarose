import {Suspense, useState, useEffect} from 'react';
import Providers from './components/Providers';
import Home from './pages';
import CatalogComponent from './pages/catalog';
import './lib/i18n';
import axios from 'axios';
import {mapInputData} from './lib/utils';
import {WebData} from './interfaces';
import {toast} from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  /*const [webData, setWebData] = useState<WebData|undefined>();
  //axios to call api and get data
  const getDataFromServer = async () => {
    try {

      const header = {
        "x-api-key": import.meta.env.VITE_API_KEY,
      }
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/content-web/all/lanonnarose', {headers: header});
      setWebData(mapInputData(response.data));
    }catch (err) {
      toast.error("Ha habido un error trayendo la información del servidor");
    } 
  }

  useEffect(() => {
    getDataFromServer();
    }, []);*/


  return(
    <Suspense fallback='loading'>
      <Providers>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            {/*<Route path='/catalog' element={<CatalogComponent webData={webData}/>} />  */}
          </Routes>
        </Router>
      </Providers>
    </Suspense>
  ) 
}

export default App
