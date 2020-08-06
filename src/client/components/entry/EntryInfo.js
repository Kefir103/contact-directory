import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeElementDescription } from '../../redux/actions/dataActions';

const EntryInfo = (props) => {
    const handleDescriptionChange = (event) => {
        props.actions.changeElementDescription(event.target.value, props.elementIndex);
    };

    return (
        <div className={'entry-info'}>
            <p>
                Выбран пользователь:{' '}
                <b>
                    {props.element.firstName} {props.element.lastName}
                </b>
            </p>
            <p>Описание:</p>
            <textarea
                id={'textarea-info-description'}
                onChange={handleDescriptionChange}
                value={props.element.description}
            />
            <p>
                Адрес проживания: <b>{props.element.address.streetAddress}</b>
            </p>
            <p>
                Город: <b>{props.element.address.city}</b>
            </p>
            <p>
                Провинция/штат: <b>{props.element.address.state}</b>
            </p>
            <p>
                Индекс: <b>{props.element.address.zip}</b>
            </p>
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
