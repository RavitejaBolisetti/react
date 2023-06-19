import React from 'react';
import { Descriptions } from 'antd';
import AddEditForm from './AddEditForm';

const ViewIndividualAddressDetailsBase = (props) => {
    const { formData, styles, deleteContactHandeler, isIndividualOrCompany } = props;
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing, setIsEditing, index } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const formProps = {
        setShowAddEditForm,
        setContactData,
        onFinish,
        form,
        ...props,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Address Type">{formData?.addressType}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{formData?.address2}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{formData?.pincode}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.city}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.district}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.state}</Descriptions.Item>
                    <Descriptions.Item label="Contact Name">{formData?.contactpersonName}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{formData?.contactmobilenumber}</Descriptions.Item>
                    <Descriptions.Item>{formData?.defaultaddress}</Descriptions.Item>
                </Descriptions>
            </>

        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
