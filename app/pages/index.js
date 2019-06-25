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
                <Modal
                    visible={stockModal}
                    title={searchedStock}                
                    onCancel={() => toggleStockModal(false)}
                    footer={[
                    <Button key="back" onClick={() => toggleStockModal(false)}>
                        Return
                    </Button>
                    ]}
                >
                    <GetStock stockToFind={searchedStock} id={userID} loggedIn={loggedIn} getUserStocks={getUserStocks} />
                </Modal>
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
            `}</style>
        </Page>
    )
};

export default Index;