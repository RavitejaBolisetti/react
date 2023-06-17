import React, { useState } from 'react';
import { ViewDetail } from './ViewContactDetails';
import { Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewContactList = (formProps) => {
    const { styles, contactData, deleteContactHandeler, onCheckClick } = formProps;
    const { setShowAddEditForm, showAddEditForm, setContactData, onFinish, form, isEditing, setIsEditing } = formProps;

    const [openAccordian, setOpenAccordian] = useState('');
    
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const detailProps = {
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        onFinish,
        form,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
    };

    return (
        <div>
            {contactData?.length > 0 &&
                contactData?.map((data, i) => {
                    return (
                        <Collapse key={data?.purposeOfContact + data?.contactNameFirstName} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <Row justify="space-between">
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <Text strong> {`${data?.contactNameFirstName ? data?.contactNameFirstName : ''} ${data?.contactNameMiddleName ? data?.contactNameMiddleName : ''} ${data?.contactNameLastName ? data?.contactNameLastName : ''}`}</Text>{' '}
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Checkbox valuePropName="checked" defaultChecked={data?.defaultaddress} onClick={onCheckClick}>
                                                Mark As Default
                                            </Checkbox>
                                            <Divider type="vertical" />
                                            <Text type="secondary">{data?.purposeOfContact}</Text>
                                        </Col>
                                    </Row>
                                }
                            >
                                <ViewDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewContactList;
