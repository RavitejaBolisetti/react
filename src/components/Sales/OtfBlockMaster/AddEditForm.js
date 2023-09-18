/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Button, Switch, AutoComplete } from 'antd';
import { connect } from 'react-redux';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { ManufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy';
import { showGlobalNotification } from 'store/actions/notification';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import TreeSelectField from '../../common/TreeSelectField';
import { bindActionCreators } from 'redux';
import { debounce } from 'utils/debounce';

import { withDrawer } from 'components/withDrawer';

//import styles from 'components/common/Common.module.css';
import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdmin: {
                ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, isLoading: ManufacturerAdminHierarchyLoading, data: manufacturerAdminHierarchyData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        manufacturerAdminHierarchyData,
        ManufacturerAdminHierarchyLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: ManufacturerAdminHierarchyDataActions.fetchList,
            listShowLoading: ManufacturerAdminHierarchyDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
const AddEditFormMain = (props) => {
    const { onCloseAction, setSearchDealerValue, formData, selectedProductName, userId, options, setOptions, fetchList, organizationId, makeExtraparms, listShowLoading, manufacturerAdminHierarchyData, selectedTreeKey, dealerDataList, onErrorAction, selectedTreeSelectKey, selectedOrganizationCode, handleSelectTreeClick, flatternData, formActionType, EDIT_ACTION, VIEW_ACTION } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed, form } = props;
    const organizationFieldNames = { title: 'manufactureAdminShortName', key: 'id', children: 'subManufactureAdmin' };
    const treeFieldNames = { ...organizationFieldNames, label: organizationFieldNames.title, value: organizationFieldNames.key };
    useEffect(() => {
        if (dealerDataList) {

            const data = dealerDataList ? Object.values(dealerDataList) : undefined;
            const dealerOption = {
                label: data?.[0]?.dealerCode,
                value: data?.[0]?.dealerCode,
                key: data?.[0]?.dealerCode,
            };
            setOptions([dealerOption]);
        } else {
            setOptions([]);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerDataList]);

    useEffect(() => {
        if (organizationId && userId) {
            if (!organizationId) return;

            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraparms([{ key: 'manufacturerOrgId', title: 'manufacturerOrgId', value: selectedOrganizationCode, name: 'manufacturerOrgId' }]), errorAction: onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        form.setFieldsValue({ hierarchyMstId: formData?.hierarchyMstName })
    }, [formData])

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    const onSearchDealer = debounce(function (text) {
        setSearchDealerValue(text?.trim());

    }, 300);

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === EDIT_ACTION || formActionType === VIEW_ACTION) {
        treeCodeId = formData?.parntProdctId;
    } 

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerAdminHierarchyData,
        treeDisabled: treeCodeReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    const handleOnSelect = (key) => {
        setOptions();
    };
    const handleOnClear = (value) => {
        setOptions();
    };


    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={selectedProductName} label="Product Hierarchy" name="modelGroupCode" rules={[validateRequiredSelectField('Product Hierarchy')]}>
                                    <Input placeholder={preparePlaceholderText('Product Hierarchy')} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.hierarchyMstName} label="Manufacturer Administrative Hierarchy" name="hierarchyMstId" rules={[validateRequiredSelectField('Manufacturer Administrative Hierarchy')]}>
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.dealerCode} label="Dealer Code" name="dealerCode" rules={[validateRequiredInputField('Dealer Code')]}>
                                    <AutoComplete options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search onSearch={onSearchDealer} onChange={handleOnClear} placeholder={preparePlaceholderAutoComplete(' / Search Dealer Name')} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={0} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.status} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooterNew}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button htmlType="submit" type="primary" disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
