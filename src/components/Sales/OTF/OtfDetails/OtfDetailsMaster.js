import React from 'react';
import { Form } from 'antd';

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

    return <AddEditForm {...formProps} />;
};

export default OtfDetailsMaster;
