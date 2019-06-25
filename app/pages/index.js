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
        .get(`http://localhost:3000/api/stocks?userID=${id}`)
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
                    <GetStock stockToFind={searchedStock} modal="true" user={loggedIn} getUserStocks={getUserStocks} />
                </Modal>
                <SearchForm search={search} />
            </Row>
                { loggedIn ?
                    <>
                        <Row type="flex" justify="center"><a onClick={logOut}>Log Out</a></Row>
                        {userStocks.map((stock, index) => {
                            return <GetStock stockToFind={stock} key={stock} portfolio="true" loggedIn={loggedIn} getUserStocks={getUserStocks} />
                        })}
                    </>
                :   
                    !registerForm ?
                    <>
                        <Row type="flex" justify="center">
                            <AuthenticationForm view={LOGIN} logIn={logIn}/>
                        </Row>
                        <Row type="flex" justify="center">
                            <a onClick={() => setRegisterForm(true)}>Or Register Now</a>
                        </Row>
                    </>
                :
                        <Row type="flex" justify="center">
                            <AuthenticationForm view={REGISTER} />
                        </Row>
                }
            <style jsx global>{`
                .red {
                    color: #f5222d;
                }
            `}</style>
        </Page>
    )
};

export default Index;