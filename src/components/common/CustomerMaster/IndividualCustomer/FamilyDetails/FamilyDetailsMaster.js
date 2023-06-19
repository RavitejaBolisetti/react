import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';

import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';
import { familyDetailSaveDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetailSave';
import { showGlobalNotification } from 'store/actions/notification';

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

//

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchFamilyDetailsList: familyDetailsDataActions.fetchList,
            listFamilyDetailsShowLoading: familyDetailsDataActions.listShowLoading,

            fetchFamilyDetailSaveList: familyDetailSaveDataActions.fetchList,
            listFamilyDetailSaveShowLoading: familyDetailSaveDataActions.listShowLoading,
            saveData: familyDetailSaveDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const FamilyDetailsBase = (props) => {
    const { userId, isRelationDataLoaded, isRelationLoading, relationData, fetchConfigList, listConfigShowLoading, fetchFamilyDetailsList, listFamilyDetailsShowLoading, isFamilyLoaded, familyData, saveData, showGlobalNotification, fetchFamilyDetailSaveList, listFamilyDetailSaveShowLoading } = props;
    const [familyForm] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);

    useEffect(() => {
        if (userId && !isRelationDataLoaded && !isRelationLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: 'FAMLY_RELTN' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRelationDataLoaded]);

    useEffect(() => {
        if (userId && !isFamilyLoaded) {
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFamilyLoaded]);

    // const extraParams = [
    //     {
    //         key: 'countryCode',
    //         title: 'Country',
    //         value: filterString?.countryCode,
    //         name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
    //         canRemove: false,
    //     },
    //     {
    //         key: 'stateCode',
    //         title: 'State',
    //         value: filterString?.stateCode,
    //         name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
    //         canRemove: false,
    //     },
    //     {
    //         key: 'districtCode',
    //         title: 'District',
    //         value: filterString?.districtCode,
    //         name: filteredDistrictData?.find((i) => i?.key === filterString?.districtCode)?.value,
    //         canRemove: false,
    //     },
    //     {
    //         key: 'tehsilCode',
    //         title: 'Tehsil',
    //         value: filterString?.tehsilCode,
    //         name: filteredTehsilData?.find((i) => i?.key === filterString?.tehsilCode)?.value,
    //         canRemove: false,
    //     },
    //     {
    //         key: 'cityCode',
    //         title: 'City',
    //         value: filterString?.cityCode,
    //         name: filteredCityData?.find((i) => i?.key === filterString?.cityCode)?.value,
    //         canRemove: false,
    //     },
    //     {
    //         key: 'pincode',
    //         title: 'Pincode',
    //         value: filterString?.pincode,
    //         name: filterString?.pincode,
    //         canRemove: true,
    //     },
    // ];

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSave = (props) => {
        let values = familyForm.getFieldsValue();
        setFamilyDetailsList((items) => [...items, { ...values }]);

        if (editedMode) {
            const upd_obj = familyDetailList?.map((obj) => {
                if (obj?.editedId === values?.editedId) {
                    obj.customerName = values?.customerName;
                    obj.relationAge = values?.relationAge;
                    obj.relationship = values?.relationship;
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
        // let data = [...familyDetailList]
        let data = [{ customerId: 'CUS1686811036620', customerName: 'English Boy', dateOfBirth: '2002-12-12', editedId: 9, id: '', mnmCustomer: 'No', relationAge: '8', relationCode: 'C', relationCustomerId: '', remarks: 'Double' }];
        let editData = [
            {
                id: 'b528ea89-6431-4d26-a9c4-355975068f94',
                mnmCustomer: 'No',
                customerId: 'CUS1686811036620',
                relationCustomerId: null,
                customerName: 'CCCCC',
                // relationship: 'No Relation',
                relationCode: 'BH',
                dateOfBirth: '2002-12-12',
                relationAge: '20',
                remarks: 'ff',
                activeIndicator: true,
                editedId: 0,
            },
        ];
        const onSuccess = (res) => {
            familyForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchFamilyDetailSaveList({ setIsLoading: listFamilyDetailSaveShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: editData,
            method: 'post',
            setIsLoading: listFamilyDetailSaveShowLoading,
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
