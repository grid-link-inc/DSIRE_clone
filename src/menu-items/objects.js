// assets
import { ProfileOutlined, InfoCircleOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const objects = {
  id: 'group-objects',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'programs',
      title: 'Programs',
      type: 'item',
      url: '/programs',
      icon: ProfileOutlined,
      breadcrumbs: true
    },
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: InfoCircleOutlined,
      breadcrumbs: false
    }
  ]
};

export default objects;
