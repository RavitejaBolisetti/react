import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from '../Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { geoDataActions } from 'store/actions/data/geo';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { EditableCell } from 'utils/EditableCell';
import AddUpdateDrawer from './AddUpdateDrawer';

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
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterActions.fetchDetailList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData }) => {
    const [form] = Form.useForm();
    const [rowdata, setRowsData] = useState([]);
    const [editRow, setEditRow] = useState({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [checkfields, setCheckFields] = useState(false);
    const [ForceReset, setForceReset] = useState();
    const [UpdatedTableData, setUpdatedTableData] = useState([]);
    const [selectedHierarchy, setSelectedHierarchy] = useState('');
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    console.log('outside', detailData?.hierarchyAttribute);
    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
            forceUpdate(Math.random() * 1000);
        }
        if (detailData?.hierarchyAttribute) {
            console.log('Running');
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

    const showConfirm = (record, index) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() {
                console.log('Cancel');
            },
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
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: (record, values) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '17%',
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            render: (text, record, index) => {
                return <Space wrap>{<FaEdit onClick={() => edit(record)} />}</Space>;
            },
        })
    );

    const onFinish = (values) => {
        form.validateFields();
        const selectedHierarchyAttribue = selectedHierarchy;

        const onSuccess = (res) => {
            console.log('This is the Heirarchy:==?>', selectedHierarchyAttribue);

            form.resetFields();
            hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchyAttribue });
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
            if (saveclick === true) {
                setShowDrawer(false);
            }
            else
            {
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
        console.log('Reset form');
        form.resetFields();
    };
    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType });
        setSelectedHierarchy(attributeType);
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item layout="vertical" name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                        <Select onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                {detailData?.hierarchyAttribueId && (
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Button danger onClick={handleAdd} className={style2.floatRight}>
                            <AiOutlinePlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Col>
                )}
            </Row>

            {detailData?.hierarchyAttribueId && (
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Table loading={!isDataAttributeLoaded} dataSource={detailData?.hierarchyAttribute} pagination={false} columns={tableColumn} bordered />
                        </Col>
                    </Row>
                </>
            )}
            <AddUpdateDrawer tableData={detailData?.hierarchyAttribute} setsaveclick={setsaveclick} setsaveandnewclick={setsaveandnewclick} selectedHierarchy={selectedHierarchy} onFinishFailed={onFinishFailed} onFinish={onFinish} setCheckFields={setCheckFields} setForceReset={setForceReset} setEditRow={setEditRow} editRow={editRow} showDrawer={showDrawer} setShowDrawer={setShowDrawer} setsaveandnewclick={setsaveandnewclick} saveandnewclick={saveandnewclick} />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
