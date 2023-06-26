/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer } from 'react';
import { Form } from 'antd';

import CardMapping from './CardMapping';
import AddEditForm from './AddEditForm';

const AccessoriesAddonMain = ({ setIsBtnDisabled, setsearchData, searchData, setaddButtonDisabled, onSearchPart, AddonPartsData, addButtonDisabled, accessoryForm, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo, formData }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [EditingForm] = Form.useForm();
    const [isEditing, setisEditing] = useState(false);
    const addOnformOnFinish = (val) => {
        setAddOnItemInfo((prev) => [...prev, val]);
        accessoryForm.resetFields();
        forceUpdate();
    };
    const handleDelete = (index) => {
        setAddOnItemInfo(addOnItemInfo?.filter((element, i) => i !== index));
    };
    const handleEdit = (index) => {
        setisEditing(true);
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
    };
    return (
        <>
            {addButtonDisabled?.partDetailsResponses && <AddEditForm {...AddEditFormProps} />}

            {addOnItemInfo?.map((element, index) => {
                return <CardMapping element={element} isEditing={isEditing} setisEditing={setisEditing} handleDelete={handleDelete} index={index} />;
            })}
        </>
    );
};

export default AccessoriesAddonMain;
