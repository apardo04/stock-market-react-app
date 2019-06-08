import {useState, useEffect} from 'react'
import axios from 'axios';
import Stock from './stock'

const GetStock = props => {
    const [stock, setStock] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [color, setColor] = useState("black")

    console.log("GetStock component called")

    const search = searchValue => {    
      console.log("search function called")
      setLoading(true);    
      setErrorMessage(null);

      let dataArr = []
      axios
      .get(`https://sandbox.iexapis.com/stable/stock/${searchValue}/quote?token=Tpk_0e279c07400d4e8abbc68cf27ae41263&filter=symbol,companyName,latestPrice,change,changePercent,peRatio,latestVolume,avgTotalVolume,marketCap`)
      .then(res => {
          Object.entries(res.data).map(([key,value]) => 
          dataArr[key] = value
          )        
          setColor((dataArr["changePercent"].toString()[0] == '-') ? "red" : "green")
          setStock(dataArr)
          setLoading(false)
      })
      .catch(function (error) {
          if (error.response) {
          setErrorMessage(error.response.data)
          setLoading(false);
          }
      })
  };

    useEffect(() => {  
      console.log("useEffect called")
      search(props.stockToFind)  
    }, [])
   
  
    return(
      <React.Fragment>
        {loading && !errorMessage ? 
          (<span>loading...</span>) 
        : 
          errorMessage ? 
            <div className="errorMessage">error: {errorMessage}</div>
        :
          true ?
            <div>
              <Stock data={stock} color={color} /> 
  
            </div>
        :
            <div>Search Something</div>
        }      
      </React.Fragment>
    )

}

export default GetStock