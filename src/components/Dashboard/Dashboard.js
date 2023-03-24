import React, { useState } from 'react';
import { connect } from 'react-redux';
import imdimg from 'assets/img/img_md.png';
import { Carousel, Card, Button, Row, Col, Input } from 'antd';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiFileShield2Line } from 'react-icons/ri';
import { FaChartPie, FaChartArea, FaClock, FaNewspaper, FaChalkboard, FaBirthdayCake } from 'react-icons/fa';
import { convertDateTime } from 'utils/formatDateTime';
import styles from './Dashboard.module.css';
import moment from 'moment';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
            Header: { data: loginUserData = [] },
        },
    } = state;

    return {
        collapsed,
        firstName: loginUserData?.firstName || '',
    };
};

const DashboardBase = ({ props }) => {
    const onSearch = (value) => console.log(value);
    const firstName = '';

    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                            <div>
                                <span className={styles.headingGradient}>Welcome back {firstName}! </span>
                            </div>
                        </Col>
                        {/* <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.floatRight}>
                            <Search allowClear placeholder="Enter Doc ID..." onSearch={onSearch} />
                        </Col> */}
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <AiFillDashboard /> Dashboard
                            </>
                        }
                        className={styles.mb10}
                    >
                        <div className={styles.dashboardGraph}>
                            <div className={styles.dashboardGraphBox}>
                                <div className={styles.graphBoxfirstSec}>
                                    <BsFillBarChartFill />
                                </div>
                                <div className={styles.graphBoxSecoundSec}>
                                    <FaChartPie />
                                </div>
                                <div className={styles.graphBoxthirdSec}>
                                    <BiLineChart />
                                </div>
                                <div className={styles.graphBoxforthSec}>
                                    <FaChartArea />
                                </div>
                            </div>

                            <div className={styles.buttonHolder}>
                                <Button className="btn btn-outline centerbtn boxShdwNon mrl15" danger>
                                    View Dashboard
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaClock /> Action Items
                            </>
                        }
                        className={styles.mb10}
                    >
                        <div className={styles.directChatMessages}>
                            <div className={styles.scrollbar}>
                                <div className="force-overflow">
                                    <ul className={styles.dashboardList}>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Pending POs to be released <span className={`${styles.badge} ${styles.badgedanger}`}>12</span>
                                        </li>
                                        <li>
                                            Vehicles to be delivered <span className={`${styles.badge} ${styles.badgedanger}`}>10</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaNewspaper /> News
                            </>
                        }
                        className={styles.mb10}
                    >
                        <Carousel autoplay>
                            <div className={styles.newsCarsulalContaner}>
                                <div className={styles.dashboardboxContHeight}>
                                    <h4>Anand Mahindra Highlights Car Price Hikes Over 50 Years Ago</h4>
                                    <div className="textContaner">Anand Mahindra continues to amuse the netizens with his posts. This time he has highlighted car price hikes from 50 years ago. </div>
                                </div>
                                <div className={styles.buttonHolder}>
                                    <Button danger className="btn btn-outline centerbtn boxShdwNon mrl15">
                                        View Dashboard
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.newsCarsulalContaner}>
                                <div className={styles.dashboardboxContHeight}>
                                    <h4>What to expect from Mahindra's Born Electric concept SUVs</h4>
                                    <div className="textContaner">Homegrown SUV specialist Mahindra revealed five concept electric SUVs at the brand's European design studio in August last year. </div>
                                </div>
                                <div className={styles.buttonHolder}>
                                    <Button danger className="btn btn-outline centerbtn boxShdwNon mrl15">
                                        View Dashboard
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.newsCarsulalContaner}>
                                <div className={styles.dashboardboxContHeight}>
                                    <h4>Mahindra SUV sales up 66% </h4>
                                    <div className="textContaner">Mahindra SUV sales up 66% in Jan 2023: Scorpio-N, Thar, XUV700 drive growthMahindra & Mahindra Ltd today announced that its overall auto sales for the month of January 2023 stood at 64,335 vehicles.</div>
                                </div>
                                <div className={styles.buttonHolder}>
                                    <Button danger className="btn btn-outline centerbtn boxShdwNon mrl15">
                                        View Dashboard
                                    </Button>
                                </div>
                            </div>
                        </Carousel>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaChalkboard /> Upcoming Trainings
                            </>
                        }
                        className={styles.mb10}
                    >
                        <div style={{ height: '270px' }}>
                            <div className="direct-chat-messages"></div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                {' '}
                                <FaBirthdayCake /> Birthday Calendar
                            </>
                        }
                        className={styles.mb10}
                    >
                        <Carousel autoplay>
                            <div className={styles.birthContaner}>
                                <div className="row ">
                                    <div className={styles.birthdayImgcontaner}>
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className={styles.birthdayTxtcontaner}>
                                        <div className={styles.birthdayName}>First Name, Last Name</div>
                                        <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.birthContaner}>
                                <div className="row ">
                                    <div className={styles.birthdayImgcontaner}>
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className={styles.birthdayTxtcontaner}>
                                        <div className={styles.birthdayName}>First Name, Last Name</div>
                                        <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.birthContaner}>
                                <div className="row ">
                                    <div className={styles.birthdayImgcontaner}>
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className={styles.birthdayTxtcontaner}>
                                        <div className={styles.birthdayName}>First Name, Last Name</div>
                                        <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <RiFileShield2Line /> Knowledge Center
                            </>
                        }
                        className={styles.mb10}
                    >
                        <div className="card-body" style={{ height: '270px' }}>
                            <div className="direct-chat-messages"></div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export const Dashboard = connect(mapStateToProps, null)(DashboardBase);
