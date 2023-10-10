/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import styles from 'assets/sass/app.module.scss';

import AddEditForm from './AddEditForm';
const { Text } = Typography;

const CardMapping = ({ index, AddEditFormProps, handleDelete, element, isEditing, setisEditing }) => {
    const [editCardForm, seteditCardForm] = useState(false);
    const { accessoryForm, setsearchData, setaddButtonDisabled, addButtonDisabled } = AddEditFormProps;
    const handleEdit = (index) => {
        seteditCardForm(true);
        setisEditing(true);
        setaddButtonDisabled((prev) => ({ ...prev, partDetailsResponses: false }));
        accessoryForm.setFieldsValue({
            ...element,
        });
    };
    const onCancel = () => {
        setisEditing(false);
        seteditCardForm(false);
        accessoryForm.resetFields();
        setsearchData();
    };
    return (
        <>
            <Card className={styles.innerCollapse}>
                <Row justify="space-between">
                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <Space size="small">
                            <Text className={styles.headText}>{element?.partDescription}</Text>
                            <Text className={styles.headText}> {'|'}</Text>
                            <Text className={styles.headText}> {element?.partNumber}</Text>
                        </Space>
                        <Row style={{ marginBottom: '8px' }}>
                            <Text type="secondary" className={styles.subSection}>
                                {`Required Quantity: ` + element?.requiredQuantity}
                            </Text>
                        </Row>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.buttonsGroupRight}>
                        <Space size="middle" className={isEditing || addButtonDisabled?.partDetailsResponses ? styles.disabledClass : ''}>
                            <Button disabled={isEditing || addButtonDisabled?.partDetailsResponses} className={styles.verticallyCentered} type="link" icon={<FiEdit />} onClick={() => handleEdit(index)}>
                                Edit
                            </Button>
                            {element?.isDeleting && <Button disabled={isEditing || addButtonDisabled?.partDetailsResponses} onClick={() => handleDelete(index)} className={styles.verticallyCentered} type="link" icon={<BsTrash3 />}></Button>}
                        </Space>
                    </Col>
                </Row>
                {editCardForm && !addButtonDisabled?.partDetailsResponses && (
                    <>
                        <Divider />
                        <AddEditForm {...AddEditFormProps} editCardForm={editCardForm} seteditCardForm={seteditCardForm} index={index} onCancel={onCancel} />
                    </>
                )}

                {/* {identification===index && isEditing &&  } */}
            </Card>
        </>
    );
};
export default CardMapping;
