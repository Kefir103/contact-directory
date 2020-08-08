import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { setCurrentPage, setFilterFields, setFilterText } from '../../redux/actions/filterActions';
import { setAppElements, setPageCount } from '../../redux/actions/dataActions';
import { getAppElements, getPagesCount } from '../../functions/dataFunctions';

const FilterContainer = (props) => {
    const handleFilterFormSubmit = (event) => {
        event.preventDefault();
        if (props.filterText) {
            const newAppElements = getAppElements(
                props.fullData,
                { filterText: props.filterText, filterFields: props.filterFields },
                props.sortingMap
            );
            const pageCount = getPagesCount(newAppElements);
            props.actions.setAppElements(newAppElements);
            props.actions.setPageCount(pageCount);
            if (props.currentPage > pageCount) {
                props.actions.setCurrentPage(pageCount);
            }
        }
    };

    const handleFilterTextChanged = (event) => {
        event.preventDefault();
        props.actions.setFilterText(event.target.value);
        if (!event.target.value) {
            const newAppElements = getAppElements(props.fullData, null, props.sortingMap);
            const pageCount = getPagesCount(newAppElements);
            props.actions.setAppElements(newAppElements);
            props.actions.setPageCount(pageCount);
            if (props.currentPage === 0) {
                props.actions.setCurrentPage(1);
            }
        }
    };

    const handleFilterValueChecked = (event) => {
        if (event.target.checked) {
            props.actions.setFilterFields([...props.filterFields, event.target.name]);
        } else {
            const deletingElementIndex = props.filterFields.findIndex(
                (field) => field === event.target.name
            );
            const newFilterFields = [...props.filterFields];
            newFilterFields.splice(deletingElementIndex, 1);
            props.actions.setFilterFields(newFilterFields);
        }
    };

    return (
        <div className={'filter-container'}>
            <p>Фильтрация данных</p>
            <form id={'filter-form'} onSubmit={handleFilterFormSubmit}>
                <input
                    type={'search'}
                    placeholder={'Введите данные'}
                    value={props.filterText}
                    onChange={handleFilterTextChanged}
                />
                <button type={'submit'} disabled={!(props.filterText && props.filterFields.length)}>
                    <FontAwesomeIcon icon={faSearch} size={'1x'} />
                </button>
                <label>
                    <input
                        type={'checkbox'}
                        name={'id'}
                        onChange={handleFilterValueChecked}
                        disabled={!props.filterText}
                    />
                    Id
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'firstName'}
                        onChange={handleFilterValueChecked}
                        disabled={!props.filterText}
                    />
                    First Name
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'lastName'}
                        onChange={handleFilterValueChecked}
                        disabled={!props.filterText}
                    />
                    Last Name
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'email'}
                        onChange={handleFilterValueChecked}
                        disabled={!props.filterText}
                    />
                    E-Mail
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'phone'}
                        onChange={handleFilterValueChecked}
                        disabled={!props.filterText}
                    />
                    Phone
                </label>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        filterFields: state.filter.filterFields,
        filterText: state.filter.filterText,
        fullData: state.data.fullData,
        sortingMap: state.filter.sortingMap,
        currentPage: state.filter.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setFilterFields,
                setFilterText,
                setAppElements,
                setPageCount,
                setCurrentPage,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
