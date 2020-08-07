import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    changeInputElementField,
    changeValidateInputs,
    changeIsAddButtonDisabled,
    changeIsInputFormOpen,
    removeInputData,
    changeInputAddingStatus,
    resetValidInputs,
    setFullData,
    setAppElements, setPageCount,
} from '../../redux/actions/dataActions';
import {getAppElements, getPagesCount} from '../../functions/dataFunctions';

const AddEntryComponent = (props) => {
    const areFieldsTrue = (object) => {
        for (const field in object) {
            if (!object[field]) {
                return false;
            }
        }
        return true;
    };

    const validateInput = (event, pattern) => {
        const regExp = new RegExp(pattern);
        const fieldName = event.target.name;

        const isValid = regExp.test(event.target.value);
        const nowValidInputs = { ...props.validInputs };
        nowValidInputs[fieldName] = isValid;

        props.actions.changeValidateInputs(fieldName, isValid);
        if (areFieldsTrue(nowValidInputs)) {
            props.actions.changeIsAddButtonDisabled(false);
        } else {
            props.actions.changeIsAddButtonDisabled(true);
        }

        return nowValidInputs[fieldName];
    };

    const handleInputIdChange = (event) => {
        validateInput(event, /^(0|[1-9][0-9]*)$/g);
        props.actions.changeInputElementField(event.target.name, Number(event.target.value));
    };

    const handleInputNameChange = (event) => {
        validateInput(event, /^[A-Za-z]+(\s[A-Z]*[a-z]*)*$/);
        props.actions.changeInputElementField(event.target.name, event.target.value);
    };

    const handleInputEmailChange = (event) => {
        validateInput(
            event,
            /^[A-Za-z0-9]+([_\-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([_\-]?[A-Za-z0-9]+)*(\.[_\-]?[A-Za-z0-9]+)*(\.[a-z]+)$/
        );
        props.actions.changeInputElementField(event.target.name, event.target.value);
    };

    const handleInputPhoneChange = (event) => {
        validateInput(event, /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/);
        props.actions.changeInputElementField(event.target.name, event.target.value);
    };

    const handleAddButtonClick = () => {
        const isFormOpen = props.isFormOpen;
        if (!isFormOpen) {
            props.actions.changeIsInputFormOpen(true);
            props.actions.changeIsAddButtonDisabled(true);
        } else {
            if (
                props.fullData.findIndex((element) => element.id === props.inputElement.id) !== -1
            ) {
                props.actions.changeInputAddingStatus('Элемент с таким id уже существует!', true);
            } else {
                props.actions.changeInputAddingStatus('Пользователь успешно добавлен!', false);
                const newArrayOfFullData = [props.inputElement, ...props.fullData];
                const newArrayOfAppElements = getAppElements(
                    newArrayOfFullData,
                    props.filter,
                    props.sortingMap
                );
                const pageCount = getPagesCount(newArrayOfAppElements);
                props.actions.setFullData(newArrayOfFullData);
                props.actions.setAppElements(newArrayOfAppElements);
                props.actions.setPageCount(pageCount);
            }
            props.actions.changeIsAddButtonDisabled(false);
        }
    };

    const handleCloseFormButtonClick = () => {
        props.actions.changeIsInputFormOpen(false);
        props.actions.changeIsAddButtonDisabled(false);
        props.actions.removeInputData();
        props.actions.changeInputAddingStatus('', false);
        props.actions.resetValidInputs();
    };

    return (
        <div className={'add-entry-component'}>
            <button
                className={'add-button'}
                disabled={props.isAddButtonDisabled}
                onClick={handleAddButtonClick}>
                Добавить
            </button>
            <div
                className={'add-entry-component input-form'}
                style={props.isFormOpen ? { display: 'flex' } : { display: 'none' }}>
                <div className={'add-entry-component inputs'}>
                    <label className={'add-entry-component label-input'}>
                        Id
                        <input
                            type={'text'}
                            name={'id'}
                            placeholder={'Id'}
                            onChange={handleInputIdChange}
                            value={props.inputElement.id || ''}
                            autoComplete={'off'}
                            className={
                                props.validInputs.id || !props.inputElement.id ? '' : 'error-input'
                            }
                        />
                    </label>
                    <label className={'add-entry-component label-input'}>
                        First Name
                        <input
                            type={'text'}
                            name={'firstName'}
                            placeholder={'First Name'}
                            onChange={handleInputNameChange}
                            value={props.inputElement.firstName}
                            autoComplete={'off'}
                            className={
                                props.validInputs.firstName || !props.inputElement.firstName
                                    ? ''
                                    : 'error-input'
                            }
                        />
                    </label>
                    <label className={'add-entry-component label-input'}>
                        Last Name
                        <input
                            type={'text'}
                            name={'lastName'}
                            placeholder={'Last Name'}
                            onChange={handleInputNameChange}
                            value={props.inputElement.lastName}
                            autoComplete={'off'}
                            className={
                                props.validInputs.lastName || !props.inputElement.lastName
                                    ? ''
                                    : 'error-input'
                            }
                        />
                    </label>
                    <label className={'add-entry-component label-input'}>
                        Email
                        <input
                            type={'text'}
                            name={'email'}
                            placeholder={'Email'}
                            onChange={handleInputEmailChange}
                            value={props.inputElement.email}
                            autoComplete={'off'}
                            className={
                                props.validInputs.email || !props.inputElement.email
                                    ? ''
                                    : 'error-input'
                            }
                        />
                    </label>
                    <label className={'add-entry-component label-input'}>
                        Phone
                        <input
                            type={'text'}
                            name={'phone'}
                            placeholder={'Phone'}
                            onChange={handleInputPhoneChange}
                            value={props.inputElement.phone}
                            autoComplete={'off'}
                            className={
                                props.validInputs.phone || !props.inputElement.phone
                                    ? ''
                                    : 'error-input'
                            }
                        />
                    </label>
                </div>
                <p
                    className={
                        props.addingStatus.isError ? 'input-error-status' : 'input-fine-status'
                    }>
                    {props.addingStatus.addingStatusText}
                </p>
                <button className={'close-form-button'} onClick={handleCloseFormButtonClick}>
                    Закрыть окно
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        inputElement: state.data.inputContainer.inputElement,
        validInputs: state.data.inputContainer.validInputs,
        isFormOpen: state.data.inputContainer.isFormOpen,
        isAddButtonDisabled: state.data.inputContainer.isAddButtonDisabled,
        appElements: state.data.appElements,
        fullData: state.data.fullData,
        sortingMap: state.filter.sortingMap,
        addingStatus: state.data.inputContainer.addingStatus,
        filter: {
            filterText: state.filter.filterText,
            filterFields: state.filter.filterFields,
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                changeInputElementField,
                changeValidateInputs,
                changeIsAddButtonDisabled,
                changeIsInputFormOpen,
                removeInputData,
                setFullData,
                setAppElements,
                changeInputAddingStatus,
                resetValidInputs,
                setPageCount,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryComponent);
