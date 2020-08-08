import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedElement } from '../../redux/actions/dataActions';

const TableElement = (props) => {
    const handleElementRowClick = () => {
        props.actions.setSelectedElement(props.element, props.elementIndex);
    };

    const isRowIsCurrentElement = () => {
        return props.selectedElement &&
            props.selectedElement.id === props.currentElements[props.elementIndex].id
            ? ' selected-row'
            : '';
    };

    return (
        <div
            className={`table-row${isRowIsCurrentElement()}`}
            onClick={() => handleElementRowClick()}>
            <div className={'table-cell id'}>{props.element.id}</div>
            <div className={'table-cell'}>{props.element.firstName}</div>
            <div className={'table-cell'}>{props.element.lastName}</div>
            <div className={'table-cell'}>{props.element.email}</div>
            <div className={'table-cell'}>{props.element.phone}</div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentElements: state.data.currentElements,
        element: ownProps.element,
        elementIndex: ownProps.elementIndex,
        selectedElement: state.data.currentElement.elementInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setSelectedElement,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);
