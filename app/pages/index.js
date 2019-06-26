import { useState, useEffect } from 'react'
import Axios from 'axios';
import Page from '../layouts/page';
import { Row, Col, Modal, Button } from 'antd';
import AuthenticationForm from '../components/AuthenticationForm'
import SearchForm from  '../components/SearchForm'
import GetStock from '../components/GetStock';
import jwt from 'jwt-simple';

export const LOGIN = "login";
export const REGISTER = "register";

const Index = props => {
    const [registerForm, setRegisterForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState(null);
    const [stockModal, toggleStockModal] = useState(false)
    const [searchedStock, setSearchedStock] = useState("");
    const [userStocks, setUserStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    function logIn(id) {
        setLoggedIn(true);
        getUserStocks(id)
    }

    function logOut() {
        localStorage.clear();
        setLoggedIn(false);
    }

    const search = searchValue => {
        setSearchedStock(searchValue)
        toggleStockModal(true)
    }

    const getUserStocks = id => {
        setLoading(true);    
        setErrorMessage(null);
    
        let dataArr = []
        Axios
        .get(`${process.env.BASE_URL}/api/stocks?userID=${id}`)
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
    let userID = localStorage.getItem("userID")
    let token = localStorage.getItem("stockAppToken");
    if (token && userID) {
        let authenticated = jwt.decode(token, process.env.JWT_SECRET);
        if (authenticated) {
            setLoggedIn(true);
            getUserStocks(userID);
            setUserID(userID);
        }
    }
    }, [])

    return(
        <Page>
            <Row type="flex" justify="center">        
                {stockModal && 
                    <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close green" onClick={() => toggleStockModal(false)}>&times;</span>
                        <GetStock stockToFind={searchedStock} modal="true" id={userID} loggedIn={loggedIn} getUserStocks={getUserStocks} />
                    </div>
                    </div>
                }
                <SearchForm search={search} />
            </Row>
                { loggedIn ?
                    <>
                        <Row type="flex" justify="center"><a onClick={logOut}>Log Out</a></Row>
                        <Row type="flex" justify="center">
                            {userStocks.map((stock, index) => {
                                return <GetStock stockToFind={stock} id={userID} portfolio={loggedIn} getUserStocks={getUserStocks} key={stock} />
                            })}
                        </Row>
                    </>
                :   
                    !registerForm ?
                    <>
                        <Row type="flex" justify="center">Login or Register to create a portfolio</Row>
                        <Row type="flex" justify="center">
                            <div className="center"><AuthenticationForm view={LOGIN} logIn={logIn}/></div>
                        </Row>
                        <Row type="flex" justify="center">
                            <a onClick={() => setRegisterForm(true)}>Click Here to Sign Up</a>
                        </Row>
                    </>
                :
                        <Row type="flex" justify="center">
                            <div className="center"><AuthenticationForm view={REGISTER} /></div>
                        </Row>
                }
            <style jsx global>{`
                body {
                    font-family: Avenir,Helvetica,sans-serif;
                }
                .green {
                    color: #31a36e;
                }
                .red {
                    color: #f5222d;
                }
                .white {
                    color: white;
                }
                .black {
                    color: black;
                }
                .center {
                    text-align:center;
                }
                .modal {
                    display: flex; /* Hidden by default */
                    position: fixed; /* Stay in place */
                    z-index: 1; /* Sit on top */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0,0,0); /* Fallback color */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                }
                
                /* Modal Content/Box */
                .modal-content {
                    background-color: #fefefe;
                    margin: 15% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    color: black;
                }
                
                /* The Close Button */
                .close {
                    float: right;
                    font-size: 64px;
                    font-weight: bold;
                }
                
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
            `}</style>
        </Page>
    )
};

export default Index;