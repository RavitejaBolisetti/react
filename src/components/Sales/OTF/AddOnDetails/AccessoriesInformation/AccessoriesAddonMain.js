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

const AccessoriesAddonMain = ({ setIsBtnDisabled, isEditing, setisEditing, selectedOrderId, handleFormValueChange, showGlobalNotification, setsearchData, searchData, setaddButtonDisabled, onSearchPart, AddonPartsData, addButtonDisabled, accessoryForm, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo, formData }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [EditingForm] = Form.useForm();
    const [identification, setidentification] = useState();
    const addOnformOnFinish = (val) => {
        setAddOnItemInfo((prev) => [...prev, val]);
        accessoryForm.resetFields();
        forceUpdate();
    };
    const isPresent = (values) => {
        const found = addOnItemInfo.filter((element, index) => {
            if (element?.partNumber === values) return element;
        });
        console.log('found', found);
        if (found?.length === 2) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Duplicate Part Number' });
            return true;
        }

        return false;
    };
    const onUpdate = (index, seteditCardForm) => {
        accessoryForm
            .validateFields()
            .then((values) => {
                if (isPresent(values?.partNumber)) {
                    return;
                }
                if (!values['type'] || !values['sellingPrice']) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Part Number to continue' });
                    return;
                }
                addOnItemInfo?.map((element, i) => {
                    if (i === index) {
                        addOnItemInfo[i] = { ...values };
                        return;
                    }
                });
                seteditCardForm(false);
                setisEditing(false);
                handleFormValueChange();
                console.log('this is update', index);
            })
            .catch(() => {});
    };
    const handleDelete = (index) => {
        setAddOnItemInfo(addOnItemInfo?.filter((element, i) => i !== index));
    };
    const onCancel = () => {
        accessoryForm.resetFields();
        setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
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
        <>
            {addButtonDisabled?.partDetailsResponses && <AddEditForm {...AddEditFormProps} />}

            {addOnItemInfo?.map((element, index) => {
                return <CardMapping AddEditFormProps={AddEditFormProps} identification={identification} element={element} isEditing={isEditing} setisEditing={setisEditing} handleDelete={handleDelete} index={index} />;
            })}
        </>
    );
};

export default AccessoriesAddonMain;
