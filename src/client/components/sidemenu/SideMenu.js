import React from 'react';
import LoadBtnContainer from './LoadBtnContainer';
import { connect } from 'react-redux';
import FilterContainer from './FilterContainer';

const SideMenu = () => {
    return (
        <aside>
            <LoadBtnContainer />
            <FilterContainer />
        </aside>
    );
};

export default connect()(SideMenu);
