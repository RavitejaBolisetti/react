/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Divider, Button, Popover } from 'antd';

import { HiCheck } from 'react-icons/hi';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { AMC_REPORT_DOCUMENT_TYPE } from '../utils/amcReportDocumentType';
import { translateContent } from 'utils/translateContent';
import { documentType } from '../utils/amcDocumentName';

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
                        <Title level={5}>{AMC_CONSTANTS?.GENERATED_SUCCESSFULLY?.title}</Title>
                        <div className={styles.deliveryNoteSuccessInfo}>
                            <Space className={styles.marB20}>
                                <div className={styles.deliveryNoteSuccessText}>
                                    <Text>
                                        {translateContent('amcRegistration.label.amcRegistrationNumber')} : <span>{selectedOrder?.message}</span>
                                    </Text>
                                </div>
                                <CopytoClipboard type={'primary'} buttonText={'Copy'} text={selectedOrder?.message} />
                            </Space>

                            <Divider />
                            <Space size="middle" direction="vertical">
                                <Text>{translateContent('amcRegistration.validation.doWantToDownload')} </Text>
                                <Row justify="space-between">
                                    {   documentType?.map((type) => (
                                        <Popover content={'Coming Soon'} trigger={type?.id === 2 ? 'none' : 'hover'}>
                                            <Button onClick={() => (type?.id === 2 ? handlePrintDownload({ ...record, typeRecord: AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_AMC?.value }) : null)} danger style={{ margin: type?.id === 2 ? '0 12px' : '0' }}>
                                                {type?.name}
                                            </Button>
                                        </Popover>
                                    ))}
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
