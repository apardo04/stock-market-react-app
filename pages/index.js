import {useState, useEffect} from 'react'
import GetStock from '../components/getStock';
import Search from  '../components/search'
import Axios from 'axios';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { getToken } from '../static/auth';
import template from '../components/template';
import SecureTemplate from '../static/secure-template'
import '../static/assets/css/styles.css'

const Index = ({ isLoggedIn, loggedInUser }) => {
  const [stockModal, toggleStockModal] = useState(false)
  const [searchedStock, setSearchedStock] = useState("")
  const [userStocks, setUserStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const search = searchValue => {
    setSearchedStock(searchValue)
    toggleStockModal(true)
  }
  
  const getUserStocks = () => {
    setLoading(true);    
    setErrorMessage(null);

    let dataArr = []
    Axios
    .get(`${process.env.BASE_URL}/api/stocks?userID=${loggedInUser.sub}`)
    .then(res => {
      res.data.map(stock => {
        dataArr.push(stock.stock)
      })
      setUserStocks(dataArr)
      setLoading(false)
      toggleStockModal(false)
    })
    .catch(function (error) {
      if (error.response) {
      setErrorMessage(error.response.data)
      setLoading(false);
      }
    })
  }

  useEffect(() => { 
    if (isLoggedIn) 
      getUserStocks()
  }, [])
  
  return(
    <React.Fragment>
      {stockModal && 
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close green" onClick={() => toggleStockModal(false)}>&times;</span>
            <GetStock stockToFind={searchedStock} modal="true" user={loggedInUser} getUserStocks={getUserStocks} />
          </div>
        </div>
      }
      <Search search={search} />
      {loading && !errorMessage ? 
        (<span>loading...</span>) 
      : 
        errorMessage ?
        <div>error{errorMessage}
         {JSON.stringify(loggedInUser, null, 2)}</div>
      :
        isLoggedIn ?
        <div className="flex flex-wrap">
          {userStocks.map(stock => {
            return <GetStock stockToFind={stock} key={stock} portfolio="true" user={loggedInUser} getUserStocks={getUserStocks} />
          })}
        </div>
        :
        <div className="flex flex-wrap justify-center">
          <Link href="/login">
            <a className="mt-2 hover:underline hover:cursor-pointer green">Log In or Register to create a portfolio</a>
          </Link>
        </div>
      }
    </React.Fragment>
  )
}

Index.propTypes = {
  isLoggedIn: PropTypes.bool,
  loggedInUser: PropTypes.object
}

export default template(Index);