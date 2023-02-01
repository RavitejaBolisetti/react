import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './SettingPage.module.css';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const SettingPageBase = (props) => {
    return (
        <Row>
            <Col>Setting Page</Col>
        </Row>
    );
};

export const SettingPage = connect(mapStateToProps, null)(withLayoutMaster(SettingPageBase));
