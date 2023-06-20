import React, { useState, useRef, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, Space, AutoComplete } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateAlphanumericWithSpace, validatePincodeField, validateMobileNoField, validateLettersWithWhitespaces } from 'utils/validation';

import styles from 'components/common/Common.module.css';


let index = 0;

const { Option } = Select;

const AddEditForm = (props) => {
    const { isReadOnly = false, onFinish, form, setAddressData, isEditing, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined } = props;
    const { typeData, forceUpdate, addData } = props;
    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: editMode && formData?.partyCategory === 'Principal' ? true : false };


    const [options, setOptions] = useState(false);
    /*visiblity of drawer   */
    const [isVisible, setIsVisible] = useState(true);



    const [items, setItems] = useState(['Office', 'Residence', 'Permanent', 'Other']);
    const [name, setName] = useState('');

    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const handleOther = (key) => {
        // setIsOther(key === 4);
    };

    const onErrorAction = (res) => {
        // console.log('error');
    };

    const onSuccessAction = () => { };

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);
    useEffect(() => {
        setOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);


    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                state: selectedPinCode?.stateName,
                city: selectedPinCode?.cityName,
                tehsil: selectedPinCode?.tehsilName,
                district: selectedPinCode?.districtName,
            });
            forceUpdate();
        }
    };

    const handleOnSearch = (value) => {
        if (!(typeof options === 'undefined')) {
            return;
        }
        setOptions();
        if (value.length <= 5) {
            form.validateFields(['pinCode']);
        } else if (value.length > 5) {
            const extraParams = [
                {
                    key: 'pincode',
                    value: value,
                },
            ];
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleOnClear = () => {
        setOptions();
        form.setFieldsValue({
            pinCode: undefined,
            state: undefined,
            city: undefined,
            tehsil: undefined,
            district: undefined,
        });
    };



    const handleCancelFormEdit = () => {
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const handleSave = () => {
        const value = form.getFieldsValue();

        if (isEditing) {
            setAddressData((prev) => {
                let formData = [...prev];
                // if (value?.defaultaddress && formData?.length > 1) {
                formData?.forEach((contact) => {
                    if (contact?.defaultaddress === true) {
                        contact.defaultaddress = false;
                    }
                });
                const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType && el?.address === editingData?.address && el?.pincode === editingData?.pincode);
                formData.splice(index, 1, { ...value });
                // setIsEditing(false);

                return [...formData];
                // } else {
                //     return [...prev, { ...value }];
                // }
            });
        } else {
            setAddressData((prev) => {
                let formData = [...prev];
                if (value?.defaultaddress && formData?.length >= 1) {
                    formData?.forEach((contact) => {
                        if (contact?.defaultaddress === true) {
                            contact.defaultaddress = false;
                        }
                    });
                    return [...formData, value];
                } else {
                    return [...prev, { ...value }];
                }
            });
        }
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        form.setFieldsValue();
    }


    // console.log(addData,'VER')

    return (
        <>
            <Form form={form} id="myAdd" onFinish={onFinish} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Type" name="addressType" rules={[validateRequiredSelectField('Address Type')]}>
                            {/* <Select
                                onChange={handleOther}
                                placeholder={preparePlaceholderSelect('address Type')}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space
                                            style={{
                                                padding: '0 8px 4px',
                                            }}
                                        >
                                            <Input placeholder="enter type" ref={inputRef} value={name} onChange={onNameChange} allowClear />
                                        </Space>
                                    </>
                                )}
                                options={addData.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            /> */}
                            <Select placeholder={preparePlaceholderSelect('address type')}>
                                {addData?.map((item) => (
                                    <Option value={item?.key} >{item?.value}</Option>
                                )

                                )}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 1" name="addressLine1" rules={[validateRequiredInputField('address Line 1'), validateAlphanumericWithSpace('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 1')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 2" name="addressLine2">
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 2')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                            <AutoComplete {...disabledProps} maxLength={6} className={styles.searchField} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Input.Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} style={{ width: '100%' }} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.tehsil} label="Tehsil" name="tehsil" >
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="City" initialValue={formData?.city} name="city">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('city')} maxLength={50} />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="District" initialValue={formData?.district} name="district">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('district')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.state} label="State" name="state">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('state')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="contactName" rules={validateLettersWithWhitespaces('mobile number')}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Mobile" name="mobileNumber" rules={validateMobileNoField('mobile number')}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item valuePropName="checked" name="deafultAddressIndicator">
                            <Checkbox>Mark As Default</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Space>
                            <Button onClick={handleSave} key="submit" type="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelFormEdit} ghost type="primary">
                                Cancel
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
           
        </>
    );
};

export default AddEditForm;
