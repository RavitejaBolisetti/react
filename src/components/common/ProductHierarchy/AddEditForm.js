import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, Collapse, Table, Empty } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';
import { DataTable } from 'utils/dataTable';
import { TfiReload } from 'react-icons/tfi';
import { FaHistory } from 'react-icons/fa';
import { withDrawer } from 'components/withDrawer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from 'pages/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], changeHistoryVisible },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        isLoading,
        collapsed,
        userId,
        isChangeHistoryVisible: changeHistoryVisible,
        // isVisible: true,
        isDataLoaded,
        productHierarchyData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            // fetchList: productHierarchyDataActions.fetchList,
            // saveData: productHierarchyDataActions.saveData,
            // listShowLoading: productHierarchyDataActions.listShowLoading,
            // changeHistoryModelOpen: productHierarchyDataActions.changeHistoryModelOpen,
            // hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            // hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            // hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
            // onCloseAction: productHierarchyDataActions.changeHistoryVisible,
            // onOpenAction: productHierarchyDataActions.changeHistoryVisible,
        },
        dispatch
    ),
});

const AddEditFormMain = ({ buttonData, handleResetBtn, handleBack, isChecked, setIsChecked, handleAttributeChange, setSelectedTreeKey, setSelectedTreeSelectKey, flatternData, formActionType, fieldNames, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, productHierarchyData }) => {
    const [form] = Form.useForm();
    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.parntProdctId;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
    }

    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }

        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const onFinish = (values) => {
        // const recordId = formData?.id || '';
        // const codeToBeSaved = selectedTreeSelectKey || '';
        // const data = { ...values, id: recordId, active: values?.active ? 'Y' : 'N', parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' };
        // const onSuccess = (res) => {
        //     form.resetFields();
        //     setForceFormReset(Math.random() * 10000);
        //     setReadOnly(true);
        //     setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        //     setFormVisible(true);
        //     if (res?.data) {
        //         handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
        //         fetchList({ setIsLoading: listShowLoading, userId });
        //         formData && setFormData(res?.data);
        //         setSelectedTreeKey([res?.data?.id]);
        //         setFormActionType('view');
        //     }
        // };
        // const onError = (message) => {
        //     handleErrorModal(message);
        // };
        // const requestData = {
        //     data: data,
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };
        // saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        //form.validateFields().then((values) => {});
    };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                            <Select onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Attribute Level')} {...disabledProps} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                            <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('Short Description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('Short Description')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                            <TextArea rows={1} placeholder={preparePlaceholderText('Long Description')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                        <Form.Item initialValue={formData?.active === 'Y' ? 1 : 0} label="Status" name="active">
                            <Switch value={formData?.active === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                        <Button danger onClick={() => handleBack()}>
                            <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                            Cancel
                        </Button>

                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(withDrawer(AddEditFormMain, { title: 'Product Detail' }));
