import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import { bindActionCreators } from 'redux';
import { setAppElements, setPageElements, setPageCount } from '../../redux/actions/dataActions';
import Paginator from './Paginator';
import { getElementsByPage } from '../../functions/dataFunctions';
import { catchError } from '../../redux/actions/appStatusActions';

const Table = (props) => {
    useEffect(() => {
        let pageElements = [];
        if (!props.filterText && !props.appElements.length) {
            pageElements = getElementsByPage(props.fullData, props.currentPage);
            props.actions.setAppElements(props.fullData);
        } else {
            pageElements = getElementsByPage(props.appElements, props.currentPage);
        }
        props.actions.setPageElements(pageElements);
    }, [props.fullData, props.appElements, props.currentPage]);

    const renderFilterEmptyMessage = () => {
        return (
            <p id={'filter-empty-message'}>
                Нет элементов списка, которые соответствуют Вашему запросу
            </p>
        );
    };

    const renderTable = () => {
        try {
            if (props.filterText && !props.appElements.length) {
                return renderFilterEmptyMessage();
            }

            return [
                <div className={'table'} key={'table'}>
                    <TablePanel />
                    {props.pageElements.map((element, index) => (
                        <TableElement
                            element={element}
                            elementIndex={index}
                            key={`tableElement${index}`}
                        />
                    ))}
                </div>,
                <div className={'paginator-container'} key={'paginatorContainer'}>
                    {props.pageCount > 1 ? <Paginator key={'paginator'} /> : ''}
                </div>,
            ];
        } catch (error) {
            props.actions.catchError(error);
        }
    };

    return <>{props.fullData.length ? <>{renderTable()}</> : ''}</>;
};

const mapStateToProps = (state) => {
    return {
        appElements: state.data.appElements,
        fullData: state.data.fullData,
        pageElements: state.data.pageElements,
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
                setPageElements,
                catchError,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
