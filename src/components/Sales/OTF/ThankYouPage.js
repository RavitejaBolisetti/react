/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col } from 'antd';

import { OTFFormButton } from './OTFFormButton';
import SuccessPage from 'components/common/SuccessPage';
import { OTFStatusBar } from './utils/OTFStatusBar';
import { LANGUAGE_EN } from 'language/en';


import styles from 'components/common/Common.module.css';

const ThankYouPage = (props) => {

const title = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_OTF.TITLE;
const message = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_OTF.MESSAGE.replace('{NAME}', props?.selectedOrderId);


    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {/* <h2>{section?.title}</h2> */}
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    <SuccessPage title={title} subTitle={message}  />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </>
    );
};

export default ThankYouPage;