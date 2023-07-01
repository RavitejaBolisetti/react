/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer } from 'react';
import { Form } from 'antd';

import CardMapping from './CardMapping';
import AddEditForm from './AddEditForm';
import { Space } from 'antd';
import styles from 'components/common/Common.module.css';

const AccessoriesAddonMain = ({ setIsBtnDisabled, openAccordian, setOpenAccordian, isEditing, setisEditing, selectedOrderId, handleFormValueChange, showGlobalNotification, setsearchData, searchData, setaddButtonDisabled, onSearchPart, AddonPartsData, addButtonDisabled, accessoryForm, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo, formData }) => {
    const [EditingForm] = Form.useForm();
    const [identification, setidentification] = useState();
    const isPresent = (values, i = -1) => {
        const found = addOnItemInfo.filter((element, index) => element?.partNumber === values && index != i);

        if (found?.length === 2 || (found?.length === 1 && values === found['0']['partNumber'])) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Duplicate Part Number' });
            return true;
        }
        return false;
    };
    const onUpdate = (index, seteditCardForm) => {
        accessoryForm
            .validateFields()
            .then((values) => {
                if (isPresent(values?.partNumber, index)) {
                    return;
                }
                if (!values['type'] || !values['sellingPrice']) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Part Number to continue' });
                    return;
                }
                addOnItemInfo?.map((element, i) => {
                    if (i === index) {
                        const isDeletable = element?.isDeleting;
                        addOnItemInfo[i] = { ...values, isDeleting: isDeletable, id: element?.id, otfNumber: element?.otfNumber };
                        return;
                    }
                });
                seteditCardForm(false);
                setisEditing(false);
                handleFormValueChange();
            })
            .catch((err) => {});
    };
    const handleDelete = (index) => {
        setAddOnItemInfo(addOnItemInfo?.filter((element, i) => i !== index));
    };
    const onCancel = () => {
        accessoryForm.resetFields();
        setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
        if (!formData?.partDetailsResponses) {
            setOpenAccordian([]);
        }
    };

    const onFieldsChange = () => {
        // setCanFormSave(true);
    };
    const AddEditFormProps = {
        setsearchData,
        searchData,
        onSearchPart,
        AddonPartsData,
        isEditing,
        setisEditing,
        EditingForm,
        accessoryForm,
        formData,
        setIsBtnDisabled,
        isBtnDisabled,
        addOnItemInfo,
        setAddOnItemInfo,
        onFieldsChange,
        setaddButtonDisabled,
        addButtonDisabled,
        showGlobalNotification,
        onCancel,
        handleFormValueChange,
        selectedOrderId,
        onUpdate,
        isPresent,
    };
    return (
        <div>
            <Space size="large" direction="vertical">
                {addButtonDisabled?.partDetailsResponses && <AddEditForm {...AddEditFormProps} />}

                {addOnItemInfo?.map((element, index) => {
                    return <CardMapping AddEditFormProps={AddEditFormProps} identification={identification} element={element} isEditing={isEditing} setisEditing={setisEditing} handleDelete={handleDelete} index={index} />;
                })}
            </Space>
        </div>
    );
};

export default AccessoriesAddonMain;
