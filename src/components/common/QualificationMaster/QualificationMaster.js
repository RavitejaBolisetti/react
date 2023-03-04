import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Modal, Empty, Form, Select, Switch, Space, Table } from 'antd';
import { ExclamationCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';

import { menuDataActions } from 'store/actions/data/menu';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from '../QualificationMaster/QualificationMaster.module.css';
import { geoDataActions } from 'store/actions/data/geo';
import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import DrawerUtil from './DrawerUtil';

const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            // Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            QualificationMaster: { isLoaded: isDataLoaded = false, data: qualificationData = [] },
            // HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        qualificationData,
        // isDataAttributeLoaded,
        // attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            // fetchList: geoDataActions.fetchList,
            // setFilter: menuDataActions.setFilter,
            // saveData: geoDataActions.saveData,
            // listShowLoading: geoDataActions.listShowLoading,
            qualificationDataFetchList: qualificationDataActions.fetchList,
            qualificationSaveData: qualificationDataActions.saveData,
            // hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

const initialTableData = [];

export const QualificationMasterMain = ({ qualificationDataFetchList, userId, isDataLoaded, qualificationSaveData, listShowLoading }) => {
    // const [form] = Form.useForm();
    // const [isFavourite, setFavourite] = useState(false);
    // const handleFavouriteClick = () => setFavourite(!isFavourite);
    // const [Data, setRowsData] = useState();
    // const [drawer, setDrawer] = useState(false);
    // const [searchInput, setSearchInput] = useState('');
    const [form] = Form.useForm();
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [arrData, setArrData] = useState(data);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded) {
            qualificationDataFetchList({ userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

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

    const edit = (record) => {
        const updatedDataItem = arrData && arrData.map((item) => (+item?.id === +record?.id || +item?.hierarchyAttribueId === +record?.hierarchyAttribueId ? { ...item, readOnly: true } : item));
        setArrData(updatedDataItem);
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualificattion Code',
            dataIndex: 'code',
            sortFn: (a, b) => a.code.localeCompare(b.code),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'name',
            sortFn: (a, b) => a.name.localeCompare(b.name),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="Active" unCheckedChildren="Inactive" />,
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            render: (record) => {
                return (
                    <Space wrap>
                        <FiEdit2 style={{ color: 'ff3e5b', cursor: 'pointer' }} onClick={() => edit(record)} />
                    </Space>
                );
            },
        })
    );

    const onFinish = (values) => {
        console.log('ohhho');
        const recordId = formData?.id || '';
        const data = { ...values, status: values?.status ? 'Y' : 'N',createdBy: "ME",createdDate: '2023-03-04T18:49:00.937Z' };

        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(Math.random() * 10000);
            // setFormVisible(true);
            setDrawer(false);

            if (res?.data) {
                handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                qualificationDataFetchList({ userId });
                formData && setFormData(res?.data);

                // setFormActionType('view');
            }
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: data,
            // setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        console.log(requestData,'requestData')
        qualificationSaveData(requestData);

        // setData([...data, values]);
        // { values, id: recordId, defaultGroup: values?.defaultGroup ? 'Y' : 'N', Status: values?.Status ? 'Y' : 'N' }
        // setFormData(data);

        console.log('the real data', data);
        console.log(formData, 'formData');
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setForceFormReset(Math.random() * 10000);
        setFormData([]);
        console.log(data, 'datat');
        setDrawer(true);
        setFormActionType('add');
        setIsReadOnly(false);
        form.resetFields();
        forceUpdate();
    };

    const handleUpdate = (record) => {
        setForceFormReset(Math.random() * 10000);
        setFormData(record);
        console.log(formData, 'formData');
        setDrawer(true);
        setFormActionType('update');
        setIsReadOnly(false);
        forceUpdate();

        // formData && setFormData(formData?.data);
    };
    const onChange = (sorter, filters) => {
        console.log('sort', sorter, filters);
        form.resetFields();
    };
    const deleteTableRows = (id) => {
        const updatedData = [...arrData];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        setArrData([...updatedData]);
    };
    const onChangeHandle = (e) => {
        const getSearch = e.target.value;
        // console.log("value:", e.target.value);
        if (e.target.value == '') {
            window.location.reload(true);
            const tempArr = arrData;
            setArrData(tempArr);
            return;
        }
        if (getSearch.length > -1) {
            const searchResult = arrData.filter((record) => record.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.code.toLowerCase().startsWith(e.target.value.toLowerCase()));
            setArrData(searchResult);
        }
    };

    // const handleResetBtn = () => {
    //     setForceFormReset(Math.random() * 10000);
    //     form.resetFields();
    // };

    const handleResetBtn = () => {
        form.resetFields();
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Search
                        placeholder="Search"
                        allowClear
                        style={{
                            width: 200,
                        }}
                        onSearch={() => console.log('search')}
                        onChange={onChangeHandle}
                    />
                </Col>
                <Col offset={12} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Button danger onClick={handleAdd}>
                        <AiOutlinePlus className={styles.buttonIcon} />
                        Add Qualification
                    </Button>
                </Col>
            </Row>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <DrawerUtil handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} drawerTitle={drawerTitle} />
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        locale={{
                            emptyText: <Empty description="No Role Added" />,
                        }}
                        dataSource={data}
                        pagination={false}
                        columns={tableColumn}
                        bordered
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </>
    );
};

export const QualificationMaster = connect(mapStateToProps, mapDispatchToProps)(QualificationMasterMain);
