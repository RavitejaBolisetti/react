import React, { useState } from 'react';
import { Col, Card, Row, Button, Divider, Form } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';
import styles from 'components/common/Common.module.css';
import ProductActionForms from './ProductActionForms';

const { Text } = Typography;

const CardItemProductAttribute = (props) => {
    const { code, value, id, setSKUAttributes, forceUpdate, isAddBtnDisabled, setAddBtnDisabled, skuData, viewMode } = props;

    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = (values) => {
        form.setFieldsValue({
            attributeName: {
                label: values.code,
            },
            attributeValue: values.attributeValue,
        });
        setIsEditing(true);
        setAddBtnDisabled(true);
    };

    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        const { value, label } = newFormData?.attributeName;
        setSKUAttributes((prev) => {
            const newList = prev;
            const indx = prev.findIndex((el) => el.adPhProductAttributeMstId === id);
            newList.splice(indx, 1, { code: label, adPhProductAttributeMstId: value, value: newFormData.attributeValue });
            return newList;
        });
        setIsEditing(false);
        setAddBtnDisabled(false);
        form.resetFields();
        forceUpdate();
    };

    const onCancel = () => {
        setIsEditing(false);
        setAddBtnDisabled(false);
    };

    const colLeft = viewMode ? 24 : 18;
    const colRight = viewMode ? 24 : 6;

    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
        >
            <Row align="middle">
                <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                    <div>
                        <Text strong>{code}</Text>
                    </div>
                    <div>
                        <Text type="secondary">{value}</Text>
                    </div>
                </Col>
                {!viewMode && (
                    <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                        {!isEditing ? (
                            <div className={styles.cardItemBtn}>
                                <Button disabled={isAddBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit({ id, code, value })} />
                            </div>
                        ) : (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" onClick={() => onCancel()}>
                                    Cancel
                                </Button>
                                <Button type="link" onClick={onUpdate}>
                                    Save
                                </Button>
                            </div>
                        )}
                    </Col>
                )}
            </Row>

            {isEditing && (
                <>
                    <Divider />
                    <ProductActionForms value={value} skuData={skuData} name={code} id={id} form={form} canAdd={false} canEdit={true} />
                </>
            )}
        </Card>
    );
};

export default CardItemProductAttribute;
