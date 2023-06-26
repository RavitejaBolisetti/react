/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useReducer } from 'react';
import { Form } from 'antd';

import CardAccessories from './CardAccessories';
import AddEditForm from './AddEditForm';

const AccessoriesAddonMain = ({ setIsBtnDisabled, accessoryForm, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo, formData }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const addOnformOnFinish = (val) => {
        setAddOnItemInfo((prev) => [...prev, val]);
        accessoryForm.resetFields();
        forceUpdate();
    };

    const onFieldsChange = () => {
        // setCanFormSave(true);
    };

    return (
        <>
            <AddEditForm accessoryForm={accessoryForm} formData={formData} onFinish={addOnformOnFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} addOnItemInfo={addOnItemInfo} onFieldsChange={onFieldsChange} />

            {addOnItemInfo?.length > 0 &&
                addOnItemInfo?.map((item) => {
                    return <CardAccessories {...item} form={accessoryForm} onFinish={addOnformOnFinish} addOnItemInfo={addOnItemInfo} setAddOnItemInfo={setAddOnItemInfo} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default AccessoriesAddonMain;
