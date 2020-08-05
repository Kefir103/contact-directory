import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { setFilterFields, setFilterText } from '../../redux/actions/filterActions';
import { filterElements } from '../../redux/actions/dataActions';

const FilterContainer = (props) => {
    const handleFilterFormSubmit = (event) => {
        event.preventDefault();
        if (props.filterText) {
            props.actions.filterElements(props.elements, props.filterText, props.filterFields);
        }
    };

    const handleFilterTextChanged = (event) => {
        event.preventDefault();
        props.actions.setFilterText(event.target.value);
        if (!event.target.value) {
            props.actions.filterElements();
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
                    <input type={'checkbox'} name={'id'} onChange={handleFilterValueChecked} />
                    Id
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'firstName'}
                        onChange={handleFilterValueChecked}
                    />
                    First Name
                </label>
                <label>
                    <input
                        type={'checkbox'}
                        name={'lastName'}
                        onChange={handleFilterValueChecked}
                    />
                    Last Name
                </label>
                <label>
                    <input type={'checkbox'} name={'email'} onChange={handleFilterValueChecked} />
                    E-Mail
                </label>
                <label>
                    <input type={'checkbox'} name={'phone'} onChange={handleFilterValueChecked} />
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
        elements: state.data.elements,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setFilterFields,
                setFilterText,
                filterElements,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
