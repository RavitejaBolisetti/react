import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';
import { showGlobalNotification } from 'store/actions/notification';
import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
            CustomerMaster: {
                FamilyDetails: { isLoaded: isFamilyLoaded = false, isLoading: isFamilyLoading, data: familyData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isRelationDataLoaded,
        isRelationLoading,
        isFamilyLoaded,
        isFamilyLoading,
        relationData: relationData && relationData[PARAM_MASTER.FAMLY_RELTN.id],
        familyData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchFamilyDetailsList: familyDetailsDataActions.fetchList,
            listFamilyDetailsShowLoading: familyDetailsDataActions.listShowLoading,
            saveData: familyDetailsDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const FamilyDetailsBase = (props) => {
    const { userId, isRelationDataLoaded, isRelationLoading, relationData, fetchConfigList, listConfigShowLoading, fetchFamilyDetailsList, listFamilyDetailsShowLoading, isFamilyLoaded, familyData, saveData, showGlobalNotification, fetchFamilyDetailSaveList } = props;
    const [familyForm] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);

    useEffect(() => {
        if (userId && !isRelationDataLoaded && !isRelationLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.FAMLY_RELTN.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRelationDataLoaded]);

    useEffect(() => {
        if (userId && !isFamilyLoaded) {
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFamilyLoaded]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
            name: 'customerId',
        },
    ];

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSave = () => {
        let values = familyForm.getFieldsValue();
        console.log(values,'DOB')
        setFamilyDetailsList((items) => [...items, { ...values, dateOfBirth :dayjs(values?.dateOfBirth,'YYYY/MM/DD') }]);
        console.log(familyDetailList,'CONSOLE')
        if (editedMode) {
            const upd_obj = familyDetailList?.map((obj) => {
                if (obj?.editedId === values?.editedId) {
                    obj.customerName = values?.customerName;
                    obj.relationAge = values?.relationAge;
                    obj.relationship = values?.relationship;
                    obj.dateOfBirth = typeof values?.dateOfBirth === 'object' ?  dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth;
                    obj.remarks = values?.remarks;
                }
                return obj;
            });

            setFamilyDetailsList([...upd_obj]);
        }

        setShowForm(false);
        setEditedMode(false);

        familyForm.resetFields();

        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }
    };

    const onFamilyFinish = () => {
        let data = [...familyDetailList]
        //let data = [{ customerId: 'CUS1686811036620', customerName: 'English Boy', dateOfBirth: '2002-12-12', editedId: 9, id: '', mnmCustomer: 'No', relationAge: '8', relationCode: 'C', relationCustomerId: '', remarks: 'Double' }];
        // let editData = [
        //     {
        //         id: '3486c5c7-1e03-42cd-9e91-94444cfe59c9',
        //         mnmCustomer: 'No',
        //         customerId: 'CUS1686811036620',
        //         relationCustomerId: '',
        //         customerName: 'AMan X',
        //         // relationship: 'No Relation',
        //         relationCode: 'BH',
        //         dateOfBirth: '2002-12-12',
        //         relationAge: '20',
        //         remarks: 'ff',
        //         activeIndicator: true,
        //         editedId: 0,
        //     },
        // ];
        const onSuccess = (res) => {
            familyForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listFamilyDetailsShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    useEffect(() => {
        if (familyData?.length > 0) {
            for (let i = 0; i < familyData?.length; i++) {
                setFamilyDetailsList((object) => [...object, { ...familyData[i], editedId: i }]);
            }
        }
        setEditedId(() => familyData?.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familyData]);

    const formProps = {
        familyForm,
        onChange,
        onFamilyFinish,
        onFinishFailed,
        familyDetailList,
        showForm,
        setShowForm,
        customerType,
        onSave,
        editedMode,
        setEditedMode,
        setCustomerType,
        relationData,
        editedId,
        setEditedId,
    };

    return <AddEditForm {...formProps} />;
};

export const FamilyDetails = connect(mapStateToProps, mapDispatchToProps)(FamilyDetailsBase);
