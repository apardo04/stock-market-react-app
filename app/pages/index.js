import { useState, useEffect } from 'react'
import Page from '../layouts/page';
import { Row, Modal, Button } from 'antd';
import AuthenticationForm from '../components/AuthenticationForm'
import SearchForm from  '../components/SearchForm'
import GetStock from '../components/GetStock';

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

    function logIn() {
        setLoggedIn(true);
    }

    const search = searchValue => {
        setSearchedStock(searchValue)
        toggleStockModal(true)
    }

    const getUserStocks = () => {
        setLoading(true);    
        setErrorMessage(null);
    
        let dataArr = []
        Axios
        .get(`localhost:3000/api/stocks?userID=${loggedInUser.sub}`)
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
        if (loggedIn) 
          getUserStocks()
      }, [])

    return(
        <Page>
            <Row type="flex" justify="center">        
                <Modal
                    visible={stockModal}
                    title="Title"                        
                    onCancel={() => toggleStockModal(false)}
                    footer={[
                    <Button key="back" onClick={() => toggleStockModal(false)}>
                        Return
                    </Button>
                    ]}
                />
                <SearchForm search={search} />
            </Row>
                { loggedIn ?
                    <></>
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