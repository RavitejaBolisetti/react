import React, { useState } from 'react';
import { Row, Col, Collapse, Space, Card, Typography, Button, Divider } from 'antd';
import styles from 'components/common/Common.module.css';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewFamilyDetails';
import { FiEdit } from 'react-icons/fi';
import { FormContainer } from './FormContainer';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { value, selectRef, onFamilyFinish, onFinishFailed, familyForm, onChange, showForm, setShowForm } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType, onSave, editedMode, setEditedMode } = props;
    const [activeKey, setactiveKey] = useState([null]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onCollapseChange = (values) => {
        const isPresent = activeKey.includes(values);
        if (isPresent) {
            const newActivekeys = [];
            // eslint-disable-next-line array-callback-return
            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const addFunction = () => {
        setShowForm(true);
        familyForm.resetFields();
    };

    const onEdit = (values) => {
        setEditedMode(true);
        familyForm.setFieldsValue({
            mnmCustomer: values?.mnmCustomer,
            customerId: values?.customerId,
            familyMembername: values?.familyMembername,
            relationship: values?.relationship,
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        });
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    const formProps = {
        value,
        selectRef,
        onFamilyFinish,
        onFinishFailed,
        familyForm,
        onChange,
        editedMode,
        onSave,
    };

    console.log(editedMode,'EDITEDMODECHECL')

    return (
        <>
            {!isViewModeVisible ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className="cardStyle">
                            <div className="flex">
                                <Typography className="subHeading">Family Details</Typography>
                                <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} className="addBtn" disabled={showForm}>
                                    Add
                                </Button>
                            </div>
                            {showForm || familyDetailList?.length > 0 ? <Divider /> : null}
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                {showForm && <FormContainer {...formProps} />}

                                {familyDetailList?.length > 0 &&
                                    familyDetailList?.map((item) => (
                                        <Collapse
                                            expandIcon={() => {
                                                if (activeKey.includes(1)) {
                                                    return <MinusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                                } else {
                                                    return <PlusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                                }
                                            }}
                                            activeKey={activeKey}
                                            onChange={() => onCollapseChange(1)}
                                            expandIconPosition="end"
                                            collapsible="icon"
                                        >
                                            <Panel
                                                header={
                                                    <div className="flex100">
                                                        <div className={styles.alignUser}>
                                                            <Typography className="heading">
                                                                {item?.familyMembername} | {item?.relationship}
                                                            </Typography>
                                                            <div className="flex red" style={{ margin: '0 0 0 1rem', cursor: 'pointer' }} onClick={()=>onEdit(item)}>
                                                                <FiEdit />
                                                                <Typography className="red heading" style={{ fontSize: '14px', margin: '0 0 0 0.5rem' }}>
                                                                    Edit
                                                                </Typography>
                                                            </div>
                                                        </div>

                                                        {customerType ? <Typography>M&M user </Typography> : !customerType ? <Typography>Non-M&M user</Typography> : null}
                                                    </div>
                                                }
                                                key="1"
                                                style={{backgroundColor:'rgba(0, 0, 0, 0.02)'}}
                                            >
                                                {editedMode ? <FormContainer {...formProps} /> : <ViewDetail mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} familyMembername={item?.familyMembername} relationship={item?.relationship} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} />}
                                            </Panel>
                                        </Collapse>
                                    ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
