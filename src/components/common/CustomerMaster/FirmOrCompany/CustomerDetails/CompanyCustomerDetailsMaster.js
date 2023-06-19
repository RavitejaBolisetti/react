import React, { useEffect, useState } from 'react';
import { AddEditForm } from './AddEditForm';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';
import { showGlobalNotification } from 'store/actions/notification';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails:{isLoaded: isDataLoaded = false, isLoading,  data: customerDetailsData = []  }
            },
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
        },
    } = state;
    console.log(state,'CSSTATE');

let returnValue = {
    userId,
    isRelationDataLoaded,
    isRelationLoading,

    isDataLoaded,
    isLoading,
    customerDetailsData,
    relationData: relationData && relationData[PARAM_MASTER.CUSTOMER_TYPE.id],
};
return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchList: customerDetailsDataActions.fetchList,
            listShowLoading: customerDetailsDataActions.listShowLoading,
            showGlobalNotification,

        },
        dispatch
    ),
});



const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isDataLoaded, isLoading,isRelationDataLoaded,isRelationLoading, showGlobalNotification,customerDetailsData, relationData,fetchConfigList, listConfigShowLoading, fetchList, listShowLoading } = props;
    const [customerDetailsFrom] = Form.useForm();
    const [customerDetailsList, setCustomerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [generateId, setGenerateId] = useState(0);
    const onSuccessAction = (res) => {
    };
    const selectedId = 'CUS1686916772052';

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            if (!isRelationDataLoaded && !isRelationLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: '' });
            }
        }
        if (userId) {
            if (!isDataLoaded && !isLoading && userId) {

                fetchList({ setIsLoading: listShowLoading, userId,onSuccessAction ,extraParams,onErrorAction});
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSave = () => {
        let values = customerDetailsFrom.getFieldsValue();
    };
    const onCustomerDetailsFinish = (values) => {
        setGenerateId(() => generateId + 1);
        setCustomerDetailsList((items) => [...items, { ...values, customerId: generateId }]);
        customerDetailsFrom.resetFields();
        setShowForm(false);
    };
    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedId,
            name: 'Customer Id',
        },
    ];
    const onFinishFailed = (errorInfo) => {
        return;
    };

    const formProps = {
        customerDetailsFrom,
        onChange,
        onCustomerDetailsFinish,
        onFinishFailed,
        customerDetailsList,
        showForm,
        setShowForm,
        customerType,
        onSave,
        editedMode,
        setEditedMode,
        setCustomerType,
        relationData,
        customerDetailsData,
    };


    return (
        <>
            <h2>Customer Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CompanyCustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyCustomerDetailsMasterBase);
