import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSortingMap } from '../../redux/actions/filterActions';
import { setAppElements, setPageCount } from '../../redux/actions/dataActions';
import { getAppElements, getPagesCount } from '../../functions/dataFunctions';
import { catchError } from '../../redux/actions/appStatusActions';

const TablePanel = (props) => {
    const tableButtonClickHandle = (event) => {
        event.preventDefault();
        try {
            const newMap = new Map(props.sortingMap);
            toggleSortingField(newMap, event.target.value);
            sortElements(newMap);
        } catch (error) {
            props.actions.catchError(error);
        }
    };

    const toggleSortingField = (sortingMap, fieldValue) => {
        if (!sortingMap.has(fieldValue)) {
            sortingMap.set(fieldValue, 'asc');
        } else if (sortingMap.get(fieldValue) === 'asc') {
            sortingMap.set(fieldValue, 'desc');
        } else if (sortingMap.get(fieldValue) === 'desc') {
            sortingMap.delete(fieldValue);
        }
        props.actions.setSortingMap(sortingMap.entries());
    };

    const sortElements = (sortingMap) => {
        const newArrayOfAppElements = props.filter.filterText
            ? getAppElements(
                  props.fullData,
                  sortingMap,
                  props.filter
              )
            : getAppElements(props.fullData, sortingMap);
        const pageCount = getPagesCount(newArrayOfAppElements);
        props.actions.setAppElements(newArrayOfAppElements);
        props.actions.setPageCount(pageCount);
    };

    const getArrow = (field) => {
        if (!props.sortingMap.has(field)) {
            return '';
        } else if (props.sortingMap.get(field) === 'asc') {
            return 'up-arrow';
        }
        return 'down-arrow';
    };

    return (
        <div className={'table-row panel'}>
            <button
                className={`table-cell-button id ${getArrow('id')}`}
                value={'id'}
                onClick={tableButtonClickHandle}>
                Id
            </button>
            <button
                className={`table-cell-button ${getArrow('firstName')}`}
                value={'firstName'}
                onClick={tableButtonClickHandle}>
                First Name
            </button>
            <button
                className={`table-cell-button ${getArrow('lastName')}`}
                value={'lastName'}
                onClick={tableButtonClickHandle}>
                Last Name
            </button>
            <button
                className={`table-cell-button ${getArrow('email')}`}
                value={'email'}
                onClick={tableButtonClickHandle}>
                Email
            </button>
            <button
                className={`table-cell-button ${getArrow('phone')}`}
                value={'phone'}
                onClick={tableButtonClickHandle}>
                Phone
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        sortingMap: state.filter.sortingMap,
        filter: {
            filterText: state.filter.filterText,
            filterFields: state.filter.filterFields,
        },
        fullData: state.data.fullData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setSortingMap,
                setAppElements,
                setPageCount,
                catchError,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePanel);
