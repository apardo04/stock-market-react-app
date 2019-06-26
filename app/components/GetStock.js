import {useState, useEffect} from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import Stock from './Stock';

const GetStock = (props) => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [color, setColor] = useState("black");

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

  const addToPortfolio = (id, symbol) => {
    setIsAdding(true);
    Axios.post(`${process.env.BASE_URL}/api/stocks?userID=${id}&stock=${symbol}`, () => {})
    .then(function (res) {
      console.log(res);
      setIsAdding(false);
      props.getUserStocks(props.id)
    })
    .catch(function (error) {
      console.log(error);
      setErrorMessage(error.response.data)
    });
  }

  const deleteFromPortfolio = symbol => {
    setIsRemoving(true);
    Axios.delete(`${process.env.BASE_URL}/api/stocks?userID=${props.id}&stock=${symbol}`, () => {})
    .then(function (res) {
      console.log(res);
      setIsRemoving(false);
      props.getUserStocks(props.id)
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
        ( <Loader 
          type="Oval"
          color="#31a36e"
          height="50"	
          width="50"
        /> ) 
      : 
        errorMessage ? 
        <div className="rounded-lg mb-10 mr-10 xs:p-1 lg:w-full lg:p-6 xs:m-auto">
          <div className="mt-4 md:mt-0 md:ml-6">
            <span className="errorMessage block mt-1 text-lg leading-tight font-semibold text-gray-900">{errorMessage}: {props.stockToFind}</span>
          </div>
        </div>
      :
        props.portfolio ?
          <div className="col white">
            <Stock data={stock} color={color} modal={props.modal}/>
            <div className="btn-remove-container">
              <Button type="primary" icon="delete" onClick={() => deleteFromPortfolio(stock.symbol)}>{ isRemoving ? " Removing" : "Remove From Portfolio" }</Button>
            </div>
          </div>
      :
          <div className="black">
            <Stock data={stock} color={color} />
            {props.loggedIn &&
              <Button type="primary" onClick={() => addToPortfolio(props.id, stock.symbol)} className="">{ isAdding ? "Adding.." : "Add To Portfolio"}</Button>
            }
          </div>
      }
      <style jsx>{`
          .col {
            box-sizing: border-box;
            width: 20%;
          }
          .col:nth-child(odd) {
            margin-right: 0.5rem
          }
          .col:nth-child(even) {
            margin-left: 0.5rem;
          }
          .col:not(:nth-child(0)),
          .col:not(:nth-child(0)) {
            margin-top: 1rem;
          }
          .btn-remove-container {
              margin-top: .75rem;
          }
      `}</style>
    </React.Fragment>
  )
}

export default GetStock