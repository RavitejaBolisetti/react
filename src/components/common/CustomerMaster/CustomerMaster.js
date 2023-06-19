import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Form, Empty, ConfigProvider, Select } from 'antd';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { showGlobalNotification } from 'store/actions/notification';

import { PlusOutlined } from '@ant-design/icons';

import { tableColumn } from './tableColumn';

import { btnVisiblity } from 'utils/btnVisiblity';
import DataTable from 'utils/dataTable/DataTable';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';

import { AddEditForm } from './AddEditForm';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataLoaded = false, isLoading, data },
        },
    } = state;

    const moduleTitle = 'Customer';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isConfigDataLoaded,
        isConfigLoading,
        typeData: typeData && typeData[PARAM_MASTER.CUST_MST.id],
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchList: customerDetailDataActions.fetchList,
            saveData: customerDetailDataActions.saveData,
            resetData: customerDetailDataActions.reset,
            listShowLoading: customerDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerMasterMain = (props) => {
    const { data, fetchList, userId, isLoading, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isConfigDataLoaded, isConfigLoading, typeData, listConfigShowLoading, fetchConfigList } = props;

    const [form] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);

    const [refershData, setRefershData] = useState(false);

    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const [customerType, setCustomerType] = useState('Individual');

    const extraParams = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
            canRemove: true,
        },
        {
            key: 'searchType',
            title: 'Type',
            value: filterString?.searchType,
            canRemove: true,
        },
        {
            key: 'searchParam',
            title: 'Value',
            value: filterString?.searchParam,
            canRemove: true,
        },
    ];

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (!isConfigDataLoaded && !isConfigLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_MST.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfigDataLoaded, userId]);

    useEffect(() => {
        if (userId && customerType) {
            fetchList({ setIsLoading: listShowLoading, extraParams, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType, userId]);

    useEffect(() => {
        if (refershData && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        setIsFormVisible(true);
    };

    const onFinish = (values, e) => {};

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const tableProps = {
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn(handleButtonClick),
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        setRefershData(!refershData);
        setShowDataLoading(true);
    };

    const handleChange = (selectedvalue) => {
        setFilterString({ searchType: selectedvalue });
    };

    const onChangeHandle = (event) => {
        if (event.target.value === undefined) {
            return false;
        }
        setFilterString({ ...filterString, searchParam: event.target.value });
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        customerType,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.searchAndLabelAlign}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    <Button className={styles.marR5} type={customerType === 'Individual' ? 'primary' : 'link'} danger onClick={() => setCustomerType('Individual')}>
                                        Individual
                                    </Button>
                                    <Button type={customerType === 'Firm' ? 'primary' : 'link'} danger onClick={() => setCustomerType('Firm')}>
                                        Firm/Company
                                    </Button>
                                </div>
                                <div className={styles.selectSearchBg}>
                                    <Select {...selectProps} className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter">
                                        {typeData?.map((item) => (
                                            <Option key={'pnc' + item?.key} value={item?.key}>
                                                {item?.value}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Search placeholder="Search" value={filterString?.searchParam} onChange={onChangeHandle} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.advanceFilterClear}>
                                <Button danger type="primary" icon={<PlusOutlined />}>
                                    Add
                                </Button>
                            </Col>
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
                                description={<span> No record found.</span>}
                            ></Empty>
                        )}
                    >
                        <DataTable isLoading={showDataLoading} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CustomerMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerMasterMain);
