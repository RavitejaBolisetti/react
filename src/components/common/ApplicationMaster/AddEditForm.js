import React, { useState } from 'react';

import { Col, Row } from 'antd';
import { Collapse, Space } from 'antd';

import styles from 'pages/common/Common.module.css';
import ApplicationDetails from './ApplicationDetails';
import DocumentTypes from './DocumentTypes';
import ApplicationActions from './ApplicationActions';
import AccessibleDealerLocations from './AccessibleDealerLocations';

const { Panel } = Collapse;

const AddEditForm = ({ setOpenAccordian, openAccordian, applicationform, applicationActionsform, documentTypesform, accessibleDealerLocationsform, setSelectedTreeKey, isChecked, setIsChecked, flatternData, formActionType, selectedTreeKey, selectedTreeSelectKey, isReadOnly, formData, geoData, handleSelectTreeClick, isDataAttributeLoaded, attributeData, setIsModalOpen }) => {
    const [selectedLocaationAccessiblity, setSelectedLocaationAccessiblity] = useState('');
    
    const handleCollapse = (key) => {
        console.log('key', key);
        setOpenAccordian(key);
    };

    return (
        <>
            <Row style={{ paddingBottom: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.padRight0}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Collapse onChange={() => handleCollapse(1)} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Details" key="1">
                                <ApplicationDetails form={applicationform} formActionType={formActionType} isReadOnly={isReadOnly} setSelectedLocaationAccessiblity={setSelectedLocaationAccessiblity} />
                            </Panel>
                        </Collapse>
                        <Collapse onChange={() => handleCollapse('2')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Actions" key="2">
                                <ApplicationActions form={applicationActionsform} formActionType={formActionType} isReadOnly={isReadOnly} />
                            </Panel>
                        </Collapse>
                        {
                            selectedLocaationAccessiblity === "restrictedAccessible"  &&
                            <Collapse onChange={() => handleCollapse('4')} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Accessible Dealer Locations" key="4">
                                    <AccessibleDealerLocations form={accessibleDealerLocationsform} formActionType={formActionType} isReadOnly={isReadOnly} />
                                </Panel>
                            </Collapse>
                        }
                        <Collapse onChange={() => handleCollapse(3)} activeKey={openAccordian} defaultActiveKey={['1']} expandIconPosition="end">
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
