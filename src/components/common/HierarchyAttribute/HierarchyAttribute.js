import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { TfiReload } from 'react-icons/tfi';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';

import { Button, Col, Modal, Form, Row, Select, Space, Switch, Input, notification, ConfigProvider, Empty } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { EditIcon, ViewEyeIcon } from 'Icons';

import styles from '../Common.module.css';
import styles3 from 'pages/common/Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';

import AddUpdateDrawer from './AddUpdateDrawer';
import DataTable from '../../../utils/dataTable/DataTable';

const { Option } = Select;
const { Search } = Input;

const { success: successModel, error: errorModel } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], detailData: detailData = [] },
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

export const HierarchyAttributeBase = ({ userId, isDataLoaded, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData }) => {
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
    const [alertNotification, contextAlertNotification] = notification.useNotification();

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
    useEffect(() => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy });

        setSearchdata(detailData?.hierarchyAttribute);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RefershData]);
    useEffect(() => {
        setSearchdata(detailData?.hierarchyAttribute);
    }, [detailData]);

    const handleEditView = () => {
        setFormActionType('edit');
        setIsReadOnly(false);
        setFormBtnDisable(false);
    };

    const informationModalBox = ({ icon = 'error', message = 'Information', description, className, placement }) => {
        alertNotification.open({
            icon: icon === 'error' ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />,
            message,
            description,
            className,
            placement,
        });
    };

    // const showSuccessModel = ({ title, message }) => {
    //     successModel({
    //         title: title,
    //         icon: <ExclamationCircleFilled />,
    //         content: message,
    //     });
    // };

    const onError = (message) => {
        informationModalBox({ icon: 'error', message: 'Error', description: message, className: style2.error, placement: 'bottomRight' });
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
            form.resetFields();
            hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy });
            // showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
            setFormBtnDisable(false);
            if (saveclick === true) {
                setShowDrawer(false);
                informationModalBox({ icon: 'success', message: res?.responseMessage, className: style2.success, placement: 'topRight' });
            } else {
                setShowDrawer(true);
                informationModalBox({ icon: 'success', message: res?.responseMessage, className: style2.success, placement: 'bottomRight' });
            }
            forceUpdate();
        };
        // const reqData = {
        //     duplicateAllowedAtAttributerLevelInd: true,
        //     duplicateAllowedAtOtherParent: true,
        //     hierarchyAttribueCode: "MUUUI",
        //     hierarchyAttribueId: "Product Hierarchy",
        //     hierarchyAttribueName: "Mo Family",
        //     hierarchyAttribueType: "Product Hierarchy",
        //     isChildAllowed: false,
        //     status: false
        // }

        hierarchyAttributeSaveData({ data: [{ ...values, id: values?.id || '', hierarchyAttribueType: selectedHierarchy }], setIsLoading: hierarchyAttributeListShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType });
        setSelectedHierarchy(attributeType);
    };
    const TableProps = {
        isLoading: !isDataAttributeLoaded,
        tableData: searchData,
        tableColumn: tableColumn,
    };
    return (
        <>
            {contextAlertNotification}
            {/* <Space
                direction="vertical"
                size="middle"
               
            > */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles3.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    {/* <div className={style2.searchAndLabelAlign}> */}
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className={style2.subheading}>
                                        Hierarchy Attribute Type
                                    </Col>
                                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                        <Select className={style2.attributeSelet} onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                            {attributeData?.map((item) => (
                                                <Option value={item}>{item}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    {/* </div> */}
                                </Row>
                            </Col>
                            {detailData?.hierarchyAttributeType && (
                                <Col className={styles3.addGroup} xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Button icon={<TfiReload />} className={style2.refreshBtn} onClick={handleReferesh} danger />
                                    <Button icon={<PlusOutlined />} className={style2.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Attribute
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>

            {/* {detailData?.hierarchyAttributeType && ( */}
            <>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <ConfigProvider
                            renderEmpty={() => (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 140,
                                    }}
                                    description={
                                        !detailData?.length ? (
                                            <span>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : (
                                            <span> No records found.</span>
                                        )
                                    }
                                ></Empty>
                            )}
                        >
                            <DataTable {...TableProps} />
                        </ConfigProvider>
                    </Col>
                </Row>
            </>
            {/* )} */}
            {/* </Space> */}
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
            />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
