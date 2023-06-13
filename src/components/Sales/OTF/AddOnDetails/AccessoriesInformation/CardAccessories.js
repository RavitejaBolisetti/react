import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

import style from 'components/common/Common.module.css';
import AddEditForm from './AddEditForm';

const { Text } = Typography;

const CardAccessories = (prop) => {
    const { id, partNumber, partType, sellingPrice, mrp, requiredQuantity, partDescription } = prop;
    const { SetAddOnItemInfo, setIsBtnDisabled, isBtnDisabled, onFieldsChange } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        return () => {
            setIsEditing(false);
            // setIsBtnDisabled(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onEdit = (data) => {
        console.log("data",data)
        form.setFieldsValue({
            ...data
        });
        setIsEditing(true);
        // setIsBtnDisabled(true);
    };

    const onUpdate = (value) => {
        form.validateFields()
            .then((newFormData) => {
                console.log("newFormData", newFormData)
                SetAddOnItemInfo((prev) => {
                    const newList = [...prev];
                    const indx = prev?.findIndex((el) => el?.partNumber === partNumber);
                    newList?.splice(indx, 1, { ...newFormData });
                    return [ ...newList];
                });
                setIsEditing(false);
                // setIsBtnDisabled(false);
                form.resetFields();
            })
            .catch((err) => {
                return;
            });
    };

    const handleDelete = (partNumber) => {
        SetAddOnItemInfo((prev) => {
            const newList = [...prev];
            const indx = prev?.findIndex((el) => el.partNumber === partNumber);
            newList?.splice(indx, 1);
            return [...newList];
        });
        setIsEditing(false);
        // setIsBtnDisabled(false);
        form.resetFields();
    };

    const onCancel = () => {
        setIsEditing(false);
        // setIsBtnDisabled(false);
    };

    const formProps = {
        form,
        isEditing,
        onFieldsChange,
        id,
        partNumber, 
        partType, 
        sellingPrice, 
        mrp, 
        requiredQuantity, 
        partDescription,
    }

    return (
        <>
            <Card className={style.viewCardSize} key={partNumber}>
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row align="middle">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text strong>Part Description: {partDescription}</Text>
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text strong> {partNumber}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">{requiredQuantity}</Text>
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary"> {'mesuring unit ?'}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit({id, partNumber, partType, sellingPrice, mrp, requiredQuantity, partDescription})} />
                                    </Col>
                                    {!id?.length > 0 && (
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                            <Button disabled={isBtnDisabled} onClick={() => handleDelete(partNumber)} type="link" icon={<FiTrash />}></Button>
                                        </Col>
                                    )}
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={onUpdate}>
                                            Save
                                        </Button>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={() => onCancel()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>

                {isEditing && (
                    <Fragment>
                        <Divider />
                        <AddEditForm  {...formProps}/>
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default CardAccessories;
