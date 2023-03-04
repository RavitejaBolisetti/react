import React from 'react';
import { ConfigurableParameterEditing, ConfigurableParameterEditingTable } from 'components/common/ConfigurableParameterEditing';
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
            <ConfigurableParameterEditing />
            {/* <ConfigurableParameterEditingTable /> */}
        </>
    );
};

export const ConfigurableParameterEditingPage = withLayoutMaster(ConfigurableParameterEditingBase);
