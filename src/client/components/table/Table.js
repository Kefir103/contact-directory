import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadData, setSelectedElement } from '../../redux/actions/dataActions';
import { setSortingMap } from '../../redux/actions/filterActions';
import TablePanel from './TablePanel';
import TableElement from './TableElement';

const Table = (props) => {
    useEffect(() => {
        props.actions.loadData(
            'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        );
    }, []);

    return (
        <p className={'table'}>
            <TablePanel />
            {props.elements.length !== 0
                ? props.elements.map((element) => {
                      return <TableElement element={element} />;
                  })
                : ''}
        </p>
    );
};

const mapStateToProps = (state) => {
    return {
        elements: state.data.elements,
        filteredElements: state.data.filteredElements,
        isLoading: state.appStatus.isLoading,
        currentElement: state.data.currentElement,
        sortingMap: state.filter.sortingMap,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setSelectedElement,
                setSortingMap,
                loadData,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
