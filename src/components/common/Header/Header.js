import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FaRegIdBadge, FaUserMd, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';
import { Dropdown, Menu } from 'antd';

export const Header = () => {
    const items: MenuProps['items'] = [
        {
          key: '1',
          label:(
            
             ' Branch Location '
              
          ),
                 children: [
                    {
                      key: '1-1',
                      label: (<a  target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard2">Mahindra Randhawa Motors</a>),
                    },
                    {
                      key: '1-2',
                      label:( <a  target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard2">MG Motor India</a>),
                    }
                  ],
          
        },
        {
            key: '2',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard2">
                 Finacial Year </a>
                
            ),
          },
        
      ];
      const menu = (
        <Menu>
             
          <Menu.Item><a href="http://localhost:3000/dashboard2"><FaRegIdBadge/> </a>My Profile</Menu.Item>
          <Menu.Divider />
          <Menu.Item><a href="http://localhost:3000/dashboard2"><AiFillSetting/> </a>Settings</Menu.Item>
          <Menu.Divider />
           <Menu.Item><a href="http://localhost:3000/dashboard2"><TbFileReport/> </a>FAQ</Menu.Item>
           <Menu.Divider />
           <Menu.Item><a href="http://localhost:3000/dashboard2"><FaUserMd/> </a>Training/Help</Menu.Item>
           <Menu.Divider />
           <Menu.Item><a href="http://localhost:3000/dashboard2"><FiLogOut/> </a>Logout</Menu.Item>
           


        </Menu>
      );

      const notifications=(
        <Menu>
            <Menu.ItemGroup title="15 Notifications" ><a href="http://localhost:3000/dashboard2"></a></Menu.ItemGroup>
            <Menu.Divider />
          <Menu.Item ><a href="http://localhost:3000/dashboard2"> <i className="fas fa-envelope mr-2"></i></a>4 new messages</Menu.Item>
          <Menu.Divider />
           <Menu.Item><a href="http://localhost:3000/dashboard2"> <i className="fas fa-users mr-2"></i></a>8 friend requests</Menu.Item>
           <Menu.Divider />
           <Menu.Item><a href="http://localhost:3000/dashboard2"><i className="fas fa-file mr-2"></i></a> 3 new reports</Menu.Item>


        </Menu>
      );
      
return(
    <>
    <div>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light padr27">
    {/* <!-- Left navbar links --> */}
	<ul className="navbar-nav">
		{/* <!-- <li className="nav-item">
			<a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
		</li> -->
		<!-- <li className="nav-item welcomeUser">
			<span className="userText dealername mrt5">Mahindra Automotive			
				<a className="nav-link" data-toggle="dropdown" href="#">
				<span className="userServiceArea">Vikhroli (W) Mumbai <i className="fa fa-angle-down" aria-hidden="true"></i></span>
			</span>		</a>
			<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
				<ul>
					<li><a href="#">Location 1</a></li>
					<li><a href="#"> Location 1</a></li>
					<li><a href="#"> Location 1</a></li>
					<li><a href="#"> Location 1</a></li>
					
				</ul>
			</div>
		</li> --> */}
      
        
        
		<li className="nav-item dropdown welcomeUser">
        <Dropdown menu={{ items }} trigger={['click']}>
			<a className="nav-link" data-toggle="dropdown" href="#" onClick={(e) => e.preventDefault()}>
				<div className="circle-singleline" id="dealerLogo">MA</div>
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
			{/* <div className="dropdown-menu dropdown-menu-lg dropdown-menu-left">
				<ul>
					<li><a href="#">Branch Location</a>
						<ul className="dropdown-menu dropdown-menu-lg dropdown-menu-left">
							<li><a href="#">Mahindra Randhawa Motors</a></li>
							<li><a href="#">MG Motor India</a></li>
						</ul>
					</li>
					<li><a href="#">Finacial Year</a></li>
				</ul>
			</div> */}
		</li>
	</ul>
    
	{/* <!-- Right navbar links --> */}
	<ul className="navbar-nav ml-auto">
		{/* <!-- Notifications Dropdown Menu --> */}
		<li className="nav-item dropdown">
            <Dropdown overlay={notifications} trigger={['click']}>
			<a className="nav-link" data-toggle="dropdown" href="#">
				<i className="far fa-bell"></i>
				<span className="badge badge-warning navbar-badge">15</span>
			</a>
			{/* <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
				<span className="dropdown-item dropdown-header">15 Notifications</span>
				<div className="dropdown-divider"></div>
				<ul>
					<li><a href="#"><i className="fas fa-envelope mr-2"></i> 4 new messages</a></li>
					<li><a href="#"><i className="fas fa-users mr-2"></i> 8 friend requests</a></li>
					<li><a href="#"><i className="fas fa-file mr-2"></i> 3 new reports</a></li>
				</ul>
				<div className="dropdown-divider"></div>
				<a href="notifications.html" className="dropdown-footer">See All Notifications</a>
			</div> */}
            </Dropdown>
		</li>
		{/* <!-- Notifications Dropdown Menu --> */}
		<li className="nav-item dropdown">
			<a className="nav-link" data-toggle="dropdown" href="#">
				{/* <!-- <img className="fl" src="asset/img/help.png"> --> */}
				<FaHeadset/>
				<div className="helpLine">OneStop Help Desk</div>
			</a>
		</li>
		{/* <!-- User Profile --> */}
        
		<li className="nav-item dropdown welcomeUser">
         <Dropdown overlay={menu} trigger={['click']}>
			<a className="nav-link" data-toggle="dropdown" href="#"  onClick={(e) => e.preventDefault()}>
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
			{/* <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right mrr16">
				<ul>
					<li><a href="my_profile.html"><i className="fa-solid fa-id-badge iconSection"></i> My Profile</a></li>
					<li><a href="configurable_parameter.html"><i className="fa-solid fa-gear iconSection"></i> Settings</a>
					</li>
					<li><a href="#"><i className="fa-solid fa-file-circle-question iconSection"></i> FAQ</a></li>
					<li>
						<a href="#"><i className="fa-solid fa-chalkboard-user iconSection"></i> Training/Help</a>
					</li>
					<li><a href="#"><i className="fa-solid fa-right-from-bracket iconSection"></i>Logout</a></li>
				</ul>
			</div> */}
		</li>

	</ul>
</nav>
    </div>



	
    </>
)
};
