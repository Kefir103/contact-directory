import React from 'react';
import LoadBtnContainer from './LoadBtnContainer';
import { connect } from 'react-redux';
import FilterContainer from './FilterContainer';

const SideMenu = (props) => {
    return (
        <aside>
            <LoadBtnContainer />
            {props.fullData.length ? <FilterContainer /> : ''}
        </aside>
    );
};

const mapStateToProps = (state) => {
    return {
        fullData: state.data.fullData,
    };
};

export default connect(mapStateToProps)(SideMenu);
