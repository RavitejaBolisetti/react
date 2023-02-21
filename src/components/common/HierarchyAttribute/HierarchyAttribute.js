import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';

import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from '../Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { geoDataActions } from 'store/actions/data/geo';
import { tblPrepareColumns } from 'utils/tableCloumn';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    let inputField = '';
    switch (inputType) {
        case 'switch':
            inputField = <Switch defaultChecked={record[dataIndex]} readOnly={record?.readOnly} disabled={record?.readOnly} checkedChildren="Yes" unCheckedChildren="No" />;
            break;
        default:
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex[index]}
                    rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Input value={record[dataIndex]} readOnly={record?.readOnly} disabled={record?.disabled} />
                </Form.Item>
            );
            break;
    }
    return <td>{inputField}</td>;
};

const initialData = [
    {
        id: '1',
        hierarchyAttribueId: '1q',
        hierarchyAttribueCode: '1234',
        hierarchyAttribueName: 'Dev attribute',
        duplicateAllowedAtAttributerLevelInd: false,
        duplicateAllowedAtDifferentParent: true,
        isChildAllowed: false,
        status: true,
        readOnly: true,
    },
    {
        id: '2',
        hierarchyAttribueId: '2q',
        hierarchyAttribueCode: '3445',
        hierarchyAttribueName: 'dummy attribute',
        duplicateAllowedAtAttributerLevelInd: true,
        duplicateAllowedAtDifferentParent: false,
        isChildAllowed: true,
        status: true,
        readOnly: true,
    },
];

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData }) => {
    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
            // fetchList({ setIsLoading: listShowLoading, userId, type: 'Geographicals'})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    const showSuccessModel = ({ title, message }) => {
        successModel({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const onError = (message) => {
        errorModel({
            title: 'ERROR',
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const showConfirm = (key) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // set count of rows

    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    const [data, setRowsData] = useState(initialData);
    console.log('🚀 ~ file: HierarchyAttribute.js:160 ~ HierarchyAttributeBase ~ initialData:', initialData);
    const [count, setCount] = useState(data.length || 0);

    const handleAdd = () => {
        const newData = {
            id: Math.random(0, 1000) * 100,
            hierarchyAttribueId: '',
            hierarchyAttribueCode: '',
            hierarchyAttribueName: '',
            duplicateAllowedAtAttributerLevelInd: false,
            duplicateAllowedAtDifferentParent: false,
            isChildAllowed: false,
            status: false,
            readOnly: false,
        };
        setRowsData([...data, newData]);
        setCount(count + 1);
    };

    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => (+item.id === +record.id ? { ...item, readOnly: false } : item));
        console.log('updatedDataItem', data, record?.id, updatedDataItem);
        setRowsData(updatedDataItem);
    };

    const deleteTableRows = (index) => {
        console.log('🚀 ~ file: HierarchyAttribute.js:183 ~ deleteTableRows ~ index:', index, data);
        const updatedDataItem = data && data.filter((item) => console.log('item', item.id, 'index', index) || +item.id !== +index);
        setRowsData(updatedDataItem);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'hierarchyAttribueCode', inputType: 'text' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Name', dataIndex: 'hierarchyAttribueName', inputType: 'text' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed', dataIndex: 'duplicateAllowedAtAttributerLevelInd', inputType: 'switch' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtDifferentParent',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed under different Parent', dataIndex: 'duplicateAllowedAtDifferentParent', inputType: 'switch' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Child Allowed', dataIndex: 'isChildAllowed', inputType: 'switch' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Status', dataIndex: 'status', inputType: 'switch' })}</Space>;
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
                        {<EditOutlined disabled={editingKey !== ''} onClick={() => edit(record)} />}
                        {!record?.hierarchyAttribueId && <DeleteOutlined onClick={() => deleteTableRows(record?.id)} />}
                        {/* {!record?.hierarchyAttribueId && <DeleteOutlined onClick={() => showConfirm(index)} />} */}
                    </Space>
                );
            },
        })
    );

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setRowsData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // on Save table data
    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
        };

        const reqData = {
            data: {
                hierarchyAttributeId: form.getFieldValue('hierarchyAttribueType'),
                hierarchyAttribute: [...data],
                setIsLoading: listShowLoading,
                userId: userId,
                onError: onError,
                onSuccess: onSuccess,
            },
        };

        console.log('DATA ON SAVE', reqData);

        return;

        // saveData({ data: [values ], setIsLoading: listShowLoading, userId, onError, onSuccess });

        // saveData(reqData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleReset = () => {
        console.log('reset called');
        form.resetFields();
    };
    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                            <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table dataSource={data} pagination={false} columns={tableColumn} bordered />
                    </Col>
                </Row>

                <Row gutter={20} style={{ marginTop: '20px' }}>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                        <Button danger onClick={handleAdd}>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Col>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12} className={styles.buttonContainer}>
                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger onClick={handleReset}>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
