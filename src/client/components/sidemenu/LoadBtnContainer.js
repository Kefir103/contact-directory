import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadData } from '../../redux/actions/dataActions';

const LoadBtnContainer = (props) => {
    const urlSmallData =
        'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    const urlBigData =
        'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    return (
        <p className={'load-btn-container'}>
            <button
                className={'load-btn'}
                onClick={() => props.actions.loadData(urlSmallData)}>
                Загрузить малый объем данных
            </button>
            <button
                className={'load-btn'}
                onClick={() => props.actions.loadData(urlBigData)}>
                Загрузить большой объем данных
            </button>
        </p>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loadData,
            },
            dispatch
        ),
    };
};

export default connect(null, mapDispatchToProps)(LoadBtnContainer);
