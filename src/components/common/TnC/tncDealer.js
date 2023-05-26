import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { tncDocumentTypeDataActions } from 'store/actions/data/termsConditions/tncDocumentType';
import { tncLanguage } from 'store/actions/data/termsConditions/tncLanguage';
import { tncDealerSaveActions } from 'store/actions/data/termsConditions/tncDealerSave';

import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const { termConditionData } = [];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList, isLoading, isLoadingOnSave, isFormDataLoaded },
                DocumentTypeData: { isLoaded: isDocumentTypeDataLoaded = false, data: documentTypeList },
                LanguageData: { isLoaded: islanguageDataLoaded = false, data: languageList },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    console.log('Redux state:', state);

    const moduleTitle = 'Term & Condition';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isDocumentTypeDataLoaded,
        islanguageDataLoaded,
        isLoading,
        productHierarchyList,
        documentTypeList,
        languageList,
        isLoadingOnSave,
        isFormDataLoaded,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: tncProductHierarchyDataActions.fetchList,
            saveProductHierarchyData: tncProductHierarchyDataActions.saveData,
            resetData: tncProductHierarchyDataActions.reset,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchDocumentTypeList: tncDocumentTypeDataActions.fetchList,
            fetchLanguageList: tncLanguage.fetchList,

            saveData: tncDealerSaveActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];
const TncDealer = ({ moduleTitle, saveData, userId, isDataLoaded, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchList, fetchDocumentTypeList, fetchLanguageList, listShowLoading, productHierarchyList, documentTypeList, languageList, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [successAlert, setSuccessAlert] = useState(false);
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (!isDocumentTypeDataLoaded && userId) {
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocumentTypeDataLoaded, userId]);

    useEffect(() => {
        if (!islanguageDataLoaded && userId) {
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [islanguageDataLoaded, userId]);

    // useEffect(() => {
    //     setSearchdata(termConditionData);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [termConditionData]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    // useEffect(() => {
    //     if (isDataLoaded && termConditionData) {
    //         if (filterString) {
    //             const filterDataItem = termConditionData?.filter((item) => filterFunction(filterString)(item?.qualificationCode) || filterFunction(filterString)(item?.qualificationName));
    //             setSearchdata(filterDataItem);
    //         } else {
    //             setSearchdata(termConditionData);
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filterString, isDataLoaded, termConditionData]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productHierarchy',
            width: '17%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentType',
            width: '17%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'language',
            width: '8%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'description',
            width: '40%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '8%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '8%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '8%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'MFG T&C',
            width: '15%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        }),
        tblPrepareColumns({
            title: 'View',
            width: '15%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        }),
    ];

    const tableProps = {
        isLoading: isLoading,
        tableData: searchData,
        tableColumn: tableColumn,
    };

    const onFinish = (values, e) => {
        const recordId = selectedRecord?.id || '';
        const data = { ...values, id: recordId, status: values?.status ? 1 : 0 };
        console.log('values', values);

        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            if (saveclick === true) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        // setTimeout(() => {
        //     fetchList({ setIsLoading: listShowLoading, userId });
        // }, 2000);

        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
            setIsLoading: onSaveShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setIsFormVisible(true);
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);
        setIsViewModeVisible(false);
        setSelectedRecord([]);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
        setcodeIsReadOnly(false);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);

        setFormData(record);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });

        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);

        form.setFieldsValue({
            qualificationCode: selectedRecord.qualificationCode,
            qualificationName: selectedRecord.qualificationName,
            status: selectedRecord.status,
        });
        setsaveclick(true);
        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);
        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });
        setIsFormVisible(true);
        setIsReadOnly(true);
        setcodeIsReadOnly(true);
    };

    const handleReferesh = (e) => {
        setRefershData(!refershData);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        codeIsReadOnly,
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        setIsFormVisible,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnDisable(false), form.resetFields()),
        titleOverride: (isViewModeVisible ? 'View ' : selectedRecord?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedRecord,
        formBtnDisable,
        saveAndSaveNew,
        saveBtn,
        setFormBtnDisable,
        onFinishFailed,
        onFinish,
        form,
        handleAdd,
        data,
        isChecked,
        formData,
        setIsChecked,
        formActionType,
        isReadOnly,
        setFormData,
        setForceFormReset,
        footerEdit,
        handleUpdate2,
        isLoadingOnSave,
        setIsViewModeVisible,
        productHierarchyList,
        documentTypeList,
        languageList,
    };

    return (
        <>
            {contextAlertNotification}
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
                                    !termConditionData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!termConditionData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Child
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
                            <DataTable inputProps={{ 'data-testid': 'tbl-data' }} id="tbl" isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} {...tableProps} onChange={onChange} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const TermConditionDealer = connect(mapStateToProps, mapDispatchToProps)(TncDealer);
