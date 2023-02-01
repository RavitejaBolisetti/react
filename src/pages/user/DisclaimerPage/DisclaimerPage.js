import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './DisclaimerPage.module.css';

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

const DisclaimerPageBase = (props) => {
    return (
        <Row>
            <Col>Coming Soon! </Col>
        </Row>
    );
};

export const DisclaimerPage = connect(mapStateToProps, null)(withLayoutMaster(DisclaimerPageBase));
