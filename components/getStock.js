import {useState, useEffect} from 'react'
import axios from 'axios';
import Stock from './stock'

const GetStock = props => {
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState("black")

  console.log("GetStock component called for searchValue = " + props.stockToFind)

  const search = searchValue => { 
    console.log("%c search function called for = " + searchValue, 'background: grey; color:red')
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
  }

  useEffect(() => {  
    console.log("useEffect called for stock = " + props.stockToFind)
    search(props.stockToFind)  
  }, [])
  

  return(
    <React.Fragment>
      {loading && !errorMessage ? 
        (<span>loading...</span>) 
      : 
        errorMessage ? 
        <div className="bg-white rounded-lg mb-10 mr-10 xs:p-1 lg:w-full lg:p-6">
          <div className="mt-4 md:mt-0 md:ml-6">
            <span className="errorMessage block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">{errorMessage}: {props.stockToFind}</span>
          </div>
        </div>
      :
        <div>
          <Stock data={stock} color={color} />
        </div>
      }      
    </React.Fragment>
  )
}

export default GetStock