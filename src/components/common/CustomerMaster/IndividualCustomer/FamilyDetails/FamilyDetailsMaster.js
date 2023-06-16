import React, { useState } from 'react';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';

const FamilyDetailsBase = () => {
    const [familyForm] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [generateId, setGenerateId] = useState(0);

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSave = () => {
        let values = familyForm.getFieldsValue();
           
        const upd_obj = familyDetailList?.map(obj => {

            if (obj?.customerId === values?.customerId) {
                obj.customerName = values?.customerName;
                obj.relationAge = values?.relationAge;
                obj.relationship = values?.relationship;
                obj.remarks = values?.remarks;
            }
            return obj;
           }
        )

        setFamilyDetailsList([...upd_obj] )
        setShowForm(false);
        setEditedMode(false);
    };

    const onFamilyFinish = (values) => {
        setGenerateId(() => generateId + 1);
        setFamilyDetailsList((items) => [...items, { ...values, customerId: generateId }]);
        familyForm.resetFields();
        setShowForm(false);

        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const formProps = {
        familyForm,
        onChange,
        onFamilyFinish,
        onFinishFailed,
        familyDetailList,
        showForm,
        setShowForm,
        customerType,
        onSave,
        editedMode,
        setEditedMode,
        setCustomerType,
    };

    return <AddEditForm {...formProps} />;
};

export const FamilyDetails = FamilyDetailsBase;
