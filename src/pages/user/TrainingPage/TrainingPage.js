import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import CMS from 'assets/images/comingsoon.svg';
import { PageHeader } from 'pages/common/PageHeader';

import styles from 'pages/cms/CMSPage.module.css';
import { withLayoutMaster } from 'components/withLayoutMaster';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const TrainingPageBase = (props) => {
    const pageHeaderData = {
        pageTitle: 'Training/Help',
        showChangeHisoty: true,
        canMarkFavourite: false,
        visibleChangeHistory: false,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <div className={styles.wrapper}>
                <h1>
                    <img src={CMS} alt="Coming Soon" />
                </h1>
                <p>This Page is Under Development</p>
            </div>
        </>
    );
};

export const TrainingPage = connect(mapStateToProps, null)(withLayoutMaster(TrainingPageBase));
