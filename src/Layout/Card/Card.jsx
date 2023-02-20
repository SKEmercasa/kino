import { Card, Image, Typography, Space } from 'antd';

import RatedContainer from '../FlagContent/Rated/RatedContainer';

import Genres from './Genres/Genres';

function CardThis(props) {
  const { title, image, date, overview, postRateMovie, id, average, decor, arrCardGenders } = props;
  const { Meta } = Card;
  const { Paragraph, Text } = Typography;

  let averageShot = (average) => Math.trunc(average * 10) / 10;
  let genres = arrCardGenders.map((genres, i) => {
    return <Genres value={genres} key={i} />;
  });
  return (
    <Card
      style={{
        width: 450,
        margin: 10,
        position: 'relative',
      }}
      extra={
        <span
          style={{
            borderRadius: '50%',
            border: `4px solid ${decor}`,
            width: '40px',
            height: '40px',
          }}
        >
          {Number.isInteger(averageShot(average)) ? `${averageShot(average)}.0` : averageShot(average)}
        </span>
      }
      headStyle={{
        position: 'absolute',
        left: '87%',
        border: '0',
      }}
    >
      <Meta
        style={{ textAlign: 'start' }}
        avatar={image && <Image width="100px" src={'https://image.tmdb.org/t/p/w500' + `${image}`} />}
        title={title}
        description={
          <>
            <Paragraph>{date}</Paragraph>
            <Paragraph>
              <Space size={[0, 5]} wrap>
                {genres}
              </Space>
            </Paragraph>
            <Text>{overview}</Text>
            <br />
            <span>
              <RatedContainer postRateMovie={postRateMovie} id={id} />
            </span>
          </>
        }
      />
    </Card>
  );
}

export default CardThis;
