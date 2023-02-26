import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table, Empty } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { FaSave, FaUserPlus, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';
import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DrawerUtil from './DrawerUtil';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;
const { Search } = Input;

const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            // console.log('OK');
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
};

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            criticalityGroup: { isLoaded: isDataLoaded = false, data: criticalityGroupData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        criticalityGroupData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchData: criticalityDataActions.fetchList,
            saveData: criticalityDataActions.saveData,
            listShowLoading: criticalityDataActions.listShowLoading,
        },
        dispatch
    ),
});

const initialTableData = [
    {
        Srl: '1',
        criticalityGroupId: 'hsdgd',
        criticalityGroupName: 'gh',
        defaultGroup: 'Y',
        status: false,
    },
];

export const CriticalityGroupMain = ({ editing, dataIndex, title, inputType, record, index, children, form, ...restProps }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setRowsData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);

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
            content: 'Are you sure you want to delete?',
            onOk() {
                deleteTableRows(key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleAdd = () => {
        setForceFormReset(Math.random() * 10000);

        setDrawer(true);
        setFormActionType('add');
        setIsReadOnly(false);
    };

    const handleUpdate = () => {
        setForceFormReset(Math.random() * 10000);

        setDrawer(true);
        setFormActionType('update');
        setIsReadOnly(false);
        formData && setFormData(formData?.data);
    };

    const handleView = () => {
        setForceFormReset(Math.random() * 10000);

        setDrawer(true);
        setFormActionType('view');
        setIsReadOnly(true);
        formData && setFormData(formData?.data);
    };

    const handleReset = () => {
        console.log('reset called');
        form.resetFields();
    };

    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => (+item?.id === +record?.id || +item?.hierarchyAttribueId === +record?.hierarchyAttribueId ? { ...item, readOnly: true } : item));
        setRowsData(updatedDataItem);
    };

    const deleteTableRows = (id) => {
        const updatedData = [...data];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        setRowsData([...updatedData]);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'Srl',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupId',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group?',
            dataIndex: 'defaultGroup',
            render: () => <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: '',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {<FaEdit onClick={handleUpdate} />}
                        {<FaTrashAlt onClick={handleView} />}
                    </Space>
                );
            },
        })
    );

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Search
                        placeholder="Search"
                        style={{
                            width: 200,
                        }}
                    />
                </Col>
                <Col offset={13} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Button danger onClick={handleAdd}>
                        <AiOutlinePlus className={styles.buttonIcon} />
                        Add Group
                    </Button>
                </Col>
            </Row>
            <DrawerUtil open={drawer} setDrawer={setDrawer} isChecked={isChecked} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table locale={{ emptyText: <Empty description="No Criticality Group Added" /> }} dataSource={data} pagination={true} columns={tableColumn} bordered />
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(null, null)(CriticalityGroupMain);
