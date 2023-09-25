/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography } from 'antd';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { LANGUAGE_EN } from 'language/en';
import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';

const { Title } = Typography;

export const ThankYouMaster = (props) => {
    const title = LANGUAGE_EN.GENERAL.DELIVERY_NOTE_MESSAGE.TITLE.replace('{NAME}', props?.soldByDealer ? 'Note' : 'Challan');
    const message = LANGUAGE_EN.GENERAL.DELIVERY_NOTE_MESSAGE.MESSAGE.replace('{ORDER_ID}', props?.vehicleDeliveryNote);

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        cancelBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: true,
        formBtnActive: false,
        cancelOTFBtn: false,
        transferOTFBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        changeHistory: false,
        otfSoMappingHistoryBtn: false,
    };
    const thankProp = {
        ...props,
        buttonData: { ...defaultBtnVisiblity },
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space direction="vertical">
                        <Avatar size={180} icon={<HiCheck />} />
                        <Title level={5}>{title}</Title>
                        {/* <Text>{message}</Text> */}
                        {/* <Text>{'Delivery Note No.:' + props?.vehicleDeliveryNote}</Text> */}
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...thankProp} />
                </Col>
            </Row>
        </>
    );
};
