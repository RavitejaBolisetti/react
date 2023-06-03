import React, { useState } from 'react';
import { Collapse } from 'antd';

import AuthorityDetailMaster from './AuthorityDetailMaster';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const AuthorityDetailPanel = (props) => {
    const { viewMode, tokenValidate, setTokenValidate, forceUpdate} = props;
    const { selectedTreeData, documentTypesList, setDocumentTypesList, handleFormValueChange } = props;
    const [openAccordian, setOpenAccordian] = useState('');


    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const authorityDetailProps = {
        viewMode,
        selectedTreeData,
        documentTypesList,
        setDocumentTypesList,
        tokenValidate,
        setTokenValidate,
        forceUpdate,
        handleFormValueChange,
    };
    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
            <Panel header={<span className={openAccordian === '1' ? styles.accordianHeader : ''}>Authority Details</span>} key="1">
                <AuthorityDetailMaster {...authorityDetailProps} />
            </Panel>
        </Collapse>
    );
};

export default AuthorityDetailPanel;
