import React, { Fragment } from 'react';
import { Layout } from 'antd';
import Head from '../components/Head'
import Nav from '../components/Nav'

const Page = ({ children }) => (
    <Fragment>
        <Head />
        <Nav />
        <main>
            {children}
        </main>
    </Fragment>
);

export default Page;