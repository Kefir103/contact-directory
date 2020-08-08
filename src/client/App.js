import React from 'react';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import SideMenu from './components/sidemenu/SideMenu';
import Header from './components/Header';
import AddEntryComponent from './components/entry/AddEntryComponent';
import EntryInfo from './components/entry/EntryInfo';
import { Error } from './components/Error';
import Loader from './components/Loader';

const App = (props) => {
    return (
        <>
            <Header />
            <SideMenu />
            {!props.error ? (
                <div className={'app-container'}>
                    {!props.isLoading ? (
                        [
                            <AddEntryComponent />,
                            <Table />,
                            <>{props.currentElement.elementInfo ? <EntryInfo /> : ''}</>,
                        ]
                    ) : (
                        <Loader />
                    )}
                </div>
            ) : (
                <Error />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.appStatus.isLoading,
        currentElement: state.data.currentElement,
        error: state.appStatus.error,
    };
};

export default connect(mapStateToProps)(App);
