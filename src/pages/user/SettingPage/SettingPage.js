import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';

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

const SettingPageBase = () => {
    return (
        <>
            <Row>
                <Col>Coming Soon!</Col>
            </Row>
        </>
    );
};

export const SettingPage = connect(mapStateToProps, null)(withLayoutMaster(SettingPageBase));
