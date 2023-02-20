import React from 'react';
import { Alert, Space, Spin } from 'antd';

import { getCard, getGuest, postGuestRating, getRated, getInfo } from '../assets/api';
import { debounce } from '../assets/debounce';

import { GenresData } from './GenresContext';
import { content } from './style';
import Layout from './Layout';

class LayoutContainer extends React.Component {
  state = {
    results: [],
    resultsRate: [],
    pageRate: 0,
    total_pagesRate: 0,
    total_resultsRate: 0,
    page: 0,
    total_pages: 0,
    total_results: 0,
    isLoading: true,
    serverError: false,
    search: 'return',
    isTabFlag: 'Search',
    genres: [],
  };

  getLoad(ofPage, ofSearch) {
    getInfo()
      .then(async (genres) => await genres.genres)
      .then((arr) => this.setState({ genres: arr }));
    getCard(ofPage, ofSearch)
      .then((arrData) => {
        console.log(arrData);
        const { page, results, total_pages, total_results } = arrData;
        this.setState({ results, page, total_pages, total_results, isLoading: false });
      })
      .catch(() =>
        this.setState((state) => {
          return {
            ...state,
            serverError: true,
          };
        })
      );
  }

  setPage = (e) => {
    this.setState((state) => {
      return {
        ...state,
        page: e,
        isLoading: true,
      };
    });
  };

  searchInState = (e) => {
    this.setState((state) => {
      let fr = e.target.value;
      return {
        ...state,
        search: fr,
        input: fr,
        isLoading: true,
      };
    });
  };

  tabFlag = (e) => {
    this.setState((state) => {
      return {
        ...state,
        isTabFlag: e,
      };
    });
  };

  postRateMovie = (id, e) => {
    postGuestRating(id, e).then((fb) => {
      fb.success && localStorage.setItem(`${id}`, e);
      fb.success &&
        getRated()
          .then((arrDataRate) => {
            console.log(arrDataRate);
            const { page, results, total_pages, total_results } = arrDataRate;
            this.setState({
              resultsRate: results,
              pageRate: page,
              total_pagesRate: total_pages,
              total_resultsRate: total_results,
              isLoading: false,
            });
          })
          .catch(() =>
            this.setState((state) => {
              return {
                ...state,
                serverError: true,
              };
            })
          );
    });
  };

  componentDidMount() {
    if (!localStorage.getItem('session')) {
      getGuest().then((res) => {
        localStorage.setItem('session', res.guest_session_id);
      });
    } else {
      getRated()
        .then((arrDataRate) => {
          const { page, results, total_pages, total_results } = arrDataRate;
          this.setState({
            resultsRate: results,
            pageRate: page,
            total_pagesRate: total_pages,
            total_resultsRate: total_results,
            isLoading: false,
          });
        })
        .catch(() =>
          this.setState((state) => {
            return {
              ...state,
              serverError: true,
            };
          })
        );
    }
    this.getLoad(1, this.state.search);
  }
  componentDidUpdate(_props, prevState) {
    if (this.state.page !== prevState.page) {
      this.getLoad(this.state.page, this.state.search);
    }
    if (this.state.search !== prevState.search) {
      this.getLoad(1, this.state.search);
    }
  }

  render() {
    window.state = this.state;
    if (this.state.serverError) {
      return (
        <Space direction="vertical" style={content}>
          <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
        </Space>
      );
    } else {
      if (this.state.isLoading) {
        return (
          <Space direction="vertical" style={content}>
            <Spin tip="Loading...">
              <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
              />
            </Spin>
          </Space>
        );
      } else {
        return (
          <GenresData.Provider value={this.state.genres}>
            <Layout
              {...this.state}
              setPage={this.setPage}
              searchInState={debounce(this.searchInState, 1300)}
              tabFlag={this.tabFlag}
              postRateMovie={this.postRateMovie}
            />
          </GenresData.Provider>
        );
      }
    }
  }
}

export default LayoutContainer;
