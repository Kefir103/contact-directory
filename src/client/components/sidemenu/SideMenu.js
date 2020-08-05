import React from 'react';
import LoadBtnContainer from './LoadBtnContainer';
import { connect } from 'react-redux';

const SideMenu = () => {
    return (
        <aside>
            <LoadBtnContainer />
        </aside>
    );
};

export default connect()(SideMenu);
