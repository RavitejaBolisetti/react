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
    const [customerType, setCustomerType] = useState(null);

    const onFamilyFinish = (values) => {
        console.log(values,'VALUES')
        setFamilyDetailsList((items)=>[...items,values]);
        familyForm.resetFields();
        setShowForm(false);

        if(values?.relationship === 1){
            setCustomerType(true);
        } else if(values?.relationship === 0){
            setCustomerType(false);
        }
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
        showForm, setShowForm,customerType,
    };

    return (
        <>
            <h2>Family Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const FamilyDetails = FamilyDetailsBase;
