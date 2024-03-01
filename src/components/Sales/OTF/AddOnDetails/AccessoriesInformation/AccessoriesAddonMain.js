/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Divider, Form } from 'antd';

import CardMapping from './CardMapping';
import AddEditForm from './AddEditForm';
import { NoDataFound } from 'utils/noDataFound';
import { translateContent } from 'utils/translateContent';

const AccessoriesAddonMain = ({ setIsBtnDisabled, partNameSearchVisible, setPartNameSearchVisible, fnSetData, isEditing, setisEditing, selectedOrderId, handleFormValueChange, showGlobalNotification, setsearchData, searchData, setaddButtonDisabled, onSearchPart, AddonPartsData, addButtonDisabled, accessoryForm, isBtnDisabled, setAddOnItemInfo, addOnItemInfo, formData }) => {
    const [EditingForm] = Form.useForm();

    const isPresent = (partNumber, i = -1) => {
        const isPartAlreadyExist = addOnItemInfo?.find((element, index) => element?.partNumber === partNumber && index !== i);
        if (isPartAlreadyExist) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingManagement.validation.partAlreadyAdded') });
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

                if (!values?.partNumber) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingManagement.validation.providePartNumber') });
                    return;
                }

                addOnItemInfo?.map((element, i) => {
                    if (i === index) {
                        const isDeletable = element?.isDeleting;
                        addOnItemInfo[i] = { ...values, isDeleting: isDeletable, id: element?.id, otfNumber: element?.otfNumber };
                        return undefined;
                    }
                    return undefined;
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
        setsearchData();
        setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
        // if (!formData?.partDetailsResponses) {
        //     setOpenAccordian([]);
        // } Need to check
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
        setaddButtonDisabled,
        addButtonDisabled,
        showGlobalNotification,
        onCancel,
        handleFormValueChange,
        selectedOrderId,
        onUpdate,
        isPresent,
        partNameSearchVisible,
        setPartNameSearchVisible,
        fnSetData,
    };
    return (
        <>
            <Divider />
            {addButtonDisabled?.partDetailsResponses && <AddEditForm {...AddEditFormProps} />}
            {!addOnItemInfo?.length && !addButtonDisabled?.partDetailsResponses && <NoDataFound information={translateContent('bookingManagement.label.addAccessories')} />}
            {addOnItemInfo?.map((element, index) => {
                return <CardMapping AddEditFormProps={AddEditFormProps} element={element} isEditing={isEditing} setisEditing={setisEditing} handleDelete={handleDelete} index={index} />;
            })}
        </>
    );
};

export default AccessoriesAddonMain;
