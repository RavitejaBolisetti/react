/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Divider, Button, Popover } from 'antd';

import { HiCheck } from 'react-icons/hi';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { SHIELD_REPORT_DOCUMENT_TYPE } from '../utils/shieldReportDocumentType';
import { RSA_DOCUMENT_TYPE } from '../utils/rsaReportType';
import { SALE_TYPE } from '../utils/saleTypeConstant';
import { shieldDocName } from '../utils/ShieldReportName';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Title, Text } = Typography;
const responseMessageHandler = (message) => {
    const messageSplit = message?.split(' ')[3];
    if (messageSplit) return messageSplit;
    let index = -1;
    // eslint-disable-next-line array-callback-return
    const likeMessageSplit = message?.split(' ')?.map((i, finalIndex) => {
        if (i?.toLowerCase() === 'number') {
            index = finalIndex + 1;
        }
    });
    if (likeMessageSplit) return likeMessageSplit[index];
    return '-';
};
export const ThankYouMaster = (props) => {
    const { FormActionButton, handlePrintDownload, record } = props;

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

    console.log(`record`, record);

    return (
        <>
            <Row gutter={20} className={styles?.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles?.fullyCentered}>
                    <Space size="middle" className={styles?.deliveryNoteSuccess} direction="vertical">
                        <Avatar size={150} icon={<HiCheck />} />
                        <Title level={5}>{props?.screenType === 'RSA' ? AMC_CONSTANTS?.RSA_GENERATED_SUCCESSFULLY?.title : AMC_CONSTANTS?.GENERATED_SUCCESSFULLY?.title}</Title>
                        <div className={styles?.deliveryNoteSuccessInfo}>
                            <Space className={styles?.marB20}>
                                <div className={styles?.deliveryNoteSuccessText}>
                                    <Text>
                                        {props?.screenType === 'RSA' ? 'Request Id' : 'Shield Registration'} No.: <span>{responseMessageHandler(record?.res?.responseMessage)}</span>
                                    </Text>
                                </div>
                                <CopytoClipboard type={'primary'} buttonText={'Copy'} text={responseMessageHandler(record?.res?.responseMessage)} />
                            </Space>

                            <Divider />

                            <Space size="middle" direction="vertical">
                                <Text>{translateContent('shieldSchemeRegistration.confirmationMessage.downloadConfirmation')}</Text>
                                <Row justify="space-between">
                                    {record?.res?.data?.registrationDetails?.registrationInformation?.saleType === SALE_TYPE?.PAID?.key
                                        ? shieldDocName?.map((type) => (
                                              <Popover content={'Coming Soon'} trigger={type?.id === 3 ? 'hover' : 'none'}>
                                                  <Button onClick={() => (type?.id !== 3 ? handlePrintDownload({ ...record, typeRecord: type?.id === 1 ? SHIELD_REPORT_DOCUMENT_TYPE?.INVOICE_SHIELD?.value : type?.id === 2 ? SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_SHIELD?.value : null }) : null)} danger style={{ margin: type?.id === 2 ? '0 12px' : '0' }}>
                                                      {type?.name}
                                                  </Button>
                                              </Popover>
                                          ))
                                        : record?.res?.data?.rsaRegistrationNumber?.length > 0
                                        ? shieldDocName?.map((type) => (
                                              <Popover content={'Coming Soon'} trigger={type?.id === 3 ? 'hover' : 'none'}>
                                                  <Button onClick={() => (type?.id !== 3 ? handlePrintDownload({ ...record, typeRecord: type?.id === 1 ? RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value : type?.id === 2 ? RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value : null }) : null)} danger style={{ margin: type?.id === 2 ? '0 12px' : '0' }}>
                                                      {type?.name}
                                                  </Button>
                                              </Popover>
                                          ))
                                        : null}
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

// rsaDocName?.map((type) => (
//     <Popover content={'Coming Soon'} trigger={type?.id === 3 ? 'hover' : 'none'}>
//         <Button onClick={() => (type?.id !== 3 ? handlePrintDownload({ ...record, typeRecord: type?.id === 1 ? RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value : type?.id === 2 ? RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value : null }) : null)} danger style={{ margin: type?.id === 2 ? '0 12px' : '0' }}>
//             {type?.name}
//         </Button>
//     </Popover>
// ));
