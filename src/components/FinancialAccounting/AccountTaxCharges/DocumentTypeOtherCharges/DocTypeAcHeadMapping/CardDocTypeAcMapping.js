/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Row, Col, Button, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import FormDocTypeAcMapping from './FormDocTypeAcMapping';

const { Text } = Typography;

const CardDocTypeAcMapping = (props) => {
    const { finalFormdata, docTypeHeadMappingForm, forceUpdate, taxCharges, financialAccount, typeData, productHierarchyAttributeData, docTypeHeadMappingList, setDocTypeHeadMappingList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, buttonData, setButtonData, dropdownItems,
        //  setDropdownItems, 
         viewMode, internalId, financialAccHeadData, financialAccHeadName, setSelectedTreeSelectKey, selectedTreeSelectKey, handleSelectTreeClick } = props;

    const docTypeHeadMappingEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        setButtonData({ ...buttonData, formBtnActive: true });
        setSelectedTreeSelectKey(props?.financialAccountHeadId);
        editForm.setFieldsValue({
            chargeCode: props?.chargeCode,
            internalId: props?.internalId,
            financialAccountHeadId: props?.financialAccountHeadId,
            financialAccountHeadDesc: props?.financialAccountHeadDesc,
        });
    };

    const docTypeHeadMappingSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = docTypeHeadMappingList?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.chargeCode = newFormData?.chargeCode;
                obj.financialAccountHeadId = newFormData?.financialAccountHeadId;
                obj.financialAccountHeadDesc = newFormData?.financialAccountHeadDesc;
                obj.chargeCodeDesc = newFormData?.chargeCodeDesc;
                obj.financialAccountHeadCode = newFormData?.financialAccountHeadCode;
            }
            return obj;
        });

        setDocTypeHeadMappingList([...upd_obj]);
        // setDropdownItems(() => []);
        setFormEdit(false);
        forceUpdate();
    };

    const onDocTypeHeadMappingDelete = (val) => {
        setDocTypeHeadMappingList((prev) => {
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setFormEdit(false);
        docTypeHeadMappingForm.resetFields();
        forceUpdate();
    };

    const onDocTypeHeadMappingCancel = () => {
        setFormEdit(false);
        // setDropdownItems(() => []);
    };

    const FormProductAttributeProp = {
        productHierarchyAttributeData,
        editForm,
        finalFormdata,
        formEdit,
        docTypeHeadMappingList,
        taxCharges,
        taxCharge: objTaxCharge,
        setOpenAccordian,
        changeValue,
        setChangeValue,
        docTypeHeadMappingForm,
        dropdownItems,
        financialAccount,
        financialAccHeadData,
        financialAccHeadName,
        typeData,
        internalId,
        setSelectedTreeSelectKey,
        selectedTreeSelectKey,
        handleSelectTreeClick,
    };

    useEffect(() => {
        if (formEdit) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    const chargeCodeDescName = typeData?.find((e) => e?.key === props?.chargeCode)?.value;
    const financialAccountHeadName = financialAccHeadData?.find((e) => e?.id === props?.financialAccountHeadId)?.value;

    return (
        <Card>
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Text>{props?.chargeCodeDesc ? props?.chargeCodeDesc : chargeCodeDescName}</Text>
                    <Divider type="vertical" />
                    <Text>{props?.financialAccountHeadDesc ? props?.financialAccountHeadDesc : financialAccountHeadName}</Text>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                    {viewMode === false ? (
                        <>
                            {!formEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            docTypeHeadMappingEdit(props);
                                        }}
                                        //disabled={props?.disabledEdit}
                                    />
                                    <Button onClick={() => onDocTypeHeadMappingDelete(props)} type="link" icon={<FiTrash />} disabled={props?.id ? true : false} />
                                </>
                            )}
                            {formEdit && props?.internalId === uniqueCardEdit && (
                                <>
                                    <Button type="link" onClick={docTypeHeadMappingSave}>
                                        Save
                                    </Button>
                                    <Button type="link" onClick={onDocTypeHeadMappingCancel}>
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </>
                    ) : null}
                </Col>
            </Row>

            {formEdit && props?.internalId === uniqueCardEdit && (
                <>
                    <Divider />
                    <FormDocTypeAcMapping {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default CardDocTypeAcMapping;
