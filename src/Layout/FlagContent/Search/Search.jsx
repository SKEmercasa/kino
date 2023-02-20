const Search = ({ results, cardWrapper }) => {
  let cards = cardWrapper(results);
  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{cards}</div>;
};

export default Search;
