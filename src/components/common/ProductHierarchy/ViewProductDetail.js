/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import CardProductAttribute from './ProductAttribute/CardProductAttribute';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;

export const ViewProductDetailMain = ({ typeData, setSKUAttributes, viewTitle, selectedTreeData, styles, setDisabledEdit, viewData }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    useEffect(() => {
        if (selectedTreeData?.skuAttributes?.length > 0) {
            setSKUAttributes(() => []);
            setSKUAttributes(() => [...selectedTreeData?.skuAttributes]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeData]);

    return (
        <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
            <Descriptions {...viewOneColProps}>
                <Descriptions.Item label="Attribute Level"> {checkAndSetDefaultValue(getCodeValue(typeData?.PRD_HIER, viewData?.attributeType), false)}</Descriptions.Item>
                <Descriptions.Item label="Parent">{viewData?.parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{viewData?.prodctCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{viewData?.prodctShrtName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{viewData?.prodctLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{viewData?.active === true || viewData?.active === null ? 'Active' : 'InActive'}</Descriptions.Item>
                <div>
                    {viewData?.skuAttributes?.length > 0 && (
                        <Collapse expandIcon={expandIcon} collapsible="icon">
                            <Panel header="Product SKU" key="2">
                                <Divider />
                                {viewData?.skuAttributes?.map((item) => (
                                    <CardProductAttribute key={'sku' + item?.code} code={item?.code} value={item?.value} id={item?.id} setDisabledEdit={setDisabledEdit} />
                                ))}
                            </Panel>
                        </Collapse>
                    )}
                </div>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
