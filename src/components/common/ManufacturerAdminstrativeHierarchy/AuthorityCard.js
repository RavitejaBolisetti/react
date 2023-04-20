import React, { useState, Fragment } from 'react';
import { Col, Card, Row, Button, Form, Divider } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Typography } from 'antd';
import { AuthorityForm } from './AuthorityForm';

const { Text } = Typography;

const AuthorityCard = ({ onFinish, setDocumentTypesList, authoitytype, setfinalFormdata, token, EffectiveTo, EffectiveFrom, forceUpdate, setIsBtnDisabled, isBtnDisabled, documentTypesList }) => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    // on Click edit button sets form fields
    const onEdit = (values) => {
        form.setFieldsValue({
            authoitytype,
            token,
            EffectiveTo,
            EffectiveFrom,
            // status: values.status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    // on clicking save button updates data
    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        console.log('fod', newFormData);
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
        forceUpdate();
    };

    const handleDeleteDocType = (val) => {
        setDocumentTypesList((prev) => {
            const newList = prev;

            const indx = prev?.documentType.findIndex((el) => el.documentTypeCode === val?.documentTypeCode);

            newList?.documentType?.splice(indx, 1);

            return { ...prev, documentType: newList?.documentType };
        });

        setIsEditing(false);

        setIsBtnDisabled(false);

        form.resetFields();
    };

    // on cancel editing
    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    return (
        <>
            <Card
                style={{
                    // width: 440,
                    backgroundColor: '#F2F2F2',
                    marginTop: '12px',
                    border: '1px solid rgba(62, 62, 62, 0.1)',
                }}
            >
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row align="middle">
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                                <Text type="secondary">Authority </Text>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{documentTypesList[0]?.token + ' | ' + documentTypesList[0]?.token}</Text>
                            </Col>

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text type="secondary"> EffectiveFrom- {documentTypesList[0]?.dateFrom}</Text>
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text type="secondary">EffectiveTo- {documentTypesList[0]?.dateTo} </Text> 
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(authoitytype, token, EffectiveTo, EffectiveFrom)} />
                                    </Col>

                                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                        <Button onClick={() => handleDeleteDocType({ EffectiveFrom, authoitytype, EffectiveTo, token })} type="link" icon={<FiTrash />}></Button>
                                    </Col>
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
                        <AuthorityForm onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} authoitytype={authoitytype} EffectiveTo={EffectiveTo} EffectiveFrom={EffectiveFrom} token={token} isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default AuthorityCard;
