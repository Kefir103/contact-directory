import React from 'react';
import { connect } from 'react-redux';
import Table from "./components/table/Table";

const App = (props) => {
    return (
        <>
            <Table />
        </>
    );
};

export default connect()(App);
