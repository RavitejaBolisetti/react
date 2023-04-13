import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Select, Space, Empty, ConfigProvider } from 'antd';
import { bindActionCreators } from 'redux';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDate } from 'utils/formatDateTime';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { EditIcon, ViewEyeIcon } from 'Icons';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, isLoading, data: configData = [], paramdata: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Configurable Parameter Editing';

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        isLoading,
        moduleTitle,
        configData: configData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: configParamEditActions.fetchList,
            saveData: configParamEditActions.saveData,
            fetchDataList: configParamEditActions.fetchDataList,
            listShowLoading: configParamEditActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditingBase = ({ moduleTitle, fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData }) => {
    const [form] = Form.useForm();
    const defaultParametarType = CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY;

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const [parameterType, setParameterType] = useState(defaultParametarType);

    const loadDependendData = () => {
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM_TYPE.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CTRL_GRP.id });
    };

    useEffect(() => {
        if (userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };
            loadDependendData();

            fetchDataList({ setIsLoading: listShowLoading, onSuccessAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && configData && userId) {
            if (filterString) {
                const filterDataItem = configData?.filter((item) => filterFunction(filterString)(item?.controlId) || filterFunction(filterString)(item?.controlDescription));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(configData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, configData, userId]);

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        const data = configData.find((i) => i.id === record.id);
        if (data) {
            data && setFormData(data);
            setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
        setShowSaveAndAddNewBtn(false);
        setShowSaveBtn(false);
        setFooterEdit(true);
        const data = configData.find((i) => i.id === record.id);
        if (data) {
            data && setFormData(data);
            setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            setIsFormVisible(true);
        }

        setIsReadOnly(true);
    };

    const renderConfigurableParemetarType = (record) => {
        return typeData && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]?.find((item) => item?.key === record?.configurableParameterType)?.value;
    };

    const renderControlGroup = (record) => {
        return typeData && typeData[PARAM_MASTER.CTRL_GRP.id]?.find((item) => item?.key === record?.controlGroup)?.value;
    };

    const renderTableColumnName = (record, key, type) => {
        return typeData && typeData[type]?.find((item) => item?.key === record?.[key])?.value;
    };

    const renderConfigurableParemetarValue = (record) => {
        let fieldType = '';
        switch (record?.configurableParameterType) {
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY:
                fieldType = record?.textValue;
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY:
                fieldType = fieldType.concat(record?.fromNumber).concat(' - ').concat(record?.toNumber);
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY:
                fieldType = fieldType.concat(convertDate(record?.fromDate)).concat('  ').concat(convertDate(record?.toDate));
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY:
                fieldType = record?.booleanValue ? 'Yes' : 'No';
                break;
            default:
                fieldType = undefined;
                break;
        }
        return fieldType;
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Control ID',
            dataIndex: 'controlId',
            render: (text, record, value) => renderTableColumnName(record, 'controlId', PARAM_MASTER.CFG_PARAM.id),
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Control Description',
            dataIndex: 'controlDescription',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Configurable Parameter Type',
            dataIndex: 'configurableParameterType',
            render: (text, record, value) => renderTableColumnName(record, 'configurableParameterType', PARAM_MASTER.CFG_PARAM_TYPE.id),
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Configurable Parameter Values',
            width: '20%',
            render: (text, record, value) => renderConfigurableParemetarValue(record),
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Control Group',
            dataIndex: 'controlGroup',
            render: (text, record, value) => renderTableColumnName(record, 'controlGroup', PARAM_MASTER.CTRL_GRP.id),
            width: '15%',
        }),
        {
            title: 'Action',
            dataIndex: '',
            width: '10%',
            render: (record) => [
                <Space wrap>
                    <Button icon={<EditIcon />} className={styles.tableIcons} onClick={() => handleEditBtn(record)} />
                    {
                        <Button className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                            <ViewEyeIcon />
                        </Button>
                    }
                </Space>,
            ],
        }
    );

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const hanndleEditData = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
    };

    const handleAdd = () => {
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        setFooterEdit(false);
        setIsFormVisible(true);
        setIsReadOnly(false);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        let data = { ...values, id: recordId, isActive: true, fromDate: values?.fromDate?.format('YYYY-MM-DD'), toDate: values?.toDate?.format('YYYY-MM-DD') };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchDataList({ setIsLoading: listShowLoading, userId });
            loadDependendData();

            if (showSaveAndAddNewBtn === true || recordId) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: [data],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };
    const tableProps = {
        tableColumn: tableColumn,
        tableData: searchData,
    };

    const formProps = {
        formActionType,
        setFormActionType,
        isReadOnly,
        formData,
        footerEdit,
        setFooterEdit,
        typeData,
        isVisible: isFormVisible,
        onCloseAction: () => setIsFormVisible(false),
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        configData,
        parameterType,
        setParameterType,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.searchContainer}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={styles.searchBox}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.subheading}>
                                            Configurable Parameter Editing
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>

                            {configData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Group
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    !configData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!configData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Group
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Empty>
                        )}
                    >
                        <DataTable isLoading={isLoading} {...tableProps} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ConfigurableParameterEditing = connect(mapStateToProps, mapDispatchToProps)(ConfigurableParameterEditingBase);
