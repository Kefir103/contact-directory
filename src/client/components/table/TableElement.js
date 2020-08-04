import React from 'react';
import { connect } from 'react-redux';

const TableElement = (props) => {
    return (
        <p className={'table-row'}>
            <div className={'table-cell id'}>{props.element.id}</div>
            <div className={'table-cell'}>{props.element.firstName}</div>
            <div className={'table-cell'}>{props.element.lastName}</div>
            <div className={'table-cell'}>{props.element.email}</div>
            <div className={'table-cell'}>{props.element.phone}</div>
        </p>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);
