/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Space, Divider, Tag, Typography } from 'antd';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import * as IMAGES from 'assets';

import styles from './Dashboard.module.scss';
import DashboardActionItems from './DashboardActionItems';
import WidgetDrawer from './WidgetDrawer';
import NewsDrawer from './NewsDrawer';
import { StatusBar } from './StatusBar';
import { PieChart } from './PieChart';
import { dateTimeDuration } from 'utils/formatDateTime';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { stockDataActions } from 'store/actions/data/dashboard/stocks';
import { billingDataActions } from 'store/actions/data/dashboard/billing';
import { retailDataActions } from 'store/actions/data/dashboard/retail';
import LatestNews from './LatestNews';
import BirthDayCalender from './BirthDayCalender';

const { Text, Title } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            LeftSideBar: { collapsed = false },
            Header: { data: loginUserData = [] },
        },
        data: {
            Dashboard: {
                Stock: { data: stockData, isLoaded, isLoading },
                Billing: { data: billingData, isLoaded: isBillingDataLoaded, isLoading: isBillingDataLoading },
                Retail: { data: retailData, isLoaded: isRetailDataLoaded, isLoading: isRetailDataLoading },
            },
        },
    } = state;

    return {
        userId,
        collapsed,
        firstName: loginUserData?.firstName || '',
        stockData: stockData?.records || [],
        billingData: billingData?.records || [],
        retailData: retailData?.records || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStockList: stockDataActions.fetchList,
            stockListShowLoading: stockDataActions.listShowLoading,

            fetchBillingList: billingDataActions.fetchList,
            billingListShowLoading: billingDataActions.listShowLoading,

            fetchRetailList: retailDataActions.fetchList,
            retailListShowLoading: retailDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
const keyHightliteData = [
    { shortDescription: 'GST Update', longDescription: "GSTR 1 due date is 10th Oct'23", createdDate: '2023-10-14 12:45:00' },
    { shortDescription: 'GST Update', longDescription: "GSTR 2 due date is 20th Oct'23", createdDate: '2023-10-16 17:45:00' },
];

const detailNews = {
    content:
        'Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV 300 and XUV 400 EV.Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV. Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV 300 and XUV 400 EV.',
};
const newsData = [
    { shortDescription: 'Mahindra & Mahindra sells 36,205 SUVs in July 2023', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand.', date: '5 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Sales in July hits highest mark as per TOI Survey', longDescription: 'Mahindra & Mahindra is popularly known for their rugged luxury.', date: '50 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Scorpio Sales Rise By Over 2-Folds', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand', date: '9 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra & Mahindra sells 36,205 SUVs in July 2023', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand.', date: '5 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Sales in July hits highest mark as per TOI Survey', longDescription: 'Mahindra & Mahindra is popularly known for their rugged luxury.', date: '50 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Scorpio Sales Rise By Over 2-Folds', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand', date: '9 min ago', content: detailNews?.content },
];
const birthDayData = {
    birthDaytoday: [
        { name: 'Shally Gupta', date: '17, Feb 2023 Sunday', image: '' },
        { name: 'Vimal Kumar Bhati', date: '21, July 2023 Friday', image: '' },
        { name: 'Vivek Verma', date: '07, December 2023 Friday', image: '' },
    ],
    upcomingBirthDay: [
        { name: 'Vishal Gaurav', date: '19, November 2023 Sunday', image: '' },
        { name: 'Shally Gupta', date: '17, December 2023 Sunday', image: '' },
        { name: 'Vimal Kumar Bhati', date: '21, July 2023 Friday', image: '' },
    ],
};

const DashboardBase = (props) => {
    const { userId, fetchStockList, stockListShowLoading, stockData, fetchBillingList, billingListShowLoading, fetchRetailList, retailListShowLoading, retailData, billingData } = props;

    const [isVisible, serIsVisible] = useState(false);
    const [isNewsVisible, setIsNewsVisible] = useState(false);
    const [highlightsTextIndex, setHighlightsTextIndex] = useState(0);
    const [record, setRecord] = useState('');

    const onErrorAction = (message) => {
        console.error(message);
    };

    useEffect(() => {
        if (userId) {
            fetchStockList({ setIsLoading: stockListShowLoading, userId, onErrorAction });
            fetchBillingList({ setIsLoading: billingListShowLoading, userId, onErrorAction });
            fetchRetailList({ setIsLoading: retailListShowLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleButtonClick = (direction) => {
        if (direction === 'next') {
            if (keyHightliteData?.length === highlightsTextIndex + 1) {
                setHighlightsTextIndex(0);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) + 1);
            }
        } else {
            if (highlightsTextIndex === 0) {
                setHighlightsTextIndex(keyHightliteData?.length - 1);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) - 1);
            }
        }
    };
    const onCloseAction = () => {
        serIsVisible(false);
        setIsNewsVisible(false);
    };

    const onAddWidget = () => {
        serIsVisible(true);
    };

    const handleNewsClick = (data) => {
        setIsNewsVisible(true);
        setRecord(data);
    };

    const WidgetDrawerProps = {
        isVisible,
        onCloseAction,
        titleOverride: 'Add Widget',
    };

    const newsDrawerProps = {
        isVisible: isNewsVisible,
        onCloseAction,
        titleOverride: 'Latest News',
        handleNewsClick,
        newsData,
        record,
    };
    const birthDayProps = {
        birthDayData,
    };

    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.dashboardPageHeading}>
                                <span className={styles.headingGradient}>Dashboard</span>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.keyHighlightBox}>
                        <Row justify="space-between" align="middle">
                            <Space size={10}>
                                <Title level={5}>Key Highlights</Title>
                                <Divider type="vertical" />
                                {keyHightliteData?.map(
                                    (i, index) =>
                                        index === highlightsTextIndex && (
                                            <Fragment key={'kh' + index}>
                                                <Tag color="error">{i?.shortDescription}</Tag>
                                                <Text color="danger">
                                                    {i?.longDescription}
                                                    <span> {dateTimeDuration(i?.createdDate)}</span>
                                                </Text>
                                            </Fragment>
                                        )
                                )}
                            </Space>
                            <Space size={10}>
                                <Button onClick={() => handleButtonClick('previous')} className={styles.verticallyCentered} icon={<BsChevronLeft size={20} />} type="link"></Button>
                                <Button onClick={() => handleButtonClick('next')} className={styles.verticallyCentered} icon={<BsChevronRight size={20} />} type="link"></Button>
                            </Space>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={30} className={styles.marB20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <div className={styles.dashboardActionItems}>
                        <Title level={5}>Action Items</Title>
                        <DashboardActionItems />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <div className={styles.dashboardBannerImage}>
                        <img src={IMAGES.BANNER_IMG} alt="banner-images" />
                    </div>
                </Col>
            </Row>
            <Row gutter={20} className={`${styles.marB20} ${styles.dashboardKPI}`}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.verticallyCentered}>
                    <Title level={3}>Dashboard KPI</Title>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.buttonsGroupRight}>
                    <Button type="primary" icon={<FiPlus />} className={styles.verticallyCentered} onClick={onAddWidget}>
                        Add Widget
                    </Button>
                </Col>
            </Row>
            <div className={`${styles.marB20} ${styles.dashboardPieChart}`}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Billing'}>
                            <StatusBar data={billingData} />
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Retail'}>
                            <StatusBar data={retailData} />
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Stock in days'}>
                            <PieChart data={stockData} />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Row gutter={40} className={styles.marB20}>
                <LatestNews {...newsDrawerProps} />
                <BirthDayCalender {...birthDayProps} />
            </Row>

            <WidgetDrawer {...WidgetDrawerProps} />
            <NewsDrawer {...newsDrawerProps} />
        </div>
    );
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardBase);
