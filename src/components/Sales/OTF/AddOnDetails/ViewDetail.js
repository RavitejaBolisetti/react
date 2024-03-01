/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Row, Col, Divider } from 'antd';

import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';

import { expandIcon } from 'utils/accordianExpandIcon';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import RSAForm from './RSA/RSAForm';
import { NoDataFound } from 'utils/noDataFound';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { openAccordian, shieldForm, formActionType, rsaForm, amcForm, handleCollapse, styles, formData } = props;
    const [myActiveKey, setmyActiveKey] = useState([]);
    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('ci')} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('bookingManagement.label.accessoriesInformation')} key={'ci'}>
                            <Divider />
                            <div className={styles.innerCollapse}>
                                {formData?.partDetailsResponses?.length > 0 &&
                                    formData?.partDetailsResponses?.map((element, i) => {
                                        return (
                                            <Collapse expandIcon={expandIcon} activeKey={myActiveKey} onChange={() => handleCollapses(i)} expandIconPosition="end" collapsible="icon">
                                                <Panel
                                                    header={
                                                        <Row justify="space-between">
                                                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                                <Space>
                                                                    <Text className={styles.headText}> {`${element?.partDescription ? element?.partDescription : 'NA'} `}</Text>
                                                                    <Text className={styles.headText}> {`|`}</Text>
                                                                    <Text className={styles.headText}> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                                </Space>
                                                                <Row>
                                                                    <Text className={styles.subSection}> {`${translateContent('bookingManagement.label.requiredQuantity')}: ${element?.requiredQuantity ? element?.requiredQuantity : 'NA'} `}</Text>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    }
                                                    key={i}
                                                >
                                                    <Divider />
                                                    <AccessoriesInformationCard formData={element} />
                                                </Panel>
                                            </Collapse>
                                        );
                                    })}
                                {!formData?.partDetailsResponses?.length && <NoDataFound information={translateContent('bookingManagement.validation.noAccessoriesDataFound')} />}
                            </div>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('shield')} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('bookingManagement.label.shield')} key="shield">
                            <Divider />
                            <ShieldForm formActionType={formActionType} formData={formData} shieldForm={shieldForm} />
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('Rsa')} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('bookingManagement.label.rsa')} key={'Rsa'}>
                            <Divider />
                            <RSAForm formActionType={formActionType} formData={formData} rsaForm={rsaForm} />
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('Amc')} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('bookingManagement.label.amc')} key={'Amc'}>
                            <Divider />
                            <AMCForm formActionType={formActionType} formData={formData} amcForm={amcForm} />
                        </Panel>
                    </Collapse>
                    {/* <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('fMS')} expandIconPosition="end" collapsible="icon">
                        <Panel header="FMS" key={'fMS'}>
                            <Divider />
                            <FMSForm formActionType={formActionType} formData={formData} fmsForm={fmsForm} />
                        </Panel>
                    </Collapse> */}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
