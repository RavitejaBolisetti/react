import React from 'react';
import { Form, Card } from 'antd';

import AddEditForm from './AddEditForm';

const OtfDetailsMaster = (props) => {
    const [form] = Form.useForm();

    const onFinish = () => {};

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
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
