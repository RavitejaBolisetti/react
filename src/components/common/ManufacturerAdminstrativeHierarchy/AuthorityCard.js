import React, { useState, Fragment } from 'react';
import { Col, Card, Row, Button, Form, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';

// import styles from 'pages/common/Common.module.css';
// import style from 'components/common/DrawerAndTable.module.css';
import AuthorityForm from './AuthorityForm';
import { FaLessThanEqual } from 'react-icons/fa';

const { Text } = Typography;

const AuthorityCard = ({ onFinish, tncReq, signatureReq, documentName, docCode, setDocumentTypesList, authoitytype, token, dateTo, dateFrom, forceUpdate, setIsBtnDisabled, isBtnDisabled }) => {
    // const { tncReq, signatureReq, documentName, docCode, setDocumentTypesList, authoitytype, token, dateTo, dateFrom, forceUpdate, setIsBtnDisabled, isBtnDisabled } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    // on Click edit button sets form fields
    const onEdit = (values) => {
        form.setFieldsValue({
            authoitytype,
            token,
            dateTo,
            dateFrom,
            // status: values.status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    // on clicking save button updates data
    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        console.log('fod', newFormData);
        const { key, label } = newFormData.authoitytype;
        // setDocumentTypesList((prev) => [...prev, { token: val.token, authoitytype: key, authorityName: label }]);
        // setDocumentTypesList((prev) => {
        //     console.log(prev);
        //     const newList = prev;
        //     const indx = prev?.findIndex((el) => el?.token === token);
        //     console.log('newList', newList, 'indx', indx);
        //     newList?.splice(indx, 1, { ...newFormData });
        //     return newList;
        // });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
        forceUpdate();
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
                    backgroundColor: '#BEBEBE1A',
                    marginTop: '12px',
                    border: '1px solid rgba(62, 62, 62, 0.1)',
                }}
            >
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row align="middle">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">DateFrom: </Text> {dateFrom || '31/99/9999'}
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text type="secondary">DateTo: </Text> {dateTo || '31/99/9999'}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{authoitytype || 'Attribute Type 1'}</Text>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">Token: {token || 'B6G431'}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                    <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(authoitytype, token, dateTo, dateFrom)} />
                                </Col>
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
                        <AuthorityForm onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} authoitytype={authoitytype} dateTo={dateTo} dateFrom={dateFrom} token={token} isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default AuthorityCard;
