import React, { useState } from 'react';

import { Col, Row } from 'antd';
import { Collapse, Space } from 'antd';

import styles from 'pages/common/Common.module.css';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {ApplicationDetails} from './ApplicationDetails';
import DocumentTypes from './DocumentTypes';
import ApplicationActions from './ApplicationActions';
import {AccessibleDealerLocations} from './AccessibleDealerLocations';

const { Panel } = Collapse;

const AddEditForm = ({ 
    setOpenAccordian, 
    openAccordian, 
    applicationform, 
    applicationActionsform, 
    documentTypesform, 
    accessibleDealerLocationsform, 
    formActionType, 
    isReadOnly, 
}) => {
    const [selectedLocaationAccessiblity, setSelectedLocaationAccessiblity] = useState('');
    
    const handleCollapse = (key) => {
        setOpenAccordian(prev => prev===key ? "" : key);
    };
    console.log("openAccordian", openAccordian)

    return (
        <>
            <Row style={{ paddingBottom: '20px', marginTop: '2px' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.padRight0}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Collapse  expandIcon={() => openAccordian=== '1' ? <UpOutlined /> : <DownOutlined />} onChange={() => handleCollapse('1')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Details" key="1">
                                <ApplicationDetails form={applicationform} formActionType={formActionType} isReadOnly={isReadOnly} setSelectedLocaationAccessiblity={setSelectedLocaationAccessiblity} />
                            </Panel>
                        </Collapse>
                        <Collapse  expandIcon={() => openAccordian=== '2' ? <UpOutlined /> : <DownOutlined />} onChange={() => handleCollapse('2')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Actions" key="2">
                                <ApplicationActions form={applicationActionsform} formActionType={formActionType} isReadOnly={isReadOnly} />
                            </Panel>
                        </Collapse>
                        {
                            selectedLocaationAccessiblity === "restrictedAccessible"  &&
                            <Collapse  expandIcon={() => openAccordian=== '4' ? <UpOutlined /> : <DownOutlined />} onChange={() => handleCollapse('4')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Accessible Dealer Locations" key="4">
                                    <AccessibleDealerLocations form={accessibleDealerLocationsform} formActionType={formActionType} isReadOnly={isReadOnly} />
                                </Panel>
                            </Collapse>
                        }
                        <Collapse  expandIcon={() => openAccordian=== '3' ? <UpOutlined /> : <DownOutlined />} onChange={() => handleCollapse('3')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Document Types" key="3">
                                <DocumentTypes form={documentTypesform} formActionType={formActionType} isReadOnly={isReadOnly} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default AddEditForm;
