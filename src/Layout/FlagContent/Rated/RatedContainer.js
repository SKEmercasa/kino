import React from 'react';
import { Rate } from 'antd';

class RatedContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: '',
  };

  componentDidMount() {
    for (const key of Object.keys(localStorage)) {
      if (key === this.props.id.toString()) {
        let rate = localStorage.getItem(this.props.id);
        this.setState({ value: rate });
      }
    }
  }

  render() {
    return (
      <Rate
        value={this.state.value}
        count={10}
        onChange={(e) => {
          this.props.postRateMovie(this.props.id, e);
          this.setState({ value: e });
        }}
      />
    );
  }
}

export default RatedContainer;
