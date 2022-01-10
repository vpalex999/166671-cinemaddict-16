import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomFloat } from '../utils/common';

const MIN_DURATION = 30;
const MAX_DURATION = 180;

const getRandomTitle = () => {
  const titles = [
    'The Dance of Life',
    'Два с половиной человека',
    'Великий уравнитель',
    'Невезучие',
    'Стажёр',
    'мистер БИН',
    'не шутите с ЗОХАНОМ',
    'ДЮНА',
    'ДЖЕНТЕЛЬМЕНЫ',
    'ГНЕВ Человеческий',
    'ПАССАЖИРЫ',
    'НИКТО',
    'КУРЬЕР',
    'ЛЮДИ В ЧЁРНОМ',
    'МИФ',
    'БУГУЩИЙ ПО ЛЕЗВИЮ',
    'СОЛЯРИС',
    'СТАЛКЕР',
    'СТРАЖИ ГАЛАКТИКИ'
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};

const getOriginalTitle = (title) => `Original name is ${title}`;

const getRandonGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
    'Film-Noir'
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);
  return genres[randomIndex];
};

const getRandomGenres = () => {
  const genres = new Set();

  const randomNumGanres = getRandomInteger(1, 3);
  while (genres.size !== randomNumGanres) {
    genres.add(getRandonGenre());
  }

  return Array.from(genres.values());
};

const getRandomPosters = () => {
  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg'
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

const getRandomDescription = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];

  const randomNumSentences = getRandomInteger(1, 5);
  return Array.from({ length: randomNumSentences }, () => {
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    return sentences[randomIndex];
  })
    .join(' ');
};

const getRandomEmoji = () => {
  const emojis = [
    './images/emoji/angry.png',
    './images/emoji/puke.png',
    './images/emoji/sleeping.png',
    './images/emoji/smile.png'
  ];

  const randomIndex = getRandomInteger(0, emojis.length - 1);
  return emojis[randomIndex];
};

const getRandomText = () => {
  const texts = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?'
  ];

  const randonIndex = getRandomInteger(0, texts.length - 1);
  return texts[randonIndex];
};

const getRandomAuthor = () => {
  const authors = [
    'Tim Macoveev',
    'John Doe',
    'Mark Tven',
    'Vasia Pupkin',
    'Big Boss',
    'Xam'
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);
  return authors[randomIndex];
};

const getRandomCommentDay = () => {
  const days = [
    '2019-12-31T23:59:32.554Z',
    '2018-05-12T12:02:32.554Z',
    '2021-08-27T16:34:32.554Z',
    '2021-09-05T01:20:32.554Z',
    '2021-11-24T18:15:32.554Z',
    '2021-05-17T22:46:32.554Z',
    '2021-12-29T07:46:32.554Z',
  ];

  const randomIndex = getRandomInteger(0, days.length - 1);
  return days[randomIndex];
};

const getRandomComment = () => ({
  id: getRandomInteger(1, 100).toString(),
  emoji: getRandomEmoji(),
  text: getRandomText(),
  author: getRandomAuthor(),
  day: getRandomCommentDay(),
});

const getRandomComments = (min = 0, max = 5) => {
  const randomIndex = getRandomInteger(min, max);
  return Array.from({ length: randomIndex }, getRandomComment);
};

const getRandomDirector = () => {
  const directors = [
    'Anthony Mann',
    'Martin Scorsese',
    'Steven Spielberg',
    'George Lucas',
    'James Cameron',
    'Quentin Tarantino',
    'David Fincher',
    'Woody Allen',
    'Christopher Nolan',
    'Alfred Hitchcock',
    'Robert Zemeckis'
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

const getRandomWriters = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Asghar Farhadi',
    'Eric Roth',
    'Chang-dong Lee',
    'Richard Linklater',
    'Lars von Trier',
    'Quentin Tarantino',
    'Sion Sono',
    'Kenneth Lonergan',
    'Ingmar Bergman',
    'Stanley Kubrick'
  ];

  const randomNumWriters = getRandomInteger(1, 3);
  return Array.from({ length: randomNumWriters }, () => {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    return writers[randomIndex];
  })
    .join(', ');

};

const getRandomActors = () => {
  const actors = [
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
    'Robert De Niro',
    'Jack Nicholson',
    'Marlon Brando',
    'Denzel Washington',
    'Katharine Hepburn',
    'Humphrey Bogart',
    'Meryl Streep',
    'Daniel Day-Lewis',
    'Sidney Poitier',
    'Clark Gable',
    'Ingrid Bergman',
    'Tom Hanks'
  ];

  const randomNumActors = getRandomInteger(2, 6);
  return Array.from({ length: randomNumActors }, () => {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    return actors[randomIndex];
  })
    .join(', ');
};

const getRandomReleaseDate = () => {
  const realeases = [
    '1945-03-30T00:00:00.000Z',
    '1963-04-01T00:00:00.000Z',
    '1984-02-23T00:00:00.000Z',
    '2017-04-04T00:00:00.000Z',
    '2010-07-12T00:00:00.000Z',
    '2001-06-29T00:00:00.000Z',
    '2020-08-19T00:00:00.000Z',
    '2020-09-15T00:00:00.000Z',
    '2008-10-05T00:00:00.000Z',
    '1998-10-17T00:00:00.000Z',
    '1997-12-30T00:00:00.000Z',
    '2002-01-07T00:00:00.000Z',
  ];

  const randomIndex = getRandomInteger(0, realeases.length - 1);
  return realeases[randomIndex];
};

const getRandomCountry = () => {
  const countries = [
    'USA',
    'Australia',
    'Belarus',
    'China',
    'Russia',
    'Cuba',
    'Italy',
    'Japan',
    'Norway',
    'Serbia',
    'Spain',
    'Ukraine',
    'United Kingdom'
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);
  return countries[randomIndex];
};

const getRandomAge = () => getRandomInteger(0, 18);

const generateFilm = () => {

  const title = getRandomTitle();
  const isWatch = Boolean(getRandomInteger());

  return {
    id: nanoid(),
    title,
    rating: getRandomFloat(0.0, 10.0),
    year: getRandomInteger(1950, 2021),
    duration: getRandomInteger(MIN_DURATION, MAX_DURATION),
    poster: getRandomPosters(),
    description: getRandomDescription(),
    comments: getRandomComments(0, 5),
    titleOriginal: getOriginalTitle(title),
    director: getRandomDirector(),
    writers: getRandomWriters(),
    actors: getRandomActors(),
    releaseDate: getRandomReleaseDate(),
    country: getRandomCountry(),
    genres: getRandomGenres(),
    age: getRandomAge(),
    isWatch,
    isHistory: !isWatch && Boolean(getRandomInteger()),
    isFavorites: Boolean(getRandomInteger())
  };
};

export { generateFilm };
