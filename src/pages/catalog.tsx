import { FC,useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {WebData} from '../interfaces'
import Loader from '../components/ui/Loader';


interface CatalogComponentProps {
  webData: WebData | undefined;
}

const CatalogComponent:FC<CatalogComponentProps> = ({webData}) => {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if(webData != null && webData != undefined){
      setLoading(false);
    }
  },[webData])



  if(loading || webData == undefined){
    return <Loader isLoading={loading}/>
  }else{
    return(
      <>
        <Navbar/>
      </>
    )
  }

}

export default CatalogComponent;
