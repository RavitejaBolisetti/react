/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';

import { expandIcon } from 'utils/accordianExpandIcon';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import RSAForm from './RSA/RSAForm';
import FMSForm from './FMS/FMSForm';
const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { openAccordian, shieldForm, formActionType, rsaForm, amcForm, fmsForm, handleCollapse, styles, formData } = props;
    const [myActiveKey, setmyActiveKey] = useState([0]);
    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space className={styles.ViewCardCollapse} style={{ display: 'flex' }} direction="vertical" size="large">
                        <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('ci')} expandIconPosition="end">
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong>Accessories Information</Text>
                                    </div>
                                }
                                key={'ci'}
                            >
                                {formData?.partDetailsResponses?.map((element, i) => {
                                    return (
                                        <Collapse expandIcon={expandIcon} activeKey={myActiveKey} onChange={() => handleCollapses(i)} expandIconPosition="end" className={styles.innerCollapseBorder}>
                                            <Panel
                                                header={
                                                    <Row justify="space-between">
                                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                            <Space>
                                                                <Text strong> {`${element?.partDescription ? element?.partDescription : 'NA'} `}</Text>
                                                                <Text strong> {`|`}</Text>
                                                                <Text strong> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                            </Space>
                                                            <Row>
                                                                <Text strong> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                }
                                                key={i}
                                            >
                                                <AccessoriesInformationCard formData={element} />
                                            </Panel>
                                        </Collapse>
                                    );
                                })}
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('shield')} expandIconPosition="end">
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong>Shield</Text>
                                    </div>
                                }
                                key="shield"
                            >
                                <ShieldForm formActionType={formActionType} formData={formData} shieldForm={shieldForm} />
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('Amc')} expandIconPosition="end">
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong>Amc</Text>
                                    </div>
                                }
                                key={'Amc'}
                            >
                                <AMCForm formActionType={formActionType} formData={formData} amcForm={amcForm} />
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('Rsa')} expandIconPosition="end">
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong>RSA</Text>
                                    </div>
                                }
                                key={'Rsa'}
                            >
                                <RSAForm formActionType={formActionType} formData={formData} rsaForm={rsaForm} />
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse('fMS')} expandIconPosition="end">
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong>FMS</Text>
                                    </div>
                                }
                                key={'fMS'}
                            >
                                <FMSForm formActionType={formActionType} formData={formData} fmsForm={fmsForm} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
