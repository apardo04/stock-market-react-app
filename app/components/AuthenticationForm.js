import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import fetch from 'isomorphic-unfetch';

class AuthenticationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            success: false,
        };
        this.view = {
            login: {
                path: "/signin",
                name: "Login",
                errorMsg: "Cannot Login, please check that provided email and password are correct."
            },
            register: {
                path: "/signup",
                name: "Register",
                errorMsg: "Cannot Create User."
            }
        }
        this.vManager = (this.props.view === "login") ? this.view.login : this.view.register;
    }

    vManagerChanger = () => {
        this.vManager = this.view.register;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            fetch(this.vManager.path, {
                method: "post",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(values)
            }).then(async res => {
                if (res.status !== 200) {
                    this.setState({ error: true });
                }
                else if (this.vManager.name == "Register") {
                    this.setState({ success: true });
                }
                return await res.json();
            }).then(data => {
                if (this.vManager.name == "Login" && data.token) {
                    localStorage.setItem("stockAppToken", data.token);
                    this.setState({ success: true });
                    this.props.logIn()
                }
                
            }).catch(err => {
                if (err) this.setState({ error: true })
            }) 
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                { /* Move into Flash Message Component */ }
                { this.state.error && <p>{ this.vManager.errorMsg }</p> }
                { this.state.success && (
                    <p>{ this.vManager.name } Successful.</p>
                )}
                <Form.Item>
                    {
                        getFieldDecorator("email", { rules: [{ required: true, message: "Please enter valid email" }] })(
                            <Input 
                                name="email" 
                                placeholder="Enter your email" 
                                prefix={<Icon type="user"/>}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator("password", { rules: [{ required: true, message: "Please enter password!" }] })(
                            <Input 
                                name="password" 
                                type="password" 
                                placeholder="Enter your password"  
                                prefix={<Icon type="lock" />}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        { this.vManager.name }
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: "authForm" })(AuthenticationForm);