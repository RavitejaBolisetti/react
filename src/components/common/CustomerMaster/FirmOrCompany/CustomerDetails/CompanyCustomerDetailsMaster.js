import React, { useEffect, useState } from 'react';
import { AddEditForm } from './AddEditForm';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails:{isLoaded: isCustomerDetailsDataLoaded = false, isCustomerDetailsLoading, data = [] }
            },
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
        },
    } = state;
    console.log(state,'CSSTATE');

let returnValue = {
    userId,
    isRelationDataLoaded,
    isRelationLoading,

    isCustomerDetailsDataLoaded,
    isCustomerDetailsLoading,
    data,
    relationData: relationData && relationData[PARAM_MASTER.FAMLY_RELTN.id],
};
return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchCustomerDetailsList: customerDetailsDataActions.fetchList,
            listCustomerDetailsShowLoading: customerDetailsDataActions.listShowLoading,
        },
        dispatch
    ),
});



const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isCustomerDetailsDataLoaded, isCustomerDetailsLoading,isRelationDataLoaded,isRelationLoading, data, relationData,fetchConfigList, listConfigShowLoading, fetchCustomerDetailsList, listCustomerDetailsShowLoading } = props;
    const [customerDetailsFrom] = Form.useForm();
    const [customerDetailsList, setCustomerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [generateId, setGenerateId] = useState(0);

    useEffect(() => {
        if (userId) {
            if (!isRelationDataLoaded && !isRelationLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: 'FAMLY_RELTN' });
            }
        }
        if (userId) {
            if (!isCustomerDetailsDataLoaded && !isCustomerDetailsLoading) {
                fetchCustomerDetailsList({ setIsLoading: listCustomerDetailsShowLoading, userId });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCustomerDetailsDataLoaded]);

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
        data,
    };


    return (
        <>
            <h2>Customer Details</h2>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CompanyCustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyCustomerDetailsMasterBase);
