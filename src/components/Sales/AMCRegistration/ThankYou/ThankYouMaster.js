/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Divider, Button } from 'antd';

import { HiCheck } from 'react-icons/hi';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { AMC_CONSTANTS } from '../utils/AMCConstants';

import styles from 'assets/sass/app.module.scss';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton, handlePrintDownload, record, selectedOrder } = props;

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
        cancelAMC: false,
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
                        <Title level={5}>{AMC_CONSTANTS?.GEN_SUCC?.value}</Title>
                        <div className={styles.deliveryNoteSuccessInfo}>
                            <Space className={styles.marB20}>
                                <div className={styles.deliveryNoteSuccessText}>
                                    <Text>
                                        {'AMC Registration'} No.: <span>{selectedOrder?.message}</span>
                                    </Text>
                                </div>
                                <CopytoClipboard type={'primary'} buttonText={'Copy'} text={selectedOrder?.message} />
                            </Space>

                            <Divider />
                            <Space size="middle" direction="vertical">
                                <Text>Do you want to Print or download invoice and registration certificate</Text>
                                <Row justify="space-between">
                                    <Button onClick={() => handlePrintDownload({ ...record, typeRecord: 'invoice_amc' })} danger>
                                        {`Invoice`}
                                    </Button>
                                    <Button onClick={() => handlePrintDownload({ ...record, typeRecord: 'registration_certificate_amc' })} danger style={{ margin: '0 12px' }}>
                                        {`Registration Certificate`}
                                    </Button>
                                    <Button onClick={() => handlePrintDownload({ ...record, typeRecord: 'registration_incentive_claim_amc' })} danger>
                                        {`Registration Incentive Claim`}
                                    </Button>
                                </Row>
                            </Space>
                        </div>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...thankProp} />
                </Col>
            </Row>
        </>
    );
};
