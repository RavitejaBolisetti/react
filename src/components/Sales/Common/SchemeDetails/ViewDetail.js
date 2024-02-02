/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Card, Collapse, Descriptions, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';
import { getCodeValue } from 'utils/getCodeValue';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { CardSkeleton } from 'components/common/Skeleton';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { typeData, schemeData, styles, isLoading = false } = props;
    const [activeKey, setActiveKey] = useState([1]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const viewSingleProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];
            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const schemeCommonData = ({ schemeForm, showTitle, discountTypeOption }) => (
        <>
            {showTitle && (
                <>
                    <Descriptions {...viewSingleProps}>
                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.schemeName')}>{checkAndSetDefaultValue(schemeForm?.schemeName, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </>
            )}
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.schemeType')}>{checkAndSetDefaultValue(getCodeValue(showTitle ? typeData['SCHEME_TYPE'] : typeData['SALS_SCHEM_TYPE'], schemeForm?.schemeType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory')}>{checkAndSetDefaultValue(schemeForm?.schemeCategory, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.Amount')}>{checkAndSetDefaultValue(schemeForm?.amount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.validFrom')}>{checkAndSetDefaultValue(schemeForm?.validFrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.validTo')}>{checkAndSetDefaultValue(schemeForm?.validTo, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.discountType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[discountTypeOption], schemeForm?.discountType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.description')}>{checkAndSetDefaultValue(schemeForm?.description, isLoading)}</Descriptions.Item>
            </Descriptions>
        </>
    );

    const corporateSchemeCommonData = ({ schemeForm, discountTypeOption }) => (
        <Descriptions {...viewProps}>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCode')}>{checkAndSetDefaultValue(schemeForm?.corporateCode, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDescription')}>{checkAndSetDefaultValue(schemeForm?.corporateDescription, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateName')}>{checkAndSetDefaultValue(schemeForm?.corporateName, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory')}>{checkAndSetDefaultValue(getCodeValue(typeData?.CORPT_CATGRY_DESC, schemeForm?.corporateCategory), isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.stdDealerAmount')}>{checkAndSetDefaultValue(schemeForm?.stdDealerAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.stdOEMDiscount')}>{checkAndSetDefaultValue(schemeForm?.stdOEMDiscount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount')}>{checkAndSetDefaultValue(getCodeValue(Object.values(YES_NO_FLAG), schemeForm?.corporateAdditionalApplicableDiscount, 'title'), isLoading)}</Descriptions.Item>
            {schemeForm?.corporateAdditionalApplicableDiscount === YES_NO_FLAG?.YES?.key && <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount')}>{checkAndSetDefaultValue(schemeForm?.corporateAdditionalDiscount, isLoading)}</Descriptions.Item>}
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount')}>{checkAndSetDefaultValue(schemeForm?.totalCorporateDiscount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDiscountType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[discountTypeOption], schemeForm?.discountType), isLoading)}</Descriptions.Item>
        </Descriptions>
    );

    const isDataExist = schemeData?.exchange || schemeData?.loyalty || schemeData?.corporate || (schemeData && schemeData?.sales?.length > 0);
    return isLoading ? (
        <CardSkeleton content={false} titleHeight={60} count={2} />
    ) : (
        <div className={styles?.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {isDataExist ? (
                        <>
                            {schemeData?.exchange && (
                                <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                    <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.exchange')} key={1}>
                                        <Divider />
                                        {schemeCommonData({ schemeForm: schemeData?.exchange, discountTypeOption: 'EXCH_MODE_OF_DIS' })}
                                    </Panel>
                                </Collapse>
                            )}

                            {schemeData?.loyalty && (
                                <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                                    <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.loyalty')} key={2}>
                                        <Divider />
                                        {schemeCommonData({ schemeForm: schemeData?.loyalty, discountTypeOption: 'LOYAL_MODE_OF_DIS' })}
                                    </Panel>
                                </Collapse>
                            )}

                            {schemeData?.corporate && (
                                <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                                    <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.corporate')} key={3}>
                                        <Divider />
                                        {corporateSchemeCommonData({ schemeForm: schemeData?.corporate, discountTypeOption: 'CORP_MODE_OF_DIS' })}
                                    </Panel>
                                </Collapse>
                            )}

                            {schemeData?.sales && schemeData?.sales?.filter((i) => i?.active)?.length > 0 && (
                                <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end">
                                    <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.salesScheme')} key={4}>
                                        <Divider />
                                        {schemeCommonData({ schemeForm: schemeData?.sales?.find((i) => i.active), showTitle: true, discountTypeOption: 'SALES_MODE_OF_DIS' })}
                                    </Panel>
                                </Collapse>
                            )}
                        </>
                    ) : (
                        <Card>
                            <div className={styles.marB20}>{translateContent('commonModules.label.schemeAndOfferDetails.noScheme')}</div>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
