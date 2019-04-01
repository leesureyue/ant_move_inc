/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '商店管理',
    icon: 'dashboard',
    path: '/layout/dashboard',
    children: [
      {
        name: '服务管理',
        path: 'service',
      },
      {
        name: '订单管理',
        path: 'order',
      },
      {
        name: '评价管理',
        path: 'evaluate', 
      },
    ],
  },
  {
    name: '数据分析',
    icon: 'analysis',
    path: '/layout/dashboard/analysis',
  },{
    name:'店铺信息',
    icon:'shop',
    path:'/layout/dashboard/info'
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
