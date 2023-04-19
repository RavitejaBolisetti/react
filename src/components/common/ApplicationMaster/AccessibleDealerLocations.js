import React, { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Button, Col, Row, Form, Select, Modal, Input, Table, Switch, Space } from 'antd';

import styles from 'components/common/Common.module.css';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const { confirm } = Modal;

export const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, form, ...restProps }) => {
    let inputField = '';
    switch (inputType) {
        case 'switch':
            inputField = (
                <Form.Item
                    normalize={(a, b) => (a ? 'Y' : 'N')}
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    // rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Switch defaultChecked={record[dataIndex] === 'Y'} readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable} checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            );
            break;
        case 'select':
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    // rules={[validateRequiredInputField(`${title}`)]}
                    rules={[validateRequiredSelectField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Select
                        defaultValue={record[dataIndex]}
                        showSearch
                        placeholder="Select accesable location"
                        optionFilterProp="children"
                        style={{
                            width: '140px',
                        }}
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={locationsData}
                    />
                </Form.Item>
            );
            break;
        default:
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Input readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable} />
                </Form.Item>
            );
            break;
    }
    return <td key={record.id + index + dataIndex + 'swi'}>{inputField}</td>;
};

const locationsData = [
    {
        id: '1',
        code: 'uuid1',
        value: 'Location 1',
    },
    {
        id: '2',
        code: 'uuid2',
        value: 'Location 2',
    },
    {
        id: '3',
        code: 'uuid3',
        value: 'Location',
    },
];

const existingLocation = [
    {
        key: Math.random() * 1000,
        id: '1321',
        code: 'uuid123',
        value: 'Location uuid123',
    },
];

const AccessibleDealerLocations = ({ form, isReadOnly }) => {
    const [data, setRowsData] = useState(existingLocation);

    const handleAdd = () => {
        const currentlyFormDataObj = form.getFieldsValue();
        const newData = {
            id: Math.random() * 1000,
            key: Math.random() * 1000,
            code: '',
            value: '',
        };
        const newlyAddedRow = Object.entries(currentlyFormDataObj)
            .map(([key, value]) => value)
            .filter((v) => !!v);
        setRowsData([...newlyAddedRow, { ...newData }]);
    };

    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => (+item?.id === +record?.id ? { ...item, isEditable: true } : item));
        setRowsData(updatedDataItem);
    };

    const deleteTableRows = (record, index) => {
        const currentRows = form.getFieldsValue();
        const updatedRows = Object.entries(currentRows)
            .map(([key, value]) => value)
            // .filter((v) => !!v)
            .filter((el) => el?.id !== record?.id);
        setRowsData([...updatedRows]);
    };

    const showConfirm = (record, index) => {
        confirm({
            title: 'Delete Location',
            icon: <ExclamationCircleFilled />,
            content: 'Do you Want to delete this location?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() { },
        });
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Dealer Location',
            dataIndex: 'value',
            width: '17%',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {EditableCell({ record, index, title: 'Dealer Location', dataIndex: 'value', inputType: 'select', form })}

                        <Form.Item hidden initialValue={record.key} name={[index, 'key']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.id} name={[index, 'id']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.deletable} name={[index, 'deletable']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.isEditable} name={[index, 'isEditable']}>
                            <Input />
                        </Form.Item>
                    </Space>
                );
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: '',
            dataIndex: 'action',
            width: '50',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {/* {!record?.deletable && <FaEdit onClick={() => edit(record)} />} */}
                        {<FaTrash onClick={() => showConfirm(record, index)} />}
                    </Space>
                );
            },
        })
    );

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };
    const onFinish = (values) => {
        // console.log('On finish', values);
    };

    return (
        <>
            <Form scrollToFirstError={true} preserve={false} form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table dataSource={data} pagination={false} columns={tableColumn} />
                    </Col>
                </Row>
                {!isReadOnly && (
                    <Row justify="end" gutter={20} style={{ marginTop: '20px', marginRight: '2px' }}>
                        <Button danger onClick={handleAdd}>
                            <FaPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AccessibleDealerLocations;
