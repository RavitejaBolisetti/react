import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Col, Form, Row, Select, Space, Input, notification, ConfigProvider, Empty } from 'antd';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { EditIcon, ViewEyeIcon } from 'Icons';

import styles from 'components/common/Common.module.css';

import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
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

    const moduleTitle = 'Hierarchy Attribute Master';

    let returnValue = {
        collapsed,
        userId,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
        detailData,
        moduleTitle,
        isDataLoading,
        isLoadingOnSave,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterDataActions.fetchDetailList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            detailDataListShowLoading: hierarchyAttributeMasterDataActions.detailDataListShowLoading,
            onSaveShowLoading: hierarchyAttributeMasterDataActions.onSaveShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ moduleTitle, userId, isDataLoaded, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData, showGlobalNotification, detailDataListShowLoading, isDataLoading, onSaveShowLoading, isLoadingOnSave }) => {
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
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (userId) {
            if (!isDataLoaded) {
                hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
                forceUpdate(generateRandomNumber());
            }
            if (detailData?.hierarchyAttribute) {
                forceUpdate(generateRandomNumber());
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
        setIsViewModeVisible(false);
        setFormBtnDisable(false);
        setcodeIsReadOnly(true);
        setIsFormVisible(true);
    };

    const onError = (message) => {
        onSaveShowLoading(false);
        showGlobalNotification({ icon: 'error', message: 'Error', description: message, className: styles.error, placement: 'bottomRight' });
    };

    const handleAdd = () => {
        setFormActionType('add');
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setEditRow({
            duplicateAllowedAtAttributerLevelInd: true,
            duplicateAllowedAtOtherParent: true,
            isChildAllowed: true,
            status: true,
        });
        setcodeIsReadOnly(false);
    };
    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };
    const edit = (record, type) => {
        setFormActionType(type);
        setIsFormVisible(true);
        setEditRow(record);
        setFormBtnDisable(false);
        setIsViewModeVisible(false);

        if (type === 'view') {
            setIsReadOnly(true);
            setIsViewModeVisible(true);
        }
        setcodeIsReadOnly(true);
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

    const tableColumn = [
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            width: '6%',
            sorter: false,
            render: (_t, _r, i) => i + 1,
        }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            width: '14%',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
        }),
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '20%',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
        }),
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            width: '10%',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
        }),
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="fa-edit" onClick={() => edit(record, 'edit')}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => edit(record, 'view')}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        }),
    ];

    const onFinish = (values) => {
        form.validateFields();

        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            hierarchyAttributeFetchDetailList({ setIsLoading: detailDataListShowLoading, userId, type: selectedHierarchy });
            setFormBtnDisable(false);
            if (saveclick === true) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'topRight' });
            } else {
                setIsFormVisible(true);
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
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        codeIsReadOnly,
        tableData: detailData?.hierarchyAttribute,
        setsaveclick,
        setsaveandnewclick,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnDisable(false), form.resetFields()),
        titleOverride: (isViewModeVisible ? 'View ' : editRow?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedHierarchy,
        onFinishFailed,
        onFinish,
        setCheckFields,
        setEditRow,
        editRow,
        saveandnewclick,
        formActionType,
        handleEditView,
        isReadOnly,
        setIsReadOnly,
        setFormBtnDisable,
        formBtnDisable,
        isLoadingOnSave,
    };

    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={18} lg={18} xl={18} className={styles.subheading}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.lineHeight33}>
                                                Hierarchy Attribute Type
                                            </Col>
                                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                <Select className={styles.headerSelectField} showSearch onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                                    {attributeData?.map((item) => (
                                                        <Option value={item}>{item}</Option>
                                                    ))}
                                                </Select>
                                                {detailData?.hierarchyAttributeType && <Search placeholder="Search" className={styles.headerSearchField} allowClear onSearch={onSearchHandle} onChange={onChangeHandle} />}
                                            </Col>
                                        </Row>
                                    </Col>

                                    {detailData?.hierarchyAttributeType && (
                                        <Col className={styles.addGroup} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                            <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Attribute
                                            </Button>
                                        </Col>
                                    )}
                                   
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
                                            <span className={styles.descriptionText}>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : !selectedHierarchy ? (
                                            <span className={styles.descriptionText}>Please select hierarchy type to view records.</span>
                                        ) : (
                                            <span className={styles.descriptionText}> No records found.</span>
                                        )
                                    }
                                >
                                    {selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
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
                            <div className={styles.tableProduct}>
                                <DataTable {...tableProps} />
                            </div>
                        </ConfigProvider>
                    </Col>
                </Row>
            </>
            <AddEditForm {...formProps} />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
