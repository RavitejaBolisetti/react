/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Typography, Descriptions, Divider, Card, Collapse, Tag, Col, Row, Space, Button } from 'antd';
import { BiTimeFive } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { NameChangeHistory } from './NameChangeHistory';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, typeData, corporateLovData, onViewHistoryChange, isHistoryVisible, changeHistoryClose, activeKey, setactiveKey } = props;
    const findListedNonListed = () => {
        if (checkAndSetDefaultValue(getCodeValue(typeData?.CORP_TYPE, formData?.corporateType), isLoading) === 'Non-Listed') {
            return formData?.corporateName;
        } else {
            return checkAndSetDefaultValue(getCodeValue(corporateLovData, formData?.corporateName), isLoading);
        }
    };

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const nameViewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
    };

    const onCollapseChange = (value) => {
        setactiveKey(1);
    }

    return (
        <>
            <div className={styles.viewDrawerContainer}>
                <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                    <Card header="Customer Information">
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <div className={styles.cardInsideBox}>
                            <Row>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Text style={{ fontSize: '16px' }} strong>
                                        Customer Name
                                    </Text>

                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                                    <Tag style={{ textAlign: 'right' }} color="warning">Pending for Approval</Tag>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                    <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />}>
                                        View History
                                    </Button>
                                </Col>

                            </Row>
                            <Divider />
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end" onChange={() => onCollapseChange(1)} >
                                <Panel header={
                                    <>
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Text>
                                                    {getCodeValue(typeData?.TITLE, formData?.titleCode)}&nbsp;
                                                    {(formData?.firstName || '') + ' ' + (formData?.middleName || '') + ' ' + (formData?.lastName || '')}
                                                </Text>
                                            </Row>
                                        </Row>
                                    </>
                                }
                                    key={1}>
                                    <Descriptions {...nameViewProps}>
                                        <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Descriptions.Item>
                                        <Descriptions.Item label="First Name" >
                                            {checkAndSetDefaultValue(formData?.firstName)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Descriptions.Item>
                                        <Descriptions.Item label="Last Name">{checkAndSetDefaultValue(formData?.lastName)}</Descriptions.Item>
                                    </Descriptions>
                                    {formData?.userProfilePicDocId && (
                                        <Row gutter={16}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Card className={styles.viewDocumentStrip} key={formData?.userProfilePicDocId} title={formData?.customerConsentDocumentName} extra={<FiDownload />}></Card>
                                            </Col>
                                        </Row>
                                    )}

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button type="primary" className={styles.marR20} >
                                                Approved
                                            </Button>
                                            <Button className={styles.marB20} danger>
                                                Rejected
                                            </Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                        </div>


                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Email Id">{checkAndSetDefaultValue(formData?.emailId)}</Descriptions.Item>
                            <Descriptions.Item label="Do you want to contact over whatsapp?" className={formData?.whatsappCommunicationIndicator ? styles.yesText : styles.noText}>
                                {checkAndSetDefaultValue(formData?.whatsappCommunicationIndicator ? 'Yes' : 'No')}
                            </Descriptions.Item>
                            <Descriptions />
                            <Descriptions.Item label="Want to use Mobile no as whatsapp no?" className={formData?.mobileNumberAsWhatsappNumber ? styles.yesText : styles.noText}>
                                {checkAndSetDefaultValue(formData?.mobileNumberAsWhatsappNumber ? 'Yes' : 'No')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Whatsapp Number">{checkAndSetDefaultValue(formData?.whatsAppNumber)}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Corporate Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CORP_TYPE, formData?.corporateType), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Corporate Name">{findListedNonListed()}</Descriptions.Item>
                            {formData?.corporateCode && <Descriptions.Item label="Corporate Code">{checkAndSetDefaultValue(formData?.corporateCode)}</Descriptions.Item>}
                            <Descriptions.Item label="Corporate Category">{checkAndSetDefaultValue(getCodeValue(typeData?.CORP_CATE, formData?.corporateCategory), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(getCodeValue(typeData?.MEM_TYPE, formData?.membershipType), isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Space>
            </div>

            <NameChangeHistory {...changeHistoryProps} />
        </>

    );
};

export const ViewDetail = ViewDetailMain;
