import React from 'react';
import { connect } from 'react-redux';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import Loader from '../Loader';

const Table = (props) => {
    const renderFilterEmptyMessage = () => {
        return (
            <p id={'filter-empty-message'}>
                Нет элементов списка, которые соответствуют Вашему запросу
            </p>
        );
    };

    const renderTable = () => {
        if (props.filteredElements && !props.filteredElements.length) {
            return renderFilterEmptyMessage();
        }

        let elementsArray = [];
        if (props.filteredElements && props.filteredElements.length) {
            elementsArray = props.filteredElements.map((element) => (
                <TableElement element={element} />
            ));
        } else if (props.elements.length) {
            elementsArray = props.elements.map((element) => <TableElement element={element} />);
        }

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
                <>
                    {props.elements.length ? (
                        <>{renderTable(props.elements, props.filteredElements)}</>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        elements: state.data.elements,
        filteredElements: state.data.filteredElements,
        isLoading: state.appStatus.isLoading,
    };
};

export default connect(mapStateToProps)(Table);
