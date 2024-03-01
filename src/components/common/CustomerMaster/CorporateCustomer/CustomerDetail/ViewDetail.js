/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';
import { CustomerNameChangeMaster } from '../../IndividualCustomer/CustomerDetail/CustomerNameChange';

const ViewDetailMain = (props) => {
    const { formData, styles, isLoading, typeData, corporateTypeLovData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <div className={styles.viewDrawerContainer}>
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
                    {/* <Descriptions.Item label={translateContent('customerMaster.label.companyName')}>{checkAndSetDefaultValue(formData?.companyName, isLoading)}</Descriptions.Item> */}
                    <Descriptions.Item label={translateContent('customerMaster.label.companyCode')}>{checkAndSetDefaultValue(formData?.parentCompanyCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.parentComp')}>{checkAndSetDefaultValue(formData?.parentCompanyName, isLoading)}</Descriptions.Item>
                </Descriptions>

                <Divider />
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
                    <Descriptions.Item label={translateContent('customerMaster.label.corporateDescription')}>{checkAndSetDefaultValue(formData?.corporateDescription, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.corporateName')}>{checkAndSetDefaultValue(formData?.corporateName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.corporateCode')}>{checkAndSetDefaultValue(formData?.corporateCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.corporateCategory')}>{checkAndSetDefaultValue(formData?.corporateCategory, isLoading)}</Descriptions.Item>
                </Descriptions>
            </div>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
