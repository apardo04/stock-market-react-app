import React from "react";
import App, { Container as NextContainer } from "next/app";
import Nav from "../components/nav";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try{
      if (ctx.req && ctx.req.session && ctx.req.session.passport) {
        pageProps.user = ctx.req.session.passport.user;
      }
    } catch(error) {
      console.log(error + " = error from _app get initial props")
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }
  async componentDidMount() {

  }
  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user,
    };

    return (
      <NextContainer>
        <Nav user={this.state.user} />
        <Component {...props} />
      </NextContainer>
    );
  }
}

export default MyApp;