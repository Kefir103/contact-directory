import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSortingMap } from '../../redux/actions/filterActions';
import { setData } from '../../redux/actions/dataActions';

const TablePanel = (props) => {
    const tableButtonClickHandle = (event) => {
        event.preventDefault();
        const newMap = new Map(props.sortingMap);

        if (!newMap.has(event.target.value)) {
            newMap.set(event.target.value, 'asc');
        } else if (newMap.get(event.target.value) === 'asc') {
            newMap.set(event.target.value, 'desc');
        } else if (newMap.get(event.target.value) === 'desc') {
            newMap.delete(event.target.value);
        }

        props.actions.setSortingMap(newMap.entries());
        props.actions.setData(props.elements, newMap);
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
        <p className={'table-row panel'}>
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
        </p>
    );
};

const mapStateToProps = (state) => {
    return {
        sortingMap: state.filter.sortingMap,
        elements: state.data.elements,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setSortingMap,
                setData,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePanel);
