import component from "@/locales/en-US/component";
import route from "mock/route";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/baitap1',
		name: 'Bài Tập 1',
		icon: '',
		component: './BaiTap1',
	},
	{
		path :'/baitap2',
		name : 'Bài Tập 2',
		icon :'',
		component : './BaiTap2'
	},
{
  path: '/TH01',
  name: 'Bài Thực Hành 01',
  component: './TH01',
  routes: [
    {
      name: 'Bai1',
      path: 'Random-Math',
      component: './TH01/Bai1',
    },
    {
      name: 'Bai2',
      path: 'Bai-2',
      component: './TH01/Bai2',
    },
  ],
},
{
	path:'/TH02',
	name : "Bài Thực Hành 02",
	component : "./TH02",
	routes : [
		{
			name:'Bai1',
			path:"Oan_tu_ti",
			component:'./TH02/Bai1',
		},
		{
			name:'Bai2',
			path:'Quan_ly_cau_hoi',
			component : './TH02/Bai2',
		}
	]
},
{
	path:'/TH03',
	name : "Bai Thuc Hanh 03",
	component : "./TH03",
},
{
	path:'/TH04',
	name : "Bai Thuc Hanh 04",
	component:"./TH04"
},
{
	path:'/TH05',
	name:"Bai Thuc Hanh 05",
	component:"./TH05"
},
{
	path :"/TH06",
	name:"Bai Thuc Hanh 06",
	component:"./TH06"
},
{
	path:"/KTGK",
	name:"Kiem Tra Giua Ky",
	component :"./KTGK"
},
{
	path:"/TH07",
	name : "TH07",
	component:"./TH07"
},
{
	path:"/TH08",
	name:"TH08",
	component:"./TH08"
},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
	
];
