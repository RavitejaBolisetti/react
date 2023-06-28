/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Divider, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import style from 'components/common/Common.module.css';

import AddEditForm from './AddEditForm';
const { Text } = Typography;
const CardMapping = ({ index, AddEditFormProps, handleDelete, element, isEditing, setisEditing }) => {
    const [editCardForm, seteditCardForm] = useState(false);
    const { accessoryForm, setsearchData, setaddButtonDisabled, addButtonDisabled, showGlobalNotification } = AddEditFormProps;
    console.log('element', element);
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
            <Card className={style.viewCardSize}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Space style={{ display: 'flex' }}>
                            <Text strong>{element?.partDescription}</Text>
                            <Text strong> {'|'}</Text>
                            <Text strong> {element?.partNumber}</Text>
                        </Space>
                        <Space style={{ display: 'flex' }}>
                            <Text type="secondary">{element?.requiredQuantity}</Text>
                        </Space>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} style={{ display: 'flex', justifyContent: 'end' }}>
                        <Space size="large" className={isEditing || addButtonDisabled?.partDetailsResponses ? style.disabledClass : ''}>
                            <Button
                                disabled={isEditing || addButtonDisabled?.partDetailsResponses}
                                type="link"
                                className={style.editButtonWithText}
                                icon={
                                    <div>
                                        <FiEdit />
                                        {/* <Text disabled={isEditing || addButtonDisabled?.partDetailsResponses} type={'danger'}>
                                            Edit
                                        </Text> */}
                                    </div>
                                }
                                onClick={() => handleEdit(index)}
                            >
                                Edit
                            </Button>
                            {element?.isDeleting && <Button disabled={isEditing || addButtonDisabled?.partDetailsResponses} onClick={() => handleDelete(index)} type="link" icon={<FiTrash />}></Button>}
                        </Space>
                    </Col>
                </Row>
                {editCardForm && !addButtonDisabled?.partDetailsResponses && <AddEditForm {...AddEditFormProps} editCardForm={editCardForm} seteditCardForm={seteditCardForm} index={index} onCancel={onCancel} />}

                {/* {identification===index && isEditing &&  } */}
            </Card>
        </>
    );
};
export default CardMapping;
