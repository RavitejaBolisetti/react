import React, { useState, useRef, useCallback } from 'react';
import { Collapse, Space, Typography, Form } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { AddEditForm } from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const FamilyDetailsBase = () => {
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const [form] = Form.useForm();

    const type = [
        { name: 'YES', value: 1 },
        { name: 'NO', value: 0 },
    ];

    const [value, setValue] = useState(true);

    const selectRef = useRef();

    const onChange = useCallback((item) => {
        selectRef.current.blur(); //whenever a user triggers value change, we call `blur()` on `Select`
        setValue(item);
    }, []);

    const onFamilyFinish = (values) => {
        console.log(values, 'valuesvaluesvalues')
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const formProps = {
        form,
        type,
        value,
        onChange,
        selectRef,
        onFamilyFinish,
        onFinishFailed,
    }

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <FaUserCircle style={{ color: 'red' }} /> : <FaUserCircle />)} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text> Family Details </Text>{' '}
                        </Space>
                    </>
                }
                key="1"
            >
                <AddEditForm {...formProps} />
            </Panel>
        </Collapse>
    );
};

export const FamilyDetailsMaster = FamilyDetailsBase;
