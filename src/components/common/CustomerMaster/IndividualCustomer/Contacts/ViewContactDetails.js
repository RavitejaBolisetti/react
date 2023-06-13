import React from 'react';
import { Descriptions, Button, Space } from 'antd';
import AddEditForm from './AddEditForm';

const ViewDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setContactData, onFinish, form, isEditing, setIsEditing, index } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const editContactHandeler = (data) => {
        setIsEditing(true);
        form.setFieldsValue(data);
    };

    const formProps = {
        setShowAddEditForm,
        setContactData,
        onFinish,
        form,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            {!isEditing ? (
                <>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Purpose of Contact">{formData?.purposeOfContact}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{formData?.contactMobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Mobile Numbe">{formData?.alternativeMobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Relation">{formData?.relationwithCustomer}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{formData?.gender}</Descriptions.Item>
                        <Descriptions.Item label="Title">{formData?.contactNameTitle}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{formData?.contactNameFirstName}</Descriptions.Item>
                        <Descriptions.Item label="Middle Name">{formData?.contactNameMiddleName}</Descriptions.Item>
                        <Descriptions.Item label="Last/Surname">{formData?.contactNameLastName}</Descriptions.Item>
                        <Descriptions.Item label="E-mail">{formData?.contactEmail}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Email ID">{formData?.alternativeEmail}</Descriptions.Item>

                        <Descriptions.Item label="Facebook Link">{formData?.facebook}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{formData?.twitter}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{formData?.instagram}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{formData?.youtube}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{formData?.teamBhp}</Descriptions.Item>
                        <Descriptions.Item label="Mark As Default">{formData?.defaultaddress ? 'Yes' : 'No'}</Descriptions.Item>
                    </Descriptions>

                    <Space>
                        <Button type="primary" onClick={() => editContactHandeler({ formData, index })}>
                            Edit
                        </Button>
                        <Button>Delete</Button>
                    </Space>
                </>
            ) : (
                <AddEditForm {...formProps} />
            )}
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
