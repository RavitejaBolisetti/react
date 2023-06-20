import React, { useEffect, useMemo, useState } from 'react';
import { AddEditForm } from './AddEditForm';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';
import { showGlobalNotification } from 'store/actions/notification';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails:{isLoaded: isDataLoaded = false, isLoading,  data: customerDetailsData = []  }
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, paramdata: typeData = [] },
        },
    } = state;
    const moduleTitle = 'Customer Details';

let returnValue = {
    userId,
    isTypeDataLoaded,
    isTypeDataLoading,
    moduleTitle,

    isDataLoaded,
    isLoading,
    customerDetailsData,
    typeData: typeData,
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
            saveData:customerDetailsDataActions.saveData,
            resetData:customerDetailsDataActions.reset,
            showGlobalNotification,

        },
        dispatch
    ),
});



const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isDataLoaded, isLoading, isTypeDataLoaded, isTypeDataLoading, showGlobalNotification, customerDetailsData, relationData, fetchConfigList, listConfigShowLoading, fetchList, form, listShowLoading,moduleTitle, typeData,saveData } = props;
    const [customerDetailsForm] = Form.useForm();
    const [customerDetailsList, setCustomerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [generateId, setGenerateId] = useState(0);
    const [configurableTypedata,setConfigurableTypedata]=useState({})
    const [formData, setFormData] = useState();
    const [refershData, setRefershData] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [showDataLoading, setShowDataLoading] = useState(true);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const selectedId = 'CUS1686916772052';

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            if (!isTypeDataLoaded && !isTypeDataLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_CATE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.MEM_TYPE.id });
            }
            if (!isDataLoaded && !isLoading && !formActionType?.addMode) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);
    useEffect(() => {
        if (typeData) {
            setConfigurableTypedata({ CUST_TYPE: typeData['CUST_TYPE'], CORP_TYPE: typeData['CORP_TYPE'], CORP_CATE: typeData['CORP_CATE'], TITLE: typeData['TITLE'], MEM_TYPE: typeData['MEM_TYPE'] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);

    const onChange = (value) => {
        setCustomerType(value);
    };
    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        const data = { ...values, customerId: 'CUS1686815155017' };

        console.log( 'Aman',customerDetailsForm.getFieldsValue());

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        console.log(requestData, 'Aman');
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
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
            return 'Add ';
        }
    }, [formActionType]);



    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedId,
            name: 'Customer Id',
        },
    ];
 
    const formProps = {
        form:customerDetailsForm,
        onChange,
        buttonData,
        onFinish,
        onCloseAction,
        onFinishFailed,
        customerDetailsList,
        titleOverride: drawerTitle.concat(moduleTitle),
        saveData,
        showForm,
        setShowForm,
        customerType,
        editedMode,
        setEditedMode,
        setCustomerType,
        formActionType,
        typeData,
        customerDetailsData,
        configurableTypedata,
        handleButtonClick,
    };

    return <AddEditForm {...formProps} />;
};
export const CompanyCustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyCustomerDetailsMasterBase);
