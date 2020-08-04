import React from 'react';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import LoadBtnContainer from './components/LoadBtnContainer';

const App = (props) => {
    return (
        <>
            <LoadBtnContainer />
            {!props.isLoading ? <Table /> : ''}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.appStatus.isLoading,
    };
};

export default connect(mapStateToProps)(App);
