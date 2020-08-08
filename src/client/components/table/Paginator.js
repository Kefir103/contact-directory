import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage } from '../../redux/actions/filterActions';

const Paginator = (props) => {
    const isCurrentPage = (currentPage, buttonText) => {
        return currentPage === buttonText ? 'selected' : '';
    };

    const handleFirstPageButtonClick = () => {
        props.actions.setCurrentPage(1);
    };

    const handlePageButtonClick = (event) => {
        props.actions.setCurrentPage(Number(event.target.value));
    };

    const handleLastPageButtonClick = () => {
        props.actions.setCurrentPage(props.pageCount);
    };

    const renderButtons = (pageCount, currentPage) => {
        const buttons = [];
        for (let i = 1, iCounter = 0; i <= pageCount && iCounter < 5; i++) {
            if (Math.abs(i - currentPage) <= 2) {
                buttons.push(
                    <button
                        className={`page-button ${isCurrentPage(currentPage, i)}`}
                        onClick={handlePageButtonClick}
                        value={i}
                        key={`pageBtn${i}`}>
                        {i}
                    </button>
                );
                iCounter++;
            }
        }
        return buttons;
    };

    return (
        <div className={'paginator'}>
            <button
                className={'page-button arrow'}
                onClick={handleFirstPageButtonClick}
                style={
                    props.currentPage - 3 > 0 && props.pageCount > 5
                        ? { visibility: 'visible' }
                        : { visibility: 'hidden' }
                }>
                &lt;&lt;
            </button>
            {renderButtons(props.pageCount, props.currentPage)}
            <button
                className={'page-button arrow'}
                onClick={handleLastPageButtonClick}
                style={
                    props.pageCount - props.currentPage > 2 && props.pageCount > 5
                        ? { visibility: 'visible' }
                        : { visibility: 'hidden' }
                }>
                &gt;&gt;
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.filter.currentPage,
        pageCount: state.data.pageCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setCurrentPage,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
