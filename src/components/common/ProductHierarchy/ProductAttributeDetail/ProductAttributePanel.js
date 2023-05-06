import React, { useState } from 'react';
import { Collapse, Divider } from 'antd';

// import AuthorityDetailMaster from './AuthorityDetailMaster';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import ProductAttributeAddEditForm from './ProductAttributeAddEditForm';
import ListProductAttribute from './ListProductAttribute';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const ProductAttributePanel = (props) => {
    const { viewMode, form, skuAttributes } = props;
    const { selectedTreeData, setDocumentTypesList } = props;
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const attributeFormProps = {
        form,
        viewMode,
        selectedTreeData,
        skuAttributes,
        setDocumentTypesList,
    };
    return (
        <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
            <Panel header={<span className={openAccordian === 1 ? styles.accordianHeader : ''}>Product Atrribute Details</span>} key="1">
                <Divider />
                {!viewMode && <ProductAttributeAddEditForm {...attributeFormProps} />}
                <ListProductAttribute {...attributeFormProps} />
            </Panel>
        </Collapse>
    );
};

export default ProductAttributePanel;
