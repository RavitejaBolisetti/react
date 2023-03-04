import React, { useState } from 'react';

import { Row, Col, Table, Button, Input, Switch, Space, Modal, Form } from 'antd';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';

import styles from 'pages/common/Common.module.css';
import { validateRequiredInputField } from 'utils/validation';

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
            key:Math.random()*1000,
            id: Math.random()*1000,
            documentTypeCode: 'Enter Code',
            documentTypeDescription: 'Descrption',
            termsandcondition: 'Y',
            digitalsignature: 'N',
        },
        {
            key:Math.random()*1000,
            id: Math.random()*1000,
            documentTypeCode: 'Enter Code',
            documentTypeDescription: 'Enter description Data',
            termsandcondition: "Y",
            digitalsignature: "N",
        },
    ];

const ApplicationActions = ({form, isReadOnly}) => {
    // const [form] = Form.useForm();
    const [data, setRowsData] = useState(datainitial);

    const showConfirm = (record, index) => {
        confirm({
            title: 'Delete Document Type',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete this document type?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleAdd = () => {
        const currentlyFormDataObj = form.getFieldsValue();
        const newData = {
            id: Math.random() * 1000,
            key: Math.random() * 1000,
            actionId: "",
            actionName: "",
            status: "Y",
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
            title: 'Code',
            dataIndex: 'documentTypeCode',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'documentTypeCode', inputType: 'text', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'documentTypeDescription',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Description', dataIndex: 'documentTypeDescription', inputType: 'text', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'T&C Required',
            dataIndex: 'termsandcondition',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {EditableCell({ index, record, title: 'T&C Required', dataIndex: 'termsandcondition', inputType: 'switch', form })}
                    </Space>
                );
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Digital Signature Required',
            dataIndex: 'digitalsignature',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {EditableCell({ index, record, title: 'Digital Signature Required', dataIndex: 'digitalsignature', inputType: 'switch', form })}

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
            title: 'Action',
            dataIndex: 'action',
            // editable: false,
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {!record?.deletable && <FaEdit onClick={() => edit(record)} />}
                        {record?.deletable && <FaTrash onClick={() => showConfirm(record, index)} />}
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

            <Form scrollToFirstError={true} preserve={false} form={form} layout="vertical" onFinish={onFinish}  onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Table dataSource={[...data]} pagination={false} columns={tableColumn}  />
                        </Col>
                    </Row>
                    {
                        !isReadOnly &&
                        <Row justify="end" gutter={20} style={{ marginTop: '20px', marginRight: '2px' }}>
                            <Button  danger onClick={handleAdd}>
                                <FaPlus className={styles.buttonIcon} />
                                {" "}Add Row
                            </Button>
                        </Row>
                    }
            </Form>
        </>
    );
};

export default ApplicationActions;
