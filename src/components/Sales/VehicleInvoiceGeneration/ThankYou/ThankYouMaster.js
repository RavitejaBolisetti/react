/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography } from 'antd';

import { VehicleReceiptFormButton } from '../VehicleInvoiceFormButton';
import { LANGUAGE_EN } from 'language/en';
import { HiCheck } from 'react-icons/hi';

import styles from 'components/common/Common.module.css';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const title = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_OTF.TITLE;
    const message = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_OTF.MESSAGE.replace('{ORDER_ID}', props?.selectedOrderId);

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space direction="vertical">
                        <Avatar size={180} icon={<HiCheck />} />
                        <Title level={5}>{title}</Title>
                        <Text>{message}</Text>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleReceiptFormButton {...props} />
                </Col>
            </Row>
        </>
    );
};
