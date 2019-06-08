import {useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import axios from 'axios';
import Search from '../components/search'
import Stock from '../components/stock'

const StockSearch = props => {
    const [loading, setLoading] = useState(false)
    const [stock, setStock] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [color, setColor] = useState("black")
  
    const search = searchValue => {    
        console.log("searching for.." + searchValue)
        setLoading(true);    
        setErrorMessage(null);

        let dataArr = []
        axios
        .get(`https://sandbox.iexapis.com/stable/stock/${searchValue}/quote?token=Tpk_0e279c07400d4e8abbc68cf27ae41263&filter=symbol,companyName,latestPrice,change,changePercent,peRatio,latestVolume,avgTotalVolume,marketCap`)
        .then(res => {
            console.log("res.data = " + res.data)
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
      //console.log("useEffect stock value: " + stock)
    })
   
  
    return(
      <React.Fragment>
        <Search search={search} />
  
        <h1></h1>
        {loading && !errorMessage ? 
          (<span>loading...</span>) 
        : 
          errorMessage ? 
            <div className="errorMessage">error: {errorMessage}</div>
        :
          stock.symbol ?
            <div>
              <Stock data={stock} color={color} /> 
  
            </div>
        :
            <div>search for something</div>
        }      
      </React.Fragment>
    )

}

export default StockSearch