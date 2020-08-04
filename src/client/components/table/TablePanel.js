import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSortingMap } from '../../redux/actions/filterActions';
import { setData } from '../../redux/actions/dataActions';

const TablePanel = (props) => {
    const tableButtonClickHandle = (event) => {
        event.preventDefault();
        const newMap = new Map(props.sortingMap);

        if (newMap.get(event.target.value) === 'asc') {
            newMap.set(event.target.value, 'desc');
        } else {
            newMap.set(event.target.value, 'asc');
        }

        props.actions.setSortingMap(newMap.entries());
        props.actions.setData(props.elements, newMap);
    };

    return (
        <p className={'table-row panel'}>
            <button
                className={`table-cell-button id ${
                    props.sortingMap.get('id') === 'asc' ? 'down-arrow' : 'up-arrow'
                }`}
                value={'id'}
                onClick={tableButtonClickHandle}>
                Id
            </button>
            <button
                className={`table-cell-button ${
                    props.sortingMap.get('firstName') === 'asc' ? 'down-arrow' : 'up-arrow'
                }`}
                value={'firstName'}
                onClick={tableButtonClickHandle}>
                First Name
            </button>
            <button
                className={`table-cell-button ${
                    props.sortingMap.get('lastName') === 'asc' ? 'down-arrow' : 'up-arrow'
                }`}
                value={'lastName'}
                onClick={tableButtonClickHandle}>
                Last Name
            </button>
            <button
                className={`table-cell-button ${
                    props.sortingMap.get('email') === 'asc' ? 'down-arrow' : 'up-arrow'
                }`}
                value={'email'}
                onClick={tableButtonClickHandle}>
                Email
            </button>
            <button
                className={`table-cell-button ${
                    props.sortingMap.get('phone') === 'asc' ? 'down-arrow' : 'up-arrow'
                }`}
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
