import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaEdit } from 'react-icons/fa';

import { Button, Col, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from '../Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';

import AddUpdateDrawer from './AddUpdateDrawer';
import DataTable from '../../../utils/dataTable/DataTable';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], detailData: detailData = [] },
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
        detailData,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterActions.fetchDetailList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData }) => {
    const [form] = Form.useForm();
    const [rowdata, setRowsData] = useState([]);
    const [editRow, setEditRow] = useState({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [checkfields, setCheckFields] = useState(false);
    const [ForceReset, setForceReset] = useState();
    const [selectedHierarchy, setSelectedHierarchy] = useState('');
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
            forceUpdate(Math.random() * 1000);
        }
        if (detailData?.hierarchyAttribute) {
            forceUpdate(Math.random() * 1000);
            setRowsData(detailData?.hierarchyAttribute);
        }
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        form.resetFields();
        setEditRow({});
    }, [ForceReset]);

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

    const handleAdd = () => {
        setEditRow({});
        setShowDrawer(true);
    };

    const edit = (record) => {
        setEditRow(record);
        setShowDrawer(true);
    };

    const deleteTableRows = (record, index) => {
        const currentRows = form.getFieldsValue();
        const updatedRows = Object.entries(currentRows)
            .map(([key, value]) => key !== 'hierarchyAttribueType' && value)
            .filter((v) => !!v)
            .filter((el) => el?.id !== record?.id);
        setRowsData([...updatedRows]);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            width: '17%',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            width: '17%',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: (record, values) => {
                return <Switch disabled={true} checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '17%',
            render: (record) => {
                return <Switch disabled={true} checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (record) => {
                return <Switch disabled={true} checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (record) => {
                return <Switch disabled={true} checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            sorter: false,
            render: (text, record, index) => {
                return <Space wrap>{<FaEdit onClick={() => edit(record)} />}</Space>;
            },
        })
    );

    const onFinish = (values) => {
        form.validateFields();
        const selectedHierarchyAttribue = selectedHierarchy;

        const onSuccess = (res) => {
            form.resetFields();
            hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchyAttribue });
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
            if (saveclick === true) {
                setShowDrawer(false);
            } else {
                setShowDrawer(true);
            }
            forceUpdate();
        };

        hierarchyAttributeSaveData({ data: [{ ...values, hierarchyAttribueType: selectedHierarchy, hierarchyAttribueId: detailData?.hierarchyAttribueId }], setIsLoading: hierarchyAttributeListShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };
    const handleReset = () => {
        form.resetFields();
    };
    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType });
        setSelectedHierarchy(attributeType);
    };
    const TableProps = {
        isLoading: !isDataAttributeLoaded,
        tableData: detailData?.hierarchyAttribute,
        tableColumn: tableColumn,
    };
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                        <Form.Item labelCol={{ span: 24 }} layout="vertical" name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                            <Select onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    {detailData?.hierarchyAttribueId && (
                        <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                            <Button danger onClick={handleAdd} className={style2.floatRight}>
                                <AiOutlinePlus className={styles.buttonIcon} />
                                Add Attribute
                            </Button>
                        </Col>
                    )}
                </Row>

                {detailData?.hierarchyAttribueId && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                {/* <Table loading={!isDataAttributeLoaded} dataSource={detailData?.hierarchyAttribute} pagination={{ pageSize: 20 }} columns={tableColumn} bordered /> */}
                                <DataTable {...TableProps} />
                            </Col>
                        </Row>
                    </>
                )}
            </Space>
            <AddUpdateDrawer tableData={detailData?.hierarchyAttribute} setsaveclick={setsaveclick} setsaveandnewclick={setsaveandnewclick} selectedHierarchy={selectedHierarchy} onFinishFailed={onFinishFailed} onFinish={onFinish} setCheckFields={setCheckFields} setForceReset={setForceReset} setEditRow={setEditRow} editRow={editRow} showDrawer={showDrawer} setShowDrawer={setShowDrawer} setsaveandnewclick={setsaveandnewclick} saveandnewclick={saveandnewclick} />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
