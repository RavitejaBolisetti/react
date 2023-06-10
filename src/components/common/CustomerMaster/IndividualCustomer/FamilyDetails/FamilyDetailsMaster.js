import React, { useState, useRef, useCallback } from 'react';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';

const FamilyDetailsBase = () => {
    const [form] = Form.useForm();

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

    const onFamilyFinish = (values) => {};

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const formProps = {
        form,
        type,
        value,
        onChange,
        selectRef,
        onFamilyFinish,
        onFinishFailed,
    };

    return (
        <>
            <h2>Customer Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const FamilyDetails = FamilyDetailsBase;
