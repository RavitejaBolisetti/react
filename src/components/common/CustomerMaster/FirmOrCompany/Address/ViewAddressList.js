import React, { useState } from 'react';
import { ViewCompanyAddressDetails } from './ViewCompanyAddressDetails';
import { Button, Collapse, Modal, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiLockAlt } from 'react-icons/bi';
import { expandIcon } from 'utils/accordianExpandIcon';
import { MarkAsDefaultModal } from './MarkAsDefaultModal';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (formProps) => {
    const { styles, contactData } = formProps;
    const [openAccordian, setOpenAccordian] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleCheckboxChange = (event) => {
        console.log('event', event);
        event.preventDefault();
        event.stopPropagation();
    };
    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mark As Default',
        closable: false,
        onCloseAction: handleCancel,
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
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <FaRegUserCircle className={styles.userCircle} />
                                                <Text strong> {`${data?.addressType ? data?.addressType : ''} `}</Text>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            {data?.defaultaddress && (
                                                <>
                                                    <Checkbox onClick={showModal} valuePropName="checked" defaultValue={data?.defaultaddress} onChange={handleCheckboxChange}>
                                                        Mark As Default
                                                    </Checkbox>
                                                    <MarkAsDefaultModal {...modalProps} />

                                                    <Divider type="vertical" />
                                                </>
                                            )}
                                            <Text type="secondary">{data?.addressType}</Text>
                                        </Col>
                                    </Row>
                                }
                                key={i}
                            >
                                <ViewCompanyAddressDetails styles={styles} formData={data} />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Space>
                                            <Button form="myAdd" key="submit" htmlType="submit" type="primary">
                                                Edit
                                            </Button>
                                            <Button ghost type="primary">
                                                Delete
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewAddressList;
