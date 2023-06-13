import React from 'react';
import { Form, Card } from 'antd';

import AddEditForm from './AddEditForm';

const OtfDetailsMaster = () => {
    const [form] = Form.useForm();

    const onFinish = () => {};


    const onFinishFailed = () => {};

    
    const formProps = {
        form,
        onFinish,
        onFinishFailed,
    };

    return (
        <>
            <Card>
                <AddEditForm {...formProps} />
            </Card>
        </>
    );
};

export default OtfDetailsMaster;
