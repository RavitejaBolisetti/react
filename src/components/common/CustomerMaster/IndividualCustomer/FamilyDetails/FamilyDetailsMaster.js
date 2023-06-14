import React, { useState, useRef, useCallback } from 'react';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';

const FamilyDetailsBase = () => {
    const [familyForm] = Form.useForm();
    const type = [
        { name: 'YES', value: 1 },
        { name: 'NO', value: 0 },
    ];
    const [value, setValue] = useState(true);
    const selectRef = useRef();
    const onChange = useCallback((item) => {
        selectRef.current.blur();
        setValue(item);
    }, []);
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const onFamilyFinish = (values) => {
        setFamilyDetailsList((items)=>[...items,values]);
        familyForm.resetFields();
        setShowForm(false);
    };

    const onFinishFailed = (errorInfo) => {
       return
    };

    const formProps = {
        familyForm,
        type,
        value,
        onChange,
        selectRef,
        onFamilyFinish,
        onFinishFailed,
        familyDetailList,
        showForm, setShowForm,
    };

    return (
        <>
            <h2>Family Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const FamilyDetails = FamilyDetailsBase;
