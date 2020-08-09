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
            {!props.error ? (
                [
                    <SideMenu key={'sideMenu'} />,
                    <div className={'app-container'} key={'appContainer'}>
                        {!props.isLoading ? (
                            [
                                <AddEntryComponent key={'addEntryComponent'} />,
                                <Table key={'table'} />,
                                <div className={'entry-info-container'} key={'entryInfoContainer'}>
                                    {props.currentElement.elementInfo ? <EntryInfo /> : ''}
                                </div>,
                            ]
                        ) : (
                            <Loader />
                        )}
                    </div>,
                ]
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
