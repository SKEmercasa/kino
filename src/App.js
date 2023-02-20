import './App.css';
import { Space } from 'antd';

import LayoutContainer from './Layout/LayoutContainer';

function App() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 98]}
    >
      <LayoutContainer />
    </Space>
  );
}

export default App;
