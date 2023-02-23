import React from 'react';
import { ConfigParamEditMasterPage } from 'components/common/ConfigurableParameterEditing';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const ConfigurableParameterEditingBase = (props) => {
    const pageTitle = 'Configurable Parameter Editing';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ConfigParamEditMasterPage />
        </>
    );
};

export const ConfigurableParameterEditingPage = withLayoutMaster(ConfigurableParameterEditingBase);
