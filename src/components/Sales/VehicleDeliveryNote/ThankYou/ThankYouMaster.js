/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Divider, Button } from 'antd';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { useMemo } from 'react';
import { translateContent } from 'utils/translateContent';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { handlePrintDownload, record, selectedOrder } = props;
    const messageList = selectedOrder?.responseMessage?.split(' ');
    const message = selectedOrder?.responseMessage?.split('.')?.[0];

    const ThankYoutitles = useMemo(() => {
        switch (props?.soldByDealer) {
            case true: {
                return { invoiceType: translateContent('vehicleDeliveryNote.heading.mainTitle'), Number: selectedOrder?.responseMessage?.split('. ')?.[1] };
            }
            case false: {
                return { invoiceType: translateContent('vehicleDeliveryNote.buttons.challan'), Number: messageList[messageList?.length - 1] };
            }
            default: {
                return { invoiceType: translateContent('vehicleDeliveryNote.heading.mainTitle'), Number: selectedOrder?.responseMessage?.split('. ')?.[1] };
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);

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
                    <Space size="middle" className={styles.deliveryNoteSuccess} direction="vertical">
                        <Avatar size={150} icon={<HiCheck />} />
                        <Title level={5}>{message}</Title>
                        <div className={styles.deliveryNoteSuccessInfo}>
                            <Space className={styles.marB20}>
                                <div className={styles.deliveryNoteSuccessText}>
                                    <Text>
                                        {ThankYoutitles?.invoiceType} {translateContent('global.label.number')}: <span>{ThankYoutitles?.Number}</span>
                                    </Text>
                                </div>
                                <CopytoClipboard type={'primary'} buttonText={'Copy'} text={ThankYoutitles?.Number} />
                            </Space>

                            <Divider />
                            <Space size="middle" direction="vertical">
                                <Text>{translateContent('vehicleDeliveryNote.thankYouPage.downloadDeliveryNote')}</Text>
                                <Button danger onClick={() => handlePrintDownload(record)}>
                                    {`Download/Print ${ThankYoutitles?.invoiceType}`}
                                </Button>
                            </Space>
                        </div>
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
