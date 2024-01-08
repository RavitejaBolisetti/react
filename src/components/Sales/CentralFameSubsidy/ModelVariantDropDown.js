/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Select } from 'antd';
import { SELECT_BOX_NAME_CONSTANTS } from './fameSubsidryConstants';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

const ModelVariantDropDown = (props) => {
    const { formName, fetchVariantLovList, setFilterString, variantData, isVariantLoading, filterString, BASE_URL_PRODUCT_VARIENT, resetVariant, modelVariantForm, listVariantShowLoading, userId, isModelLoading, modelData } = props;
    const { modelGroupLabel = translateContent('commonModules.label.exchangeDetails.modelGroup'), modelGroupRules = [validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.modelGroup'))] } = props;
    const { variantLabel = translateContent('commonModules.label.exchangeDetails.variant'), variantRules = [validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.variant'))] } = props;
    const { setFilter = true, colSize = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 }, variantStyle = { styles: { marginBottom: '20px' } }, modelStyle = { styles: { marginBottom: '20px' } } } = props;
    const handleModelVariantSelect = (type) => (value) => {
        switch (type) {
            case SELECT_BOX_NAME_CONSTANTS?.MODEL?.key: {
                if (value) {
                    resetVariant();
                    fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: [{ key: 'modelGroupCode', value }] });
                } else {
                    resetVariant();
                    setFilter && setFilterString({ ...filterString, variantCode: undefined, modelGroupCode: undefined });
                }
                formName.resetFields(['variantCode']);
                break;
            }
            case SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key: {
                setFilter && setFilterString({ ...filterString, variantCode: value, modelGroupCode: formName.getFieldValue('modelGroupCode') });
                break;
            }
            default: {
                break;
            }
        }
    };
    return (
        <>
            <Col {...colSize}>
                <Form.Item {...modelStyle} name="modelGroupCode" label={modelGroupLabel} rules={modelGroupRules}>
                    {customSelectBox({ data: modelData, loading: isModelLoading, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.modelGroup')), onChange: (value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.MODEL?.key)(value), fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' } })}
                </Form.Item>
            </Col>
            <Col {...colSize}>
                <Form.Item {...variantStyle} name="variantCode" label={variantLabel} rules={variantRules}>
                    <Select allowClear showSearch placeholder={preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.variant'))} filterOption={(input, option) => (option?.variantCode?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase()) || (option?.variantDescription?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase())} onChange={(value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key)(value)} options={variantData} loading={isVariantLoading} fieldNames={{ label: 'variantDescription', value: 'variantCode' }} />
                </Form.Item>
            </Col>
        </>
    );
};

export default ModelVariantDropDown;
