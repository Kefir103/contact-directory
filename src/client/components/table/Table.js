import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import Loader from '../Loader';
import { bindActionCreators } from 'redux';
import { setAppElements } from '../../redux/actions/dataActions';

const Table = (props) => {
    useEffect(() => {
        if (!props.filterText && !props.appElements.length) {
            props.actions.setAppElements(props.fullData);
        }
    }, [props.fullData, props.appElements]);

    const renderFilterEmptyMessage = () => {
        return (
            <p id={'filter-empty-message'}>
                Нет элементов списка, которые соответствуют Вашему запросу
            </p>
        );
    };

    const renderTable = () => {
        if (props.filterText && !props.appElements.length) {
            return renderFilterEmptyMessage();
        }

        let elementsArray = [];
        if (props.appElements.length) {
            elementsArray = [...props.appElements];
        } else {
            elementsArray = [...props.fullData];
        }
        elementsArray = elementsArray.map((element, index) => (
            <TableElement element={element} elementIndex={index} />
        ));

        return (
            <p className={'table'}>
                <TablePanel />
                {elementsArray}
            </p>
        );
    };

    return (
        <>
            {!props.isLoading ? (
                <>{props.fullData.length ? <>{renderTable()}</> : ''}</>
            ) : (
                <Loader />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        appElements: state.data.appElements,
        fullData: state.data.fullData,
        isLoading: state.appStatus.isLoading,
        filterText: state.filter.filterText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setAppElements,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
