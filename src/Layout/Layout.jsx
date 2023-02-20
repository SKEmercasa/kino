import { Layout, Pagination, Alert } from 'antd';

import * as style from './style';
import HeaderThis from './Header/Header';
import FlagContent from './FlagContent/FlagContent';
import { GenresData } from './GenresContext';

const { Footer, Content } = Layout;

function LayoutRender({
  page,
  results,
  total_results,
  setPage,
  searchInState,
  tabFlag,
  isTabFlag,
  postRateMovie,
  resultsRate,
  pageRate,
  total_resultsRate,
}) {
  const isMovie =
    results.length || (resultsRate.length && isTabFlag === 'Rated') ? (
      <Content style={style.contentStyle}>
        <GenresData.Consumer>
          {(genres) => (
            <FlagContent
              resultsRate={resultsRate}
              results={results}
              isTabFlag={isTabFlag}
              postRateMovie={postRateMovie}
              genres={genres}
            />
          )}
        </GenresData.Consumer>
      </Content>
    ) : (
      <Alert
        message="No movies found for this query"
        style={{ borderRadius: '0', backgroundColor: '#7dbcea', textAlign: 'center', border: 'none' }}
      />
    );
  return (
    <Layout>
      <HeaderThis style={style.headerStyle} searchInState={searchInState} isTabFlag={isTabFlag} tabFlag={tabFlag} />
      {isMovie}
      <Footer style={style.footerStyle}>
        {isTabFlag === 'Search' ? (
          <Pagination
            current={page}
            total={total_results}
            defaultPageSize={20}
            pageSizeOptions={[20]}
            onChange={setPage}
          />
        ) : (
          <Pagination
            current={pageRate}
            total={total_resultsRate}
            defaultPageSize={20}
            pageSizeOptions={[20]}
            onChange={setPage}
          />
        )}
      </Footer>
    </Layout>
  );
}

export default LayoutRender;
