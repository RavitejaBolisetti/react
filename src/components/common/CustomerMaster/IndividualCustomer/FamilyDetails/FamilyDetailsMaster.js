import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';
import { bindActionCreators } from 'redux';
import { PARAM_MASTER } from 'constants/paramMaster';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
            CustomerMaster:{
                FamilyDetails:{ isLoaded: isFamilyLoaded = false, isLoading: isFamilyLoading, data: familyData = [] }
            }
        },
    } = state;

    console.log(state)

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
        },
        dispatch
    ),
});



const FamilyDetailsBase = (props) => {
    const { userId, isRelationDataLoaded, isRelationLoading, relationData, fetchConfigList, listConfigShowLoading, fetchFamilyDetailsList, listFamilyDetailsShowLoading,isFamilyLoaded,isFamilyLoading, familyData} = props;
    console.log(familyData)
    const [familyForm] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [generateId, setGenerateId] = useState(0);

    const onSuccessAction = (res) => {
        // refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        // setRefershData(false);
        // setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        // resetData();
        // showGlobalNotification({ message });
        // setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isRelationDataLoaded && !isRelationLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: 'FAMLY_RELTN' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRelationDataLoaded]);

    useEffect(() => {
        if (userId &&!isFamilyLoaded ) {
                fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, onSuccessAction, onErrorAction });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFamilyLoaded]);

    // const loadPinCodeDataList = () => {
    //     if (userId && (filterString?.pincode || (filterString?.countryCode && filterString?.stateCode && filterString?.districtCode))) {
    //         setShowDataLoading(true);
    //         fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    //     }
    // };

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSave = () => {
        let values = familyForm.getFieldsValue();

        const upd_obj = familyDetailList?.map((obj) => {
            if (obj?.customerId === values?.customerId) {
                obj.customerName = values?.customerName;
                obj.relationAge = values?.relationAge;
                obj.relationship = values?.relationship;
                obj.remarks = values?.remarks;
            }
            return obj;
        });

        setFamilyDetailsList([...upd_obj]);
        setShowForm(false);
        setEditedMode(false);
    };

    const onFamilyFinish = (values) => {
        setGenerateId(() => generateId + 1);
        setFamilyDetailsList((items) => [...items, { ...values, customerId: generateId }]);
        familyForm.resetFields();
        setShowForm(false);

        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

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
    };

    return <AddEditForm {...formProps} />;
};

export const FamilyDetails = connect(mapStateToProps, mapDispatchToProps)(FamilyDetailsBase);
