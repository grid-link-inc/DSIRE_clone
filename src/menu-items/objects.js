// assets
import { ProfileOutlined } from '@ant-design/icons';

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
    }
  ]
};

export default objects;
