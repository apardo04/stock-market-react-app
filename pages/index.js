import { useState } from 'react'
import Layout from '../components/layout'
import '../static/assets/css/styles.css'
import GetStock from '../components/getStock';
import StockSearch from './stockSearch';
import Search from  '../components/search'

const App = props => {
  const [stockModal, toggleStockModal] = useState(false)
  const [searchedStock, setSearchedStock] = useState("")

  const search = searchValue => {
    setSearchedStock(searchValue)
    toggleStockModal(true)
  }
  
  return(
    <Layout page="index" title="" description="">
      {stockModal && 
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => toggleStockModal(!stockModal)}>&times;</span>
            <GetStock stockToFind={searchedStock} modal="true"/>
          </div>
        </div>
      }
      <Search search={search} />
      <div className="flex flex-wrap ">
        {props.stocks.map(stock => {
          return <GetStock stockToFind={stock} key={stock} />
        })}
      </div>
    </Layout>
  )
}

export default App

App.getInitialProps = async function() {
  let res = await fetch('http://localhost:3001/api/stocks')
  let data = await res.json();
  return {stocks: data.map(stock => stock.stock)}
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