import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Col, Card, Row, Button, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

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

const AuthorityCardItemMain = ({ viewMode, form, onFinish, setDocumentTypesList, authorityTypeCode, setfinalFormdata, id, authorityEmployeeTokenNo, EffectiveTo, EffectiveFrom, forceUpdate, setIsBtnDisabled, isBtnDisabled, documentTypesList, selectedTreeData, authData, authorityVisible }) => {
    const [isEditing, setIsEditing] = useState(false);

    console.log(authData,"AUTHDATA")

    const recordId = id;
    const onEdit = () => {
        form.setFieldsValue({
            ['authorityTypeCode' + recordId]: authorityTypeCode,
            ['authorityEmployeeTokenNo' + recordId]: authorityEmployeeTokenNo,
            ['EffectiveTo' + recordId]: EffectiveTo,
            ['EffectiveFrom' + recordId]: EffectiveFrom,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {
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
                                <Text type="secondary">Authority</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{authData?.employeeName + ' | ' + authData?.authorityEmployeeTokenNo}</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">From - {authData?.effectiveFrom}</Text>
                                <Divider type="vertical" />
                                <Text type="secondary">To - {authData?.effectiveTo}</Text>
                            </Col>
                        </Row>
                    </Col>
                    {!viewMode && (
                        <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                            {!isEditing ? (
                                authorityVisible ? null : (
                                    <Row align="right">
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ float: 'right' }}>
                                            <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(authorityTypeCode, authorityEmployeeTokenNo, EffectiveTo, EffectiveFrom)} />
                                            {!authData?.id && <Button onClick={() => handleDeleteDocType({ EffectiveFrom, authorityTypeCode, EffectiveTo, authorityEmployeeTokenNo })} type="link" icon={<FiTrash />}></Button>}
                                        </Col>
                                    </Row>
                                )
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
                        <AddEditForm recordId={recordId} onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} authorityTypeCode={authorityTypeCode} EffectiveTo={EffectiveTo} EffectiveFrom={EffectiveFrom} authorityEmployeeTokenNo={authorityEmployeeTokenNo} isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

const AuthorityDetailCardItem = connect(mapStateToProps)(AuthorityCardItemMain);

export default AuthorityDetailCardItem;
