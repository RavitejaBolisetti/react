/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Divider, Space } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';

import style from 'components/common/Common.module.css';

import AddEditForm from './AddEditForm';
const { Text } = Typography;
const CardMapping = ({ index, AddEditFormProps, handleDelete, element, isEditing, setisEditing }) => {
    const [editCardForm, seteditCardForm] = useState(false);
    const { accessoryForm, setsearchData, setaddButtonDisabled, addButtonDisabled, showGlobalNotification } = AddEditFormProps;
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
                        <Space>
                            <Text className={style.headText}>{element?.partDescription}</Text>
                            <Text className={style.headText}> {'|'}</Text>
                            <Text className={style.headText}> {element?.partNumber}</Text>
                        </Space>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary" className={style.subSection}>{`Required Quantity: ` + element?.requiredQuantity}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={style.editIcon}>
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
                            {element?.isDeleting && <Button disabled={isEditing || addButtonDisabled?.partDetailsResponses} onClick={() => handleDelete(index)} type="link" icon={<BsTrash3 />}></Button>}
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
