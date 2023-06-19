import React, { useState } from 'react';
import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';
import { Button, Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { expandIcon } from 'utils/accordianExpandIcon';

import AddEditForm from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (props) => {
    const { form, setShowAddEditForm, showAddEditForm, setAddressData, onFinish, setIsEditing, isEditing, styles, addressData, formData, isViewModeVisible, onCheckClick, index } = props;


    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleCheckboxChange = (event) => {
        console.log('event', event);
        event.preventDefault();
        event.stopPropagation();
    };

    const editContactHandeler = (data) => {
        setIsEditing(true);
        form.setFieldsValue(data);
    };


    const detailProps = {
        setShowAddEditForm,
        showAddEditForm,
        setAddressData,
        onFinish,
        form,
        isEditing,
        setIsEditing,
    };

    const formProps = {
        setShowAddEditForm,
        setAddressData,
        onFinish,
        form,
    };

    return (
        <div>
            {addressData?.length > 0 &&
                addressData?.map((data, i) => {
                    return (
                        <Collapse key={data?.addressType + data?.addressType} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <Row justify="space-between">
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <Text strong> {`${data?.addressType ? data?.addressType : ''} `}</Text>
                                                <Space style={{ cursor: 'pointer', color: '#FF3E5B' }} onClick={() => editContactHandeler({ formData, index })} >
                                                    <FiEdit />
                                                    <Text className="red heading" style={{ fontSize: '14px', margin: '0 0 0 0.5rem', color: '#FF3E5B' }}>
                                                        Edit
                                                    </Text>
                                                </Space>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Checkbox valuePropName="checked" defaultChecked={data?.defaultaddress} onClick={onCheckClick}>
                                                Mark As Default
                                            </Checkbox>
                                            <Divider type="vertical" />
                                            <Text type="secondary">{data?.addressType}</Text>
                                        </Col>

                                        {/* <Space>
                                            <Button type="primary" onClick={() => editContactHandeler({ formData, index })}>
                                                Edit
                                            </Button>
                                            
                                        </Space> */}
                                    </Row>
                                }
                            >
                                {!isEditing ? (
                                    <ViewIndividualAddressDetails styles={styles} formData={data} index={i} {...detailProps} />
                                ) : (
                                    <AddEditForm {...formProps} />
                                )}
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewAddressList;
