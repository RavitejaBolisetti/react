import React, { useEffect, useState } from 'react';

import { Row, Col, Table, Button, Input, Switch, Space, Modal, Form } from 'antd';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';

import styles from 'pages/common/Common.module.css';
import { validateRequiredInputField } from 'utils/validation';
import { DataTable } from 'utils/dataTable';

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

const datainitial = [
    {
        id: Math.random() * 1000,
        actionId: '1',
        actionName: 'Action name',
        status: 'N',
    },
    {
        id: Math.random() * 1000,
        actionId: '2',
        actionName: 'Random action',
        status: 'Y',
    },
];

const editRowData = [
    {
        id: Math.random() * 1000,
        deletable: true,
        isEditable: true,

        actionId: '', //as id  (UUID?)
        actionName: '',
        status: 'Y',
    }
]


const ApplicationActions = ({ form, isReadOnly, formActionType }) => {
    const [data, setRowsData] = useState(datainitial);

    useEffect(() => {
        if(formActionType === "view"){
            setRowsData(editRowData)
        }else{
            setRowsData(datainitial);
        }
    }, [formActionType]);

    const showConfirm = (record, index) => {
        confirm({
            title: 'Delete Action',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete action?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() {},
        });
    };

    const handleAdd = () => {
        const currentlyFormDataObj = form.getFieldsValue();
        const newData = {
            id: Math.random() * 1000,
            actionId: '',
            actionName: '',
            status: 'Y',
            deletable: true,
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

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action ID',
            dataIndex: 'id',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'actionId', inputType: 'text', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action Name',
            dataIndex: 'actionName',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'actionName', inputType: 'text', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {EditableCell({ index, record, title: 'Status', dataIndex: 'status', inputType: 'switch', form })}


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
            dataIndex: '',
            // editable: false,
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {record?.deletable && <FaEdit color='#ff3e5b' onClick={() => edit(record)} />}
                        {!record?.deletable && <FaTrash color='#ff3e5b' onClick={() => showConfirm(record, index)} />}
                    </Space>
                );
            },
        })
    );

    const onFinish = (values) => {
        console.log('On finish', values);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    return (
        <>
            <Form scrollToFirstError={true} preserve={false} form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {/* <Table scroll={{ x: 'auto'}} dataSource={[...data]} pagination={false} columns={tableColumn} /> */}
                            <DataTable isLoading={false} tableColumn={tableColumn} tableData={data} />
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
                </>
            </Form>
        </>
    );
};

export default ApplicationActions;
