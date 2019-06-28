import React, { useState } from "react"
import { Form, Input, Row } from 'antd';

const { Search } = Input;

const SearchForm = (props) => { 
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
    }

    const resetInputField = () => { 
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        if (searchValue != "")
            props.search(searchValue)
        resetInputField()
    }

    return (
        <Row type="flex" justify="center">
            <Form layout="inline" type="flex" justify="center">
                <Form.Item>
                    <Search 
                        name="search" 
                        placeholder="Search Ticker" 
                        value={searchValue} 
                        onChange={handleSearchInputChanges} 
                        onSearch={callSearchFunction}
                        type="text" 
                        enterButton 
                    />
                </Form.Item>
            </Form>
        </Row>
    )
}

export default SearchForm;