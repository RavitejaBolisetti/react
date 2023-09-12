/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Row, Button, Divider, Typography, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

import FormNotificationDetail from './FormNotificationDetail';

import styles from 'assets/sass/app.module.scss';
const { Text } = Typography;

const CardNotificationDetail = (props) => {
    const { finalFormdata, notificationDetailForm, forceUpdate, taxCharges, financialAccount, typeData, productHierarchyAttributeData, docTypeHeadMappingList, setDocTypeHeadMappingList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, buttonData, setButtonData, dropdownItems, setDropdownItems, viewMode } = props;
    const { filterDesignationList, roleData } = props;

    const currentRole = roleData?.find((i) => i?.key === props?.roleCode)?.value;
    const currentDestination = filterDesignationList?.find((i) => i?.designationCode === props?.designationCode)?.designationDescription;

    const docTypeHeadMappingEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        setButtonData({ ...buttonData, formBtnActive: true });

        editForm.setFieldsValue({
            roleCode: props?.roleCode,
            internalId: props?.internalId,
            designationCode: props?.designationCode,
        });
    };

    const docTypeHeadMappingSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = docTypeHeadMappingList?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.roleCode = newFormData?.roleCode;
                obj.designationCode = newFormData?.designationCode;
            }
            return obj;
        });

        setDocTypeHeadMappingList([...upd_obj]);
        setDropdownItems(() => []);
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
        notificationDetailForm.resetFields();
        forceUpdate();
    };

    const onDocTypeHeadMappingCancel = () => {
        setFormEdit(false);
        setDropdownItems(() => []);
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
        // handleCodeFunction,
        notificationDetailForm,
        dropdownItems,
        financialAccount,
        typeData,
        filterDesignationList,
    };

    useEffect(() => {
        if (formEdit) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    // const chargeCodeDescName = typeData?.find((e) => e?.key === props?.chargeCode)?.value;
    // const financialAccountHeadName = financialAccount?.find((e) => e?.id === props?.financialAccountHeadId)?.value;
    // const { handleRoleFunction, } = props;
    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
            }}
        >
            <Row align="middle" justify="space-between" className={styles.marB20}>
                {/* {formActionType?.viewMode && (
                    <>                        
                    <Space>formActionType</Space>
                    </>
                    ) ) */}

                <Space>
                    {/* <Text>{props?.roleCode}</Text> */}
                    <Text>{currentRole}</Text>
                    <Divider type="vertical" />
                    <Text>{currentDestination}</Text>
                    {/* <Text>{props?.designationCode ? props?.designationCode : formData.designationCode} </Text> */}

                    {/* <Text>{props?.designationCode ? props?.designationCode : financialAccountHeadName} AA</Text> */}
                </Space>

                {/* {viewMode === false ? ( */}
                <Row>
                    <div className={styles.cardItemBtn}>
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
                    </div>
                    {formEdit && props?.internalId === uniqueCardEdit && (
                        <div className={styles.cardItemBtn}>
                            <Button type="link" onClick={onDocTypeHeadMappingCancel}>
                                Cancel
                            </Button>
                            <Button type="link" onClick={docTypeHeadMappingSave}>
                                Save
                            </Button>
                        </div>
                    )}
                </Row>
                {/* ) : null}  */}
            </Row>

            {formEdit && props?.internalId === uniqueCardEdit && (
                <>
                    <Divider />
                    <FormNotificationDetail {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default CardNotificationDetail;
