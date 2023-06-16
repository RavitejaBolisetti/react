import React, { useState, useRef } from 'react';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';

const FamilyDetailsBase = () => {
    const [familyForm] = Form.useForm();
    const selectRef = useRef();

    const onChange = (value) =>{
        console.log(value)
        setCustomerType(value);
    }

    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState(null);
    const [editedMode, setEditedMode] = useState(false);

    const onSave = () => {
        let values = familyForm.getFieldsValue();
        setShowForm(false);
        setEditedMode(false);
        setFamilyDetailsList(() => [values]);
    };

    const onFamilyFinish = (values) => {
        let yesNo = values?.mnmCustomer === 0 ? "No" : "Yes";
        setFamilyDetailsList((items) => [...items,{...values, mnmCustomer: yesNo } ]);
        familyForm.resetFields();
        setShowForm(false);

        if (values?.mnmCustomer === 1) {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 0) {
            setCustomerType(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const formProps = {
        familyForm,
        onChange,
        selectRef,
        onFamilyFinish,
        onFinishFailed,
        familyDetailList,
        showForm,
        setShowForm,
        customerType,
        onSave,
        editedMode,
        setEditedMode,
    };

    return <AddEditForm {...formProps} />;
};

export const FamilyDetails = FamilyDetailsBase;
