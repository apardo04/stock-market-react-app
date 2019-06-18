import {useState, useEffect} from 'react'
import Axios from 'axios';
import Stock from './stock'

const GetStock = (props) => {
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState("black")

  const search = searchValue => { 
    console.log("%c search function called for = " + searchValue, 'background: grey; color:red')
    setLoading(true);
    setErrorMessage(null);

    let dataArr = []
    Axios
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
  }

  const addToPortfolio = () => {
    Axios.post(`http://127.0.0.1:3000/api/stocks?userID=${props.user.id}&stock=${stock.symbol}`, () => {})
    .then(function (res) {
      console.log(res);
      props.getUserStocks()
    })
    .catch(function (error) {
      console.log(error);
      setErrorMessage(error.response.data)
    });
  }

  const deleteFromPortfolio = symbol => {
    Axios.delete(`http://127.0.0.1:3000/api/stocks?userID=${props.user.id}&stock=${symbol}`, () => {})
    .then(function (res) {
      console.log(res);
      props.getUserStocks()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {  
    search(props.stockToFind)  
  }, [])
  

  return(
    <React.Fragment>
      {loading && !errorMessage ? 
        (<span>loading...</span>) 
      : 
        errorMessage ? 
        <div className="rounded-lg mb-10 mr-10 xs:p-1 lg:w-full lg:p-6 xs:m-auto">
          <div className="mt-4 md:mt-0 md:ml-6">
            <span className="errorMessage block mt-1 text-lg leading-tight font-semibold text-gray-900">{errorMessage}: {props.stockToFind}</span>
          </div>
        </div>
      :
        <div className="stock-container ml-6 rounded-lg lg:mb-10 lg:mr-10 xs:p-1 lg:p-6">
          <Stock data={stock} color={color} />
          {props.portfolio && props.user && 
            <button onClick={() => deleteFromPortfolio(stock.symbol)} className="text-white font-bold py-1 px-2 mt-3 ml-5 border border-white rounded content-center">Remove From Portfolio</button>
          } 
          {props.modal && props.user &&
            <button onClick={addToPortfolio} className="text-white font-bold py-2 px-4 mt-3 border border-black rounded content-center">Add To Portfolio</button>
          }
        </div>
      }      
    </React.Fragment>
  )
}

export default GetStock