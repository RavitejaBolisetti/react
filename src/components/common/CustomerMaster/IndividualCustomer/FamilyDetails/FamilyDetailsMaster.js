import React, { useState, useRef, useCallback } from 'react';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';

const FamilyDetailsBase = () => {
    const [familyForm] = Form.useForm();
    const [value, setValue] = useState(true);
    const selectRef = useRef();
    const onChange = useCallback((item) => {
        selectRef.current.blur();
        setValue(item);
    }, []);
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState(null);
    const [editedMode, setEditedMode] = useState(false);

    const onSave = () => {
        let values = familyForm.getFieldsValue();
        console.log(values, 'VALUES');
        setShowForm(false);
        setEditedMode(false);
        //let index = familyDetailList?.findIndex(e => e.familyMembername === values.familyMembername && e.relationAge === values.relationAge);
        setFamilyDetailsList(() => [values]);
    };

    const onFamilyFinish = (values) => {
        setFamilyDetailsList((items) => [...items, values]);
        familyForm.resetFields();
        setShowForm(false);

        if (values?.relationship === 1) {
            setCustomerType(true);
        } else if (values?.relationship === 0) {
            setCustomerType(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const formProps = {
        familyForm,
        value,
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

    return (
        <>
            <h2>Family Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const FamilyDetails = FamilyDetailsBase;
