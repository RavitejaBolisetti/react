/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Form, Row, Col, Typography, Button, Card, Divider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlusOutlined } from '@ant-design/icons';

import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';
import { PARAM_MASTER } from 'constants/paramMaster';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { showGlobalNotification } from 'store/actions/notification';
import { addressIndividualDataActions } from 'store/actions/data/customerMaster/individual/address/individualAddress';
import { addressCorporateDataActions } from 'store/actions/data/customerMaster/corporate/address/individualAddress';

import AddEditForm from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import ViewAddressList from './ViewAddressList';
import { CardSkeleton } from 'components/common/Skeleton';

import { NoDataFound } from 'utils/noDataFound';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { withSpinner } from 'components/withSpinner';
const { Text } = Typography;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: addData = [] },
            CustomerMaster: {
                AddressIndividual: { isLoaded: isAddressLoaded = false, isLoading: isAddressLoading, data: addressIndData = [], isLoadingOnSave: isIndividualFormLoading },
                CorporateAddress: { isLoaded: isCompanyAddressLoaded = false, isLoading: isCorporateAddressLoading, data: addressCompanyData = [], isLoadingOnSave: isCorporateFormLoading },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        addressIndData,
        addressCompanyData,
        isAddressLoaded,
        isCompanyAddressLoaded,
        isAddressLoading,
        isCorporateAddressLoading,
        addData: addData && addData[PARAM_MASTER.ADD_TYPE.id],
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData: pincodeData?.pinCodeDetails,

        isLoadingOnSave: isCorporateFormLoading || isIndividualFormLoading,
        isLoading: isAddressLoading || isCorporateAddressLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: addressIndividualDataActions.fetchList,
            saveData: addressIndividualDataActions.saveData,
            resetData: addressIndividualDataActions.reset,
            listShowLoading: addressIndividualDataActions.listShowLoading,
            saveFormIndividualLoading: addressIndividualDataActions.saveFormShowLoading,

            fetchListCorporate: addressCorporateDataActions.fetchList,
            saveDataCorporate: addressCorporateDataActions.saveData,
            saveFormCorporateLoading: addressCorporateDataActions.saveFormShowLoading,
            resetDataCorporate: addressCorporateDataActions.reset,
            listShowLoadingCorporate: addressCorporateDataActions.listShowLoading,

            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
            resetPincodeData: geoPinCodeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AddressMasterBase = (props) => {
    const { form, isViewModeVisible, section, addressIndData, formActionType, addressCompanyData, selectedCustomer, selectedCustomerId, saveData, addData } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, buttonData, setButtonData, defaultBtnVisiblity, setIsFormVisible, pincodeData, userId, fetchList, listShowLoading, showGlobalNotification, handleButtonClick } = props;
    const { isAddressLoading, isCorporateAddressLoading, fetchListCorporate, saveDataCorporate, customerType, resetData, resetPincodeData, resetDataCorporate, NEXT_ACTION } = props;
    const { saveFormIndividualLoading, saveFormCorporateLoading } = props;
    const [addressForm] = Form.useForm();
    const [addressData, setAddressData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const noDataTitle = translateContent('global.generalNotifications.noDataExist.title');

    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add new address using <br /> <strong>“Add”</strong> button at top
        </p>
    );

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer?.customerId,
            name: 'Customer ID',
        },
    ];

    useEffect(() => {
        if (userId) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id && addressIndData?.customerAddress) {
                setAddressData(addressIndData?.customerAddress);
            } else if (addressCompanyData?.customerAddress) {
                setAddressData(addressCompanyData?.customerAddress);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressIndData?.customerAddress, addressCompanyData?.customerAddress]);

    useEffect(() => {
        if (userId && selectedCustomer?.customerId) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchList({ setIsLoading: listShowLoading, userId, extraParams });
            } else if (customerType === CUSTOMER_TYPE?.CORPORATE?.id) {
                fetchListCorporate({ setIsLoading: listShowLoading, userId, extraParams });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomer?.customerId]);

    useEffect(() => {
        return () => {
            resetData();
            resetDataCorporate();
            resetPincodeData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCheckdefaultAddClick = (e, value) => {
        e.stopPropagation();
        setAddressData((prev) => {
            let updetedData = prev?.map((address) => ({ ...address, deafultAddressIndicator: false }));
            const index = updetedData?.findIndex((el) => el?.addressType === value?.addressType && el?.addressLine1 === value?.addressLine1 && el?.pinCode === value?.pinCode);
            updetedData.splice(index, 1, { ...value, deafultAddressIndicator: e.target.checked });
            return [...updetedData];
        });
        setButtonData({ ...buttonData, formBtnActive: true });
        forceUpdate();
    };

    const onFinish = () => {
        let data = {
            customerId: selectedCustomer?.customerId || selectedCustomerId,
            customerAddress: addressData?.map((el) => {
                const { tehsilName, cityName, districtName, stateName, ...rest } = el;
                return { ...rest };
            }),
        };

        const onSuccess = (res) => {
            addressForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
            if (res?.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setButtonData((prev) => ({ ...prev, formBtnActive: false }));
            }
        };

        const onError = (message) => showGlobalNotification({ message });

        const saveFinalData = customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? saveData : saveDataCorporate;
        const saveLoading = customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? saveFormIndividualLoading : saveFormCorporateLoading;
        setIsAdding(false);
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        addressForm.resetFields();

        saveFinalData({
            data,
            method: addressIndData?.customerAddress ? 'put' : 'post',
            setIsLoading: saveLoading,
            userId,
            onError,
            onSuccess,
        });
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        addressForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const addAddressHandeler = (e) => {
        e.stopPropagation();
        addressForm.resetFields();
        setIsAdding(true);
        setShowAddEditForm(true);
    };

    const formProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        formActionType,
        styles,
        addressData,
        setAddressData,
        onFinish,
        onCloseAction,
        onCheckdefaultAddClick,
        form,
        addressForm,
        isEditing,
        setIsEditing,
        setEditingData,
        editingData,
        buttonData,
        setButtonData,
        handleButtonClick,
        forceUpdate,
        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,
        addData,
        handleFormValueChange,
        isAdding,
        setIsAdding,
        showGlobalNotification,
    };

    const myProps = {
        ...props,
    };

    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{translateContent(section?.translateKey)} </h2>
                        <Card className="">
                            {isAddressLoading || isCorporateAddressLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? translateContent('customerMaster.drawerSubHeading.addressTitle') : 'Company Address'}</Text>
                                        {!isViewModeVisible && !formActionType?.viewMode && (
                                            <Button onClick={addAddressHandeler} icon={<PlusOutlined />} type="primary" disabled={isAdding || isEditing}>
                                                {translateContent('global.buttons.add')}
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!addressData?.length && !isAdding ? <NoDataFound information={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewAddressList {...formProps} />}
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <CustomerFormButton {...myProps} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddressMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(AddressMasterBase));
