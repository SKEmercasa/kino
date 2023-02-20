import { Input, Layout, Segmented } from 'antd';

const { Header } = Layout;
const HeaderThis = ({ style, searchInState, tabFlag, isTabFlag }) => {
  return (
    <Header style={style}>
      <Segmented
        block
        style={{ marginTop: '10px', width: '150px', marginLeft: '40vw', marginRight: '45vw', color: '#C2C2C2' }}
        options={['Search', 'Rated']}
        value={isTabFlag}
        onChange={tabFlag}
      />
      <Input placeholder="Basic usage" defaultValue={''} onChange={searchInState} autoFocus />
    </Header>
  );
};
export default HeaderThis;
