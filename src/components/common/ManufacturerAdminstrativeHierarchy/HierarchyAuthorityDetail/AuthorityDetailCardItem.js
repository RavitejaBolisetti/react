import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Col, Card, Row, Button, Divider, Typography, Form } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import dayjs from 'dayjs';
import moment from 'moment';

import { AddEditForm } from './AddEditForm';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdminHierarchy: { authorityVisible },
        },
    } = state;

    let returnValue = {
        authorityVisible,
    };
    return returnValue;
};

const AuthorityCardItemMain = (props) => {
    const { viewMode, onFinish, setDocumentTypesList, forceUpdate, setIsBtnDisabled, isBtnDisabled, record } = props;
    const { employeeName, setEmployeeName, tokenValidate, setTokenValidate } = props;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const recordId = record?.id;
    const onEdit = ({ employeeName, authorityTypeCode, authorityEmployeeTokenNo, effectiveTo, effectiveFrom, id }) => {
        console.log('record', record);
        // setEmployeeName(employeeName);
        setTokenValidate({ ['tokenVisible' + recordId]: true });
        // {
            //     ['authorityTypeCode' + recordId]: authorityTypeCode,
        //     ['authorityEmployeeTokenNo' + recordId]: authorityEmployeeTokenNo,
        //     ['EffectiveTo' + recordId]: effectiveTo,
        //     ['EffectiveFrom' + recordId]: effectiveFrom,
        //     ['id' + recordId ] : id,
        //     ['employeeName' + recordId] : employeeName,
        // }
        // form.setFieldsValue({
        //     authorityTypeCode: authorityTypeCode,
        //     authorityEmployeeTokenNo: authorityEmployeeTokenNo,
        //     EffectiveTo: effectiveTo,
        //     EffectiveFrom: effectiveFrom,
        //     id: id,
        //     employeeName: employeeName,
        // });
        // formData?.toDate ? dayjs(formData?.toDate, 'DD-MM-YYYY') : null,
        form.setFieldsValue({...record,  effectiveTo: dayjs(record?.effectiveTo), effectiveFrom: dayjs(record?.effectiveFrom),});
        // form.resetFields();
        setIsEditing(true);
        setIsBtnDisabled(true);
    };
    
    const onUpdate = () => {
        form.validateFields().then((data) => {
            console.log('data', data);
            setDocumentTypesList(prev => {
                
                const updatedData = prev;
                const index = updatedData.findIndex(el => el?.authorityEmployeeTokenNo === record.authorityEmployeeTokenNo)
                updatedData.splice(index, 1, {...data});
                console.log("updatedData",updatedData)
                return updatedData
            })
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        // form.resetFields();
        forceUpdate();
    };

    // const handleDeleteDocType = (val) => {
    //     setDocumentTypesList((prev) => {
    //         const newList = prev;
    //         const indx = prev?.documentType.findIndex((el) => el.documentTypeCode === val?.documentTypeCode);
    //         newList?.documentType?.splice(indx, 1);
    //         return { ...prev, documentType: newList?.documentType };
    //     });

    //     setIsEditing(false);
    //     setIsBtnDisabled(false);
    //     form.resetFields();
    // };

    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    const colLeft = viewMode ? 24 : 18;
    const colRight = viewMode ? 24 : 6;

    return (
        <>
            <Card
                style={{
                    backgroundColor: '#F2F2F2',
                    marginTop: '12px',
                    border: '1px solid rgba(62, 62, 62, 0.1)',
                }}
            >
                <Row>
                    {/* {recordId + 'dsds'} */}
                    <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                        <Row>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                                <Text type="secondary">Authority :{' '} {record?.authorityTypeCode}</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{record?.employeeName + ' | ' + record?.authorityEmployeeTokenNo}</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">From - {moment(record?.effectiveFrom).format('DD-MM-YYYY')}</Text>
                                <Divider type="vertical" />
                                <Text type="secondary">To - {moment(record?.effectiveTo)?.format('DD-MM-YYYY')}</Text>
                            </Col>
                        </Row>
                    </Col>
                    {!viewMode && (
                        <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                            {!isEditing ? (
                                <Row align="right">
                                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} style={{ float: 'right' }}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(record)} />
                                        {/* {!record?.id && <Button onClick={() => handleDeleteDocType(record)} type="link" icon={<FiTrash />}></Button>} */}
                                    </Col>
                                </Row>
                            ) : (
                                <Row align="right">
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
                                </Row>
                            )}
                        </Col>
                    )}
                </Row>

                {isEditing && (
                    <Fragment>
                        <Divider />
                        <AddEditForm tokenValidate={tokenValidate} setEmployeeName={setEmployeeName} setTokenValidate={setTokenValidate} employeeName={employeeName} record={record} recordId={recordId} onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

const AuthorityDetailCardItem = connect(mapStateToProps)(AuthorityCardItemMain);

export default AuthorityDetailCardItem;
