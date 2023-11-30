/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Row, Button, Divider, Typography, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import FormAccountAndDocumentMapping from './FormAccountAndDocumentMapping';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;

const CardAccountAndDocumentMapping = (props) => {
    const { finalFormdata, accDocMapForm, forceUpdate, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, handleDescriptionChange, buttonData, setButtonData, dropdownItems, setDropdownItems, accountDocumentMaps, setAccountDocumentMaps, accountCategoryData, applicationMenuData, financialAccountData, setSelectedTreeSelectKey, setUserApplicationId, viewMode, selectedTreeSelectKey, handleSelectTreeClick, documentDescriptionData, appSelectName } = props;
    const appName = props?.applicationName ? props?.applicationName : appSelectName;
    const docName = props?.documentDescription;
    const financeName = financialAccountData?.find((e) => e?.key === props?.financialAccountHeadCode)?.value;

    const accDocMapEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        setButtonData({ ...buttonData, formBtnActive: true });
        setSelectedTreeSelectKey(() => props?.applicationId);

        editForm.setFieldsValue({
            applicationId: props?.applicationId,
            documentTypeCode: props?.documentTypeCode,
            financialAccountHeadCode: props?.financialAccountHeadCode,
            internalId: props?.internalId,
            accountDocumentMapId: props?.accountDocumentMapId,
            applicationName: props?.applicationName,
            documentDescription: props?.documentDescription,
            financialAccountHead: props?.financialAccountHead,
        });
    };

    const onAccountDocumentMapsSave = () => {
        let formData = editForm?.getFieldsValue();
        let documentDescription = documentDescriptionData?.find((e) => e?.key === formData?.documentTypeCode)?.value;
        editForm.setFieldsValue({
            documentDescription: documentDescription,
        });
        editForm
            .validateFields()
            .then(() => {
                let newFormData = editForm?.getFieldsValue();
                const upd_obj = accountDocumentMaps?.map((obj) => {
                    if (obj?.internalId === newFormData?.internalId) {
                        obj.applicationId = newFormData?.applicationId;
                        obj.documentTypeCode = newFormData?.documentTypeCode;
                        obj.financialAccountHeadCode = newFormData?.financialAccountHeadCode;
                        obj.applicationName = newFormData?.applicationName;
                        obj.documentDescription = newFormData?.documentDescription;
                        obj.financialAccountHead = newFormData?.financialAccountHead;
                    }
                    return obj;
                });

                setAccountDocumentMaps([...upd_obj]);
                setDropdownItems(() => []);
                setFormEdit(false);
                forceUpdate();
            })
            .catch((err) => {
                return err;
            });
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
        <Card>
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Space direction="vertical">
                    <Space>
                        <Text>{appName}</Text>
                        <Divider type="vertical" />
                        <Text>{docName}</Text>
                    </Space>
                    <Text type="secondary">{financeName}</Text>
                </Space>

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
                            <Space className={styles.cardItemBtn} data-testid="cancel_btn">
                                <Button type="link" onClick={onAccountDocumentMapsCancel}>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                                <Button type="link" onClick={onAccountDocumentMapsSave} data-testid="save_btn">
                                    {translateContent('global.buttons.save')}
                                </Button>
                            </Space>
                        )}
                    </Row>
                ) : null}
            </Row>

            {formEdit && props?.internalId === uniqueCardEdit && <FormAccountAndDocumentMapping {...FormProductAttributeProp} />}
        </Card>
    );
};

export default CardAccountAndDocumentMapping;
