import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './BranchPage.module.css';

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

const BranchPageBase = (props) => {
    return (
        <Row>
            <Col>Coming Soon! </Col>
        </Row>
    );
};

export const BranchPage = connect(mapStateToProps, null)(withLayoutMaster(BranchPageBase));
