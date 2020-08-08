import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import Loader from '../Loader';
import { bindActionCreators } from 'redux';
import { setAppElements, setCurrentElements, setPageCount } from '../../redux/actions/dataActions';
import Paginator from './Paginator';
import { getElementsByPage } from '../../functions/dataFunctions';

const Table = (props) => {
    useEffect(() => {
        let currentElements = [];
        if (!props.filterText && !props.appElements.length) {
            currentElements = getElementsByPage(props.fullData, props.currentPage);
            props.actions.setAppElements(props.fullData);
        } else {
            currentElements = getElementsByPage(props.appElements, props.currentPage);
        }
        props.actions.setCurrentElements(currentElements);
    }, [props.fullData, props.appElements, props.currentPage]);

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

        return [
            <p className={'table'}>
                <TablePanel />
                {props.currentElements.map((element, index) => (
                    <TableElement element={element} elementIndex={index} />
                ))}
            </p>,
            <>{props.pageCount > 1 ? <Paginator /> : ''}</>,
        ];
    };

    return <>{props.fullData.length ? <>{renderTable()}</> : ''}</>;
};

const mapStateToProps = (state) => {
    return {
        appElements: state.data.appElements,
        fullData: state.data.fullData,
        currentElements: state.data.currentElements,
        isLoading: state.appStatus.isLoading,
        filterText: state.filter.filterText,
        pageCount: state.data.pageCount,
        currentPage: state.filter.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setAppElements,
                setPageCount,
                setCurrentElements,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
