/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Divider } from 'antd';

import AuthorityDetailMaster from './AuthorityDetailMaster';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
const { Panel } = Collapse;

const AuthorityDetailPanel = (props) => {
    const { viewMode, tokenValidate, setTokenValidate, forceUpdate } = props;
    const { selectedTreeData, documentTypesList, setDocumentTypesList, handleFormValueChange, authTypeDropdownData } = props;
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
        authTypeDropdownData,
    };
    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordian} collapsible="icon">
            <Panel header="Authority Details" key="1">
                <Divider />
                <AuthorityDetailMaster {...authorityDetailProps} />
            </Panel>
        </Collapse>
    );
};

export default AuthorityDetailPanel;
