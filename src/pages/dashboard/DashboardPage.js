import React from 'react';
import { connect } from 'react-redux';
import imdimg from 'assets/img/img_md.png';
import { Carousel, Card, Button, Row, Col, Input } from 'antd';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiFileShield2Line } from 'react-icons/ri';
import { FaChartPie, FaChartArea, FaClock, FaNewspaper, FaChalkboard, FaBirthdayCake } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import styles from './DashboardPage.module.css';
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
        firstName: loginUserData?.firstName,
    };
};

const DashboardPageBase = ({ props }) => {
    const { firstName } = props;
    const onSearch = (value) => console.log(value);
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
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.floatRight}>
                            <Search allowClear placeholder="Enter Doc ID..." onSearch={onSearch} />
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>{' '}
                </Col>
            </Row>

            {/* <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                    <div className={styles.headingGradient}>
                        <span className="innerheading">Welcome back John! </span>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.floatRight}>
                    <Search allowClear placeholder="Enter Doc ID..." onSearch={onSearch} />
                </Col>
                
            </Row>
            */}
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
                        <div>
                            <div className="direct-chat-messages">
                                <div className="dashboardGraphBox">
                                    <div className="graphBoxfirstSec">
                                        <BsFillBarChartFill />
                                    </div>
                                    <div className="graphBoxSecoundSec">
                                        <FaChartPie />
                                    </div>
                                    <div className="graphBoxthirdSec">
                                        <BiLineChart />
                                    </div>
                                    <div className="graphBoxforthSec">
                                        <FaChartArea />
                                    </div>
                                </div>

                                <div className="buttonHolder">
                                    <Button className="btn btn-outline centerbtn boxShdwNon mrl15" danger>
                                        View Dashboard
                                    </Button>
                                </div>
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
                            <div className="scrollbar" id="scrollHBar">
                                <div className="force-overflow">
                                    <ul className="dashboardList">
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                        </li>
                                        <li>
                                            Pending POs to be released <span className="badge badge-danger right">12</span>
                                        </li>
                                        <li>
                                            Vehicles to be delivered <span className="badge badge-danger right">10</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
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
                            <div>
                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                <div className="buttonHolder">
                                    <Button danger className="btn btn-outline centerbtn boxShdwNon mrl15">
                                        View Dashboard
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                <div className="buttonHolder">
                                    <Button danger className="btn btn-outline centerbtn boxShdwNon mrl15">
                                        View Dashboard
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                <div className="buttonHolder">
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
                        <div>
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
                            <div>
                                <div className="row ">
                                    <div className="col-md-3">
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className="col-md-8 birthdayTxtcontaner">
                                        <div className="birthdayName">First Name, Last Name</div>
                                        <div>Today - 22 Nov.</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row ">
                                    <div className="col-md-3">
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className="col-md-8 birthdayTxtcontaner">
                                        <div className="birthdayName">First Name1, Last Name1</div>
                                        <div>Today - 22 Nov.</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row ">
                                    <div className="col-md-3">
                                        <img src={imdimg} alt="" />
                                    </div>
                                    <div className="col-md-8 birthdayTxtcontaner">
                                        <div className="birthdayName">First Name2, Last Name2</div>
                                        <div>Today - 22 Nov.</div>
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
                        <div className="card-body">
                            <div className="direct-chat-messages"></div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export const DashboardPage = connect(mapStateToProps, null)(withLayoutMaster(DashboardPageBase));
