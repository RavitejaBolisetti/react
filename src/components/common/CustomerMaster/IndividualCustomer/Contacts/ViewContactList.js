import React, { useState } from 'react';
import { ViewDetail } from './ViewContactDetails';
import { Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewContactList = (formProps) => {
    const { styles, contactData } = formProps;
    const { setShowAddEditForm,showAddEditForm, setContactData, onFinish, form, isEditing, setIsEditing } = formProps;

    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleCheckboxChange = (event) => {
        console.log('event', event);
        event.preventDefault();
        event.stopPropagation();
    };

    const detailProps = {
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        onFinish,
        form,
        isEditing, setIsEditing
    };

    return (
        <div>
            {contactData?.length > 0 &&
                contactData?.map((data, i) => {
                    return (
                        <Collapse onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <Row>
                                        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                            <Space>
                                                <FaRegUserCircle className={styles.userCircle} />
                                                <Text strong> {`${data?.contactNameFirstName ? data?.contactNameFirstName : ''} ${data?.contactNameMiddleName ? data?.contactNameMiddleName : ''} ${data?.contactNameLastName ? data?.contactNameLastName : ''}`}</Text>{' '}
                                            </Space>
                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                            {data?.defaultaddress && (
                                                <>
                                                    <Checkbox valuePropName="checked" defaultValue={data?.defaultaddress} onChange={handleCheckboxChange}>
                                                        Mark As Default
                                                    </Checkbox>
                                                    <Divider type="vertical" />
                                                </>
                                            )}
                                            <Text type="secondary">{data?.purposeOfContact}</Text>
                                        </Col>
                                    </Row>
                                }
                                key={i}
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
