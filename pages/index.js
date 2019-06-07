import Layout from '../components/layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import axios from 'axios';
import '../static/assets/css/styles.css'
import {useState, useEffect} from 'react'
import Search from '../components/search'
import Stock from '../components/stock'


const App = props => {
  const [loading, setLoading] = useState(false)
  const [stock, setStock] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState("black")


  const search = searchValue => {    
    console.log("searching for.." + searchValue)
    setLoading(true);    
    setErrorMessage(null);
    /*let res = fetch(`https://sandbox.iexapis.com/stable/stock/${searchValue}/quote?token=Tpk_0e279c07400d4e8abbc68cf27ae41263&filter=symbol,companyName,latestPrice,change,changePercent,peRatio,latestVolume,avgTotalVolume,marketCap`)
      .then(response => response.json())
      .then(jsonResponse => { 
        if (jsonResponse.symbol) {
          setStock(jsonResponse);   
          console.log("stock: " + stock.toString())  
          setLoading(false);
        } else {          
          setErrorMessage("error");
          console.log("search error: " + jsonResponse) 
          setLoading(false);
        }
      });  */
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
  };
  

  useEffect(() => {    
    //console.log("useEffect stock value: " + stock)
  })
 

  return(
    <Layout page="index" title="" description="">
      <Search search={search} />

      <h1></h1>
      {loading && !errorMessage ? 
        (<span>loading...</span>) 
      : 
        errorMessage ? 
          <div className="errorMessage">error: {errorMessage}</div>
      :
        stock.symbol ?
          <Stock data={stock} color={color} /> 
      :
          <div>search for soemthing</div>
      }      
    </Layout>
  )
}
/*App.getInitialProps = async function() {
  let res = await fetch('https://sandbox.iexapis.com/stable/stock/WYNN/quote?token=Tpk_0e279c07400d4e8abbc68cf27ae41263&filter=symbol,companyName,latestPrice,change,changePercent,peRatio,latestVolume,avgTotalVolume,marketCap')
  //let res = await fetch('https://cloud.iexapis.com/stable/stock/AMD/quote?token=pk_715d9aa675fa4cc58576afda2e5b750a')
  //Miav
  //https://cloud.iexapis.com/stable/stock/amd/company?token=pk_715d9aa675fa4cc58576afda2e5b750a
  let data = await res.json();
  let redOrGreen = (data.changePercent.toString()[0] == '-') ? "red" : "green"
  let stock = Object.entries(data).map(([key, value]) => 
    <li>{key + ": " +  value}</li>
  )
  console.log("data retrieved")
  return {*/

/* Alphavantage
App.getInitialProps = async function() {
  let api_keys = ["55VF2MOP6F6OFKHJ", "T4K6YGUEA62XZGU3", "6PF9DO06RM7LAL8Y", "PCXJR3QWEIBN61CQ", "9J20D9U00QNE2SBC"]

  let res = await fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=6PF9DO06RM7LAL8Y');
  let data = await res.json();
  let sectorList = <li>Fuck alphavantage</li>

  if (Object.keys(data)[0] != "Note") {
    sectorList = Object.entries(data["Rank B: 1 Day Performance"]).map(([key, value]) => 
        <li>{key + ": " +  value}</li>
    )
  }

  res = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=amd&apikey=55VF2MOP6F6OFKHJ');
  data = await res.json();
  let stockData2 = <li>Fuck alphavantage</li>

  if (Object.keys(data)[0] != "Note") {

    const stockData = {"Symbol": data["Global Quote"]["01. symbol"], 
                        "Price": data["Global Quote"]["05. price"], 
                        "Change": data["Global Quote"]["09. change"],
                        "Change Percent": data["Global Quote"]["10. change percent"]
                      }
    
    stockData2 = Object.entries(stockData).map(([key, value]) => 
        <li className="red">{key + ": " +  value}</li>
    )
  }

  return {
    sectorList, stockData2
  };



};
*/


export default App