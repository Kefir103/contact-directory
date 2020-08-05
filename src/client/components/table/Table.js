import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadData, setSelectedElement } from '../../redux/actions/dataActions';
import { setSortingMap } from '../../redux/actions/filterActions';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import Loader from '../Loader';

const Table = (props) => {
    const renderTable = (elements, filteredElements) => {
        if (props.isLoading === false) {
            if (filteredElements && filteredElements.length) {
                return [
                    <TablePanel />,
                    ...filteredElements.map((element) => <TableElement element={element} />),
                ];
            } else if (filteredElements && !filteredElements.length) {
                return (
                    <p id={'filter-error-message'}>
                        Нет элементов списка, которые соответствуют Вашему запросу
                    </p>
                );
            } else if (elements.length) {
                return [
                    <TablePanel />,
                    ...elements.map((element) => <TableElement element={element} />),
                ];
            }
        } else if (props.isLoading === true) {
            return <Loader />;
        }
        return '';
    };

    return <p className={'table'}>{renderTable(props.elements, props.filteredElements)}</p>;
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
