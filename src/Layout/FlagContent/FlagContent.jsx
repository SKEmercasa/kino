import format from 'date-fns/format';
import { Alert } from 'antd';

import CardThis from '../Card/Card';

import Rated from './Rated/Rated';
import Search from './Search/Search';

const FlagContent = ({ results, isTabFlag, postRateMovie, resultsRate, genres }) => {
  function reWroteDate(date) {
    if (date) {
      return format(new Date(date), 'MMMM d, yyyy');
    }
  }

  function rateDecor(el) {
    if (el < 3) {
      return '#E90000';
    } else if (el > 7) {
      return '#66E900';
    } else if (el > 5) {
      return '#E9D100';
    } else if (el > 3) {
      return '#E97E00';
    }
  }

  function textShot(el) {
    let text = el.overview;
    let limit = 200;
    let overText = `${text.slice(0, text.indexOf(' ', limit))}...`;
    return text.length <= limit ? text : overText;
  }

  function reWroteGenres(genres, el) {
    return el.map((el) => {
      return (
        el &&
        genres.map((item) => {
          let arr = Object.values(item);
          if (arr[0] === el) {
            return arr[1];
          }
        })
      );
    });
  }

  function cardWrapper(card) {
    let cards = card.map((el) => {
      let overview = textShot(el);
      let newDate = reWroteDate(el.release_date);
      let decor = rateDecor(el.vote_average);
      let arrCardGenders = reWroteGenres(genres, el.genre_ids);
      return (
        <CardThis
          title={el.original_title}
          image={el.poster_path}
          date={newDate}
          overview={overview}
          average={el.vote_average}
          id={el.id}
          postRateMovie={postRateMovie}
          key={el.id}
          decor={decor}
          arrCardGenders={arrCardGenders}
        />
      );
    });
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{cards}</div>;
  }

  return isTabFlag === 'Rated' ? (
    resultsRate.length ? (
      <Rated results={resultsRate} cardWrapper={cardWrapper} />
    ) : (
      <Alert
        message="No movies found for this query"
        style={{ borderRadius: '0', backgroundColor: '#7dbcea', textAlign: 'center', border: 'none', width: '100%' }}
      />
    )
  ) : (
    <Search results={results} cardWrapper={cardWrapper} />
  );
};

export default FlagContent;
