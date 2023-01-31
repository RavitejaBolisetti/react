import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FaRegIdBadge, FaUserMd, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';
import { Dropdown, Menu } from 'antd';

export const Header = () => {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Branch Location{' '}
                </a>
            ),
            children: [
                {
                    key: '1-1',
                    label: 'Mahindra Randhawa Motors',
                },
                {
                    key: '1-2',
                    label: 'MG Motor India',
                },
            ],
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Finacial Year{' '}
                </a>
            ),
        },
    ];
    const menu = (
        <Menu>
            <Menu.Item>
                <a href="https://www.antgroup.com">
                    <FaRegIdBadge />{' '}
                </a>
                My Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <AiFillSetting /> Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <TbFileReport /> FAQ
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <FaUserMd /> Training/Help
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <FiLogOut /> Logout
            </Menu.Item>
        </Menu>
    );

    const notifications = (
        <Menu>
            <Menu.ItemGroup title="15 Notifications">
                <a href="https://www.antgroup.com"></a>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item>
                {' '}
                <i className="fas fa-envelope mr-2"></i>4 new messages
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                {' '}
                <i className="fas fa-users mr-2"></i>8 friend requests
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <i className="fas fa-file mr-2"></i> 3 new reports
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light padr27">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown welcomeUser">
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a className="nav-link" data-toggle="dropdown" href="/">
                                <div className="circle-singleline" id="dealerLogo">
                                    MA
                                </div>
                                <Space>
                                    <div className="userText">
                                        <span className="dealername">Mahindra Automotive</span>
                                        <span className="userServiceArea">Vikhroli (W) Mumbai</span>
                                        {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
                                        <DownOutlined />
                                    </div>
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                </ul>

                {/* <!-- Right navbar links --> */}
                <ul className="navbar-nav ml-auto">
                    {/* <!-- Notifications Dropdown Menu --> */}
                    <li className="nav-item dropdown">
                        <Dropdown>
                            <a className="nav-link" data-toggle="dropdown" href="/">
                                <i className="far fa-bell"></i>
                                <span className="badge badge-warning navbar-badge">15</span>
                            </a>
                        </Dropdown>
                    </li>
                    {/* <!-- Notifications Dropdown Menu --> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="/">
                            {/* <!-- <img className="fl" src="asset/img/help.png"> --> */}
                            <FaHeadset />
                            <div className="helpLine">OneStop Help Desk</div>
                        </a>
                    </li>
                    {/* <!-- User Profile --> */}

                    <li className="nav-item dropdown welcomeUser">
                        <Dropdown>
                            <a className="nav-link" data-toggle="dropdown" href="/" onClick={(e) => e.preventDefault()}>
                                {/* <!-- <i className="fa fa-user userICO" aria-hidden="true"></i> --> */}
                                <div className="circle-singleline">JS</div>
                                <Space>
                                    <div className="userText">
                                        <span>John Smith</span>
                                        <span className="userServiceArea">+91-9865443234</span>
                                        <DownOutlined />
                                        {/* <i className="fas fa-angle-down right" aria-hidden="true"></i> */}
                                    </div>
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
