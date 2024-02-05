/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Divider, Card, Col, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translateContent } from 'utils/translateContent';

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
    const { styles, formData, isLoading, typeData, corporateTypeLovData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <div className={styles?.viewDrawerContainer}>
                <Card header="Customer Information">
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.mobileNumber')}>{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.customerType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <CustomerNameChangeMaster {...props} />
                        </Col>
                    </Row>
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.emailId')}>{checkAndSetDefaultValue(formData?.emailId)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.contactTxt')} className={formData?.whatsappCommunicationIndicator ? styles.yesText : styles?.noText}>
                            {checkAndSetDefaultValue(formData?.whatsappCommunicationIndicator ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no'))}
                        </Descriptions.Item>
                        <Descriptions />
                        <Descriptions.Item label={translateContent('customerMaster.label.whatsapp')} className={formData?.mobileNumberAsWhatsappNumber ? styles.yesText : styles?.noText}>
                            {checkAndSetDefaultValue(formData?.mobileNumberAsWhatsappNumber ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no'))}
                        </Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.whatsappNumber')}>{checkAndSetDefaultValue(formData?.whatsAppNumber)}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.corporateType')}>
                            {checkAndSetDefaultValue(
                                getCodeValue(
                                    corporateTypeLovData.map((item) => {
                                        return { key: item.categoryCode, value: `${item?.categoryCode}-${item?.categoryDescription}` };
                                    }),
                                    formData?.corporateType
                                ),
                                isLoading
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.corporateDescription')}>{checkAndSetDefaultValue(formData?.corporateName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.corporateName')}>{formData?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.corporateCode')}>{checkAndSetDefaultValue(formData?.corporateCode)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.corporateCategory')}>{checkAndSetDefaultValue(formData?.corporateCategory, isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(getCodeValue(typeData?.MEM_TYPE, formData?.membershipType), isLoading)}</Descriptions.Item> */}
                    </Descriptions>
                </Card>
            </div>
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
