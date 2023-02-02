import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './SettingPage.module.css';
import MetaTag from 'utils/MetaTag';

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
        <>
            <MetaTag metaTitle={'Setting'} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                            <div>
                                <span className={styles.headingGradient}>Setting</span>
                            </div>
                        </Col>
                        {/* <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                            <Button danger onclick="window.location.href='#'" className={styles.btnOutline}>
                                Exit
                            </Button>
                        </Col> */}
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
        </>
    );
};

export const SettingPage = connect(mapStateToProps, null)(withLayoutMaster(SettingPageBase));
