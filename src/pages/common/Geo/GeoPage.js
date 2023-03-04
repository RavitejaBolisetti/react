import React ,{useState} from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { Geo } from 'components/common/Geo';

export const GeoPageBase = (props) => {
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };
    const pageTitle = 'Geographical Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible
    };
    
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <Geo isChangeHistoryVisible={isChangeHistoryVisible}/>
        </>
    );
};

export const GeoPage = withLayoutMaster(GeoPageBase);
