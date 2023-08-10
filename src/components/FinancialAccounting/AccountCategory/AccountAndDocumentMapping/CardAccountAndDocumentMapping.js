/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useEffect } from 'react';
import { Card, Row, Button, Divider, Typography, Col } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormAccountAndDocumentMapping from './FormAccountAndDocumentMapping';

const { Text } = Typography;

const CardAccountAndDocumentMapping = (props) => {
    const { finalFormdata, accDocMapForm, forceUpdate, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, handleDescriptionChange, buttonData, setButtonData, dropdownItems, setDropdownItems, accountDocumentMaps, setAccountDocumentMaps, accountCategoryData, applicationMenuData, financialAccountData, setSelectedTreeSelectKey, setUserApplicationId, viewMode, selectedTreeSelectKey, handleSelectTreeClick, documentDescriptionData, appSelectName } = props;

    console.log('props?.applicationName ',props?.applicationName );
    const appName = props?.applicationName ? props?.applicationName : appSelectName;
    const docName = props?.documentDescription ? props?.documentDescription : documentDescriptionData?.find((e) => e?.key === props?.documentTypeCode)?.value;
    const financeName = financialAccountData?.find((e) => e?.key === props?.financialAccountHeadCode)?.value;

    console.log('props?.applicationName', props?.applicationName);

    const accDocMapEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        setButtonData({ ...buttonData, formBtnActive: true });
        setSelectedTreeSelectKey(() => props?.applicationId);

        editForm.setFieldsValue({
            documentTypeCode: props?.documentTypeCode,
            financialAccountHeadCode: props?.financialAccountHeadCode,
            internalId: props?.internalId,
            financialAccountHead: financeName,
        });
    };

    const onAccountDocumentMapsSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = accountDocumentMaps?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.documentTypeCode = newFormData?.documentTypeCode;
                obj.financialAccountHeadCode = newFormData?.financialAccountHeadCode;
                obj.applicationMenu = newFormData?.applicationMenu;
                obj.internalId = newFormData?.internalId;
                obj.documentDescription = newFormData?.documentDescription;
                obj.financialAccountHead = newFormData?.financialAccountHead;
            }
            return obj;
        });

        setAccountDocumentMaps([...upd_obj]);
        setDropdownItems(() => []);
        setFormEdit(false);
        forceUpdate();
    };

    const onAccAndMapDelete = (val) => {
        setAccountDocumentMaps((prev) => {
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setFormEdit(false);
        accDocMapForm.resetFields();
        forceUpdate();
    };

    const onAccountDocumentMapsCancel = () => {
        setFormEdit(false);
        setDropdownItems(() => []);
    };

    const FormProductAttributeProp = {
        editForm,
        finalFormdata,
        formEdit,
        accountDocumentMaps,
        accountCategoryData,
        setOpenAccordian,
        changeValue,
        setChangeValue,
        handleCodeFunction,
        accDocMapForm,
        handleDescriptionChange,
        dropdownItems,
        applicationMenuData,
        setUserApplicationId,
        viewMode,
        setSelectedTreeSelectKey,
        financialAccountData,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        documentDescriptionData,
    };

    useEffect(() => {
        if (formEdit) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
        >
            <Row align="middle" justify="space-between">
                <Col>
                    <Row align="center">
                        <div>
                            <Text>{appName}</Text>
                        </div>
                        <Divider type="vertical" />
                        <div>
                            <Text>{docName}</Text>
                        </div>
                    </Row>
                    <Text className={styles.marB20} type="secondary">
                        {financeName}
                    </Text>
                </Col>

                {viewMode === false ? (
                    <Row>
                        <div className={styles.cardItemBtn}>
                            {!formEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            accDocMapEdit(props);
                                        }}
                                    />
                                    <Button onClick={() => onAccAndMapDelete(props)} type="link" icon={<FiTrash />} disabled={props?.accountDocumentMapId ? true : false} />
                                </>
                            )}
                        </div>
                        {formEdit && props?.internalId === uniqueCardEdit && (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" onClick={onAccountDocumentMapsCancel}>
                                    Cancel
                                </Button>
                                <Button type="link" onClick={onAccountDocumentMapsSave}>
                                    Save
                                </Button>
                            </div>
                        )}
                    </Row>
                ) : null}
            </Row>

            {formEdit && props?.internalId === uniqueCardEdit && <FormAccountAndDocumentMapping {...FormProductAttributeProp} />}
        </Card>
    );
};

export default CardAccountAndDocumentMapping;
