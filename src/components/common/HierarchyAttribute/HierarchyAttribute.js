import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Col, Form, Row, Select, Space, Input, notification, ConfigProvider, Empty } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';

import styles3 from 'components/common/Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { showGlobalNotification } from 'store/actions/notification';
import AddUpdateDrawer from './AddUpdateDrawer';
import DataTable from '../../../utils/dataTable/DataTable';
import { escapeRegExp } from 'utils/escapeRegExp';

const { Option } = Select;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], detailData = [], isDataLoading, isLoadingOnSave },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
        detailData,
        isDataLoading,
        isLoadingOnSave,
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
            detailDataListShowLoading: hierarchyAttributeMasterActions.detailDataListShowLoading,
            onSaveShowLoading: hierarchyAttributeMasterActions.onSaveShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ userId, isDataLoaded, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData, showGlobalNotification, detailDataListShowLoading, isDataLoading, onSaveShowLoading, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const [rowdata, setRowsData] = useState([]);
    const [editRow, setEditRow] = useState({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [checkfields, setCheckFields] = useState(false);
    const [ForceReset, setForceReset] = useState();
    const [selectedHierarchy, setSelectedHierarchy] = useState('');
    const [saveclick, setsaveclick] = useState();
    const [RefershData, setRefershData] = useState(false);

    const [saveandnewclick, setsaveandnewclick] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState('');

    const [alertNotification, contextAlertNotification] = notification.useNotification();

    useEffect(() => {
        if (userId) {
            if (!isDataLoaded) {
                hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
                forceUpdate(Math.random() * 1000);
            }
            if (detailData?.hierarchyAttribute) {
                forceUpdate(Math.random() * 1000);
                setRowsData(detailData?.hierarchyAttribute);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (userId) {
            if (!selectedHierarchy) {
                setSearchdata([]);
            } else if (RefershData) {
                setRefershData((prev) => !prev);
                hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy });
                setSearchdata(detailData?.hierarchyAttribute);
            } else if (detailData?.hierarchyAttribute) {
                if (filterString) {
                    const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
                    setSearchdata(filterDataItem);
                } else {
                    setSearchdata(detailData?.hierarchyAttribute);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, detailData?.hierarchyAttribute, selectedHierarchy]);

    useEffect(() => {
        form.resetFields();
        setEditRow({});
    }, [ForceReset]);

    useEffect(() => {
        if (!selectedHierarchy || !RefershData) return;
        setRefershData((prev) => !prev);
        hierarchyAttributeFetchDetailList({ setIsLoading: detailDataListShowLoading, userId, type: selectedHierarchy });
        if (filterString) {
            const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
            setSearchdata(filterDataItem);
        } else {
            setSearchdata(detailData?.hierarchyAttribute);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ForceReset, RefershData]);

    const handleEditView = () => {
        setFormActionType('edit');
        setIsReadOnly(false);
        setFormBtnDisable(false);
    };

    const onError = (message) => {
        onSaveShowLoading(false);
        showGlobalNotification({ icon: 'error', message: 'Error', description: message, className: style2.error, placement: 'bottomRight' });
    };

    const handleAdd = () => {
        setFormActionType('add');
        setEditRow({
            duplicateAllowedAtAttributerLevelInd: true,
            duplicateAllowedAtOtherParent: true,
            isChildAllowed: true,
            status: true,
        });
        setShowDrawer(true);
    };
    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };
    const edit = (record, type) => {
        setFormActionType(type);
        setEditRow(record);
        setShowDrawer(true);
        setFormBtnDisable(false);

        if (type === 'view') {
            setIsReadOnly(true);
        }
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };
    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            render: ((_t, _r, i) => i+1 ),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            width: '12%',
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
            render: (text, record) => <>{text ? <div className={style2.activeText}>Active</div> : <div className={style2.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '17%',
            render: (text, record) => <>{text ? <div className={style2.activeText}>Active</div> : <div className={style2.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (text, record) => <>{text ? <div className={style2.activeText}>Active</div> : <div className={style2.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => <>{text ? <div className={style2.activeText}>Active</div> : <div className={style2.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={style2.tableIcons} danger ghost aria-label="fa-edit" onClick={() => edit(record, 'edit')}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={style2.tableIcons} danger ghost aria-label="ai-view" onClick={() => edit(record, 'view')}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        })
    );

    const onFinish = (values) => {
        form.validateFields();

        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            hierarchyAttributeFetchDetailList({ setIsLoading: detailDataListShowLoading, userId, type: selectedHierarchy });
            setFormBtnDisable(false);
            if (saveclick === true) {
                setShowDrawer(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'topRight' });
            } else {
                setShowDrawer(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
            forceUpdate();
        };
        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        hierarchyAttributeSaveData({ data: [{ ...values, id: values?.id || '', hierarchyAttribueType: selectedHierarchy }], setIsLoading: onSaveShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: detailDataListShowLoading, userId, type: attributeType });
        setSelectedHierarchy(attributeType);
    };

    const tableProps = {
        isLoading: isDataLoading,
        tableData: searchData,
        tableColumn: tableColumn,
        // handleTableChange,
        // pagination
    };
    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles3.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20}>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className={style2.subheading}>
                                        Hierarchy Attribute Type
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Select className={style2.attributeSelet} onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                            {attributeData?.map((item) => (
                                                <Option value={item}>{item}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    {detailData?.hierarchyAttributeType && (
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                    marginLeft:"-10px",
                                                    
                                                }}
                                                allowClear
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                    )}
                                    {detailData?.hierarchyAttributeType && (
                                        <Col className={styles3.addGroup} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                            <Button icon={<TfiReload />} className={style2.refreshBtn} onClick={handleReferesh} danger />
                                            <Button icon={<PlusOutlined />} className={style2.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Attribute
                                            </Button>
                                        </Col>
                                    )}
                                    {/* </div> */}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <ConfigProvider
                            renderEmpty={() => (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: '20%',
                                    }}
                                    description={
                                        selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                                            <span className={style2.descriptionText}>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : !selectedHierarchy ? (
                                            <span className={style2.descriptionText}>Please select hierarchy type to view records.</span>
                                        ) : (
                                            <span className={style2.descriptionText}> No records found.</span>
                                        )
                                    }
                                >
                                    {selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Button icon={<PlusOutlined />} className={style2.actionbtn} type="primary" danger onClick={handleAdd}>
                                                    Add Attribute
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                </Empty>
                            )}
                        >
                            <DataTable {...tableProps} />
                        </ConfigProvider>
                    </Col>
                </Row>
            </>
            <AddUpdateDrawer
                tableData={detailData?.hierarchyAttribute}
                setsaveclick={setsaveclick}
                setsaveandnewclick={setsaveandnewclick}
                selectedHierarchy={selectedHierarchy}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                setCheckFields={setCheckFields}
                setForceReset={setForceReset}
                setEditRow={setEditRow}
                editRow={editRow}
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                saveandnewclick={saveandnewclick}
                formActionType={formActionType}
                handleEditView={handleEditView}
                isReadOnly={isReadOnly}
                setIsReadOnly={setIsReadOnly}
                setFormBtnDisable={setFormBtnDisable}
                formBtnDisable={formBtnDisable}
                isLoadingOnSave={isLoadingOnSave}
            />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
