import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeElementDescription } from '../../redux/actions/dataActions';

const EntryInfo = (props) => {
    const handleDescriptionChange = (event) => {
        props.actions.changeElementDescription(
            event.target.value,
            props.elementIndex,
            props.element.id
        );
    };

    return (
        <div className={'entry-info'} key={`entryInfo-for-${props.element.id}`}>
            <p key={`${props.element.firstName}-${props.element.lastName}`}>
                Выбран пользователь:{' '}
                <b>
                    {props.element.firstName} {props.element.lastName}
                </b>
            </p>
            <p>Описание:</p>
            <textarea
                id={'textarea-info-description'}
                onChange={handleDescriptionChange}
                value={props.element.description ? props.element.description : ''}
            />
            {props.element.address
                ? [
                      <p key={`${props.element.address.streetAddress}`}>
                          Адрес проживания: <b>{props.element.address.streetAddress}</b>
                      </p>,
                      <p key={`${props.element.address.city}`}>
                          Город: <b>{props.element.address.city}</b>
                      </p>,
                      <p key={`${props.element.address.state}`}>
                          Провинция/штат: <b>{props.element.address.state}</b>
                      </p>,
                      <p key={`${props.element.address.zip}`}>
                          Индекс: <b>{props.element.address.zip}</b>
                      </p>,
                  ]
                : ''}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        element: state.data.currentElement.elementInfo,
        elementIndex: state.data.currentElement.elementIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                changeElementDescription,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryInfo);
