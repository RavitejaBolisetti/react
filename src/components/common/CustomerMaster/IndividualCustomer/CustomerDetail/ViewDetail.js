/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Divider, Card, Col, Row, Space } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { CustomerNameChangeMaster } from './CustomerNameChange';
import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                NameChangeRequest: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    let returnValue = {
        userId,
        data,
        isDataLoaded,
        isLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveNameChangeData: nameChangeRequestDataActions.saveData,
            listShowNameChangeLoading: nameChangeRequestDataActions.listShowLoading,
        },
        dispatch
    ),
});

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, typeData, corporateLovData } = props;

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

    return (
        <>
            <div className={styles.viewDrawerContainer}>
                <Card header="Customer Information">
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <CustomerNameChangeMaster {...props} />
                        </Col>
                    </Row>
                    <Divider />
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
                        {/* <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(getCodeValue(typeData?.MEM_TYPE, formData?.membershipType), isLoading)}</Descriptions.Item> */}
                    </Descriptions>
                </Card>
            </div>
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
