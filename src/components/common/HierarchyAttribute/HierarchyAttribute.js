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

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData }) => {
    console.log('🚀 ~ file: HierarchyAttribute.js:46 ~ HierarchyAttributeBase ~ saveData', hierarchyAttributeSaveData);

    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
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

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(data.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // set count of rows
    const [count, setCount] = useState(1);
    const [data, setRowsData] = useState([
        {
            hierarchyAttribueId: '1q',
            hierarchyAttribueCode: '1234',
            hierarchyAttribueName: 'Dev attribute',
            duplicateAllowedAtAttributerLevelInd: false,
            duplicateAllowedAtDifferentParent: true,
            isChildAllowed: false,
            status: true,
        },
        {
            hierarchyAttribueId: '2q',
            hierarchyAttribueCode: '3445',
            hierarchyAttribueName: 'dummy attribute',
            duplicateAllowedAtAttributerLevelInd: true,
            duplicateAllowedAtDifferentParent: false,
            isChildAllowed: true,
            status: true,
        },
    ]);
    const handleAdd = () => {
        const newData = {
                key: count,
                hierarchyAttribueId: '',
                hierarchyAttribueCode: '',
                hierarchyAttribueName: '',
                duplicateAllowedAtAttributerLevelInd: false,
                duplicateAllowedAtDifferentParent: false,
                isChildAllowed: false,
                status: false,
            };
        setRowsData([...data, newData]);
        setCount(count + 1);
    };

    const deleteTableRows = (index) => {
        const rows = [...data];
        rows.splice(index, 1);
        setRowsData(rows);
    };

// table column
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            render: (text,record, index ) => (
                <Form.Item style={{ paddingTop: '20px' }} key={index} name='hierarchyAttribueCode' rules={[validateRequiredInputField('hierarchyAttribueCode')]}>
                    <Input  placeholder="MT0001" />
                </Form.Item>
            ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            render: (key) => (
                <Form.Item style={{ paddingTop: '20px' }} name='hierarchyAttribueName' rules={[validateRequiredInputField('hierarchyAttribueName')]}>
                    <Input  placeholder="Enter name" />
                </Form.Item>
            ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: () => (
                <Form.Item name="duplicateAllowedAtAttributerLevelInd" initialValue={'Y'}>
                    <Switch value="Y" checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                </Form.Item>
            ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtDifferentParent',
            render: () => (
                <Form.Item name="duplicateAllowedAtOtherParent" initialValue={'Y'}>
                    <Switch value="Y" checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                </Form.Item>
            ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (text, record, index) =>(
                <Form.Item name="isChildAllowed" initialValue={text}>
                    <Switch  checkedChildren="Yes" unCheckedChildren="N0" defaultChecked={text} />
                </Form.Item>
            ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => <Form.Item name="status" initialValue={'Y'}>
            <Switch value={text} checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
        </Form.Item>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            render: (text, record, index) => <Form.Item >
                <Space wrap>
                    <EditOutlined />

                    <DeleteOutlined onClick={showConfirm} />
                </Space>,
        </Form.Item>,
        })
    );




    const [form] = Form.useForm();


    // on Save table data
    const onFinish = (values) => {


        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
        };
        saveData({ data: [values ], setIsLoading: listShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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
                        <Table columns={tableColumn} dataSource={data} pagination={false} />
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

                        <Button danger>
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
