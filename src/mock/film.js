import { getRandomInteger, getRandomFloat } from '../util';

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

const getOriginalTitle = () => `Original name is ${getRandomTitle()}`;

const getRandomDuration = () => {
  const durations = [
    '1h 55m',
    '1h 36m',
    '1h 30m',
    '2h 05m',
    '1h 20m',
    '1h 46m',
    '30m',
    '45m',
    '2h 23m'
  ];

  const randomIndex = getRandomInteger(0, durations.length - 1);
  return durations[randomIndex];
};

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
    '2019/12/31 23:59',
    '2018/05/12 12:02',
    '2021/08/27 16:34',
    '2021/09/05 01:20',
    '2021/11/24 18:15',
    '2021/05/17 22:46'
  ];

  const randomIndex = getRandomInteger(0, days.length - 1);
  return days[randomIndex];
};

const getRandomComment = () => ({
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
    '30 March 1945',
    '01 April 1963',
    '23 January 1984',
    '04 May 2017',
    '12 June 2010',
    '29 July 2001',
    '19 August 2020',
    '15 September 2020',
    '05 October 2008',
    '17 November 1998',
    '31 December 1997',
    '07 February 2002'
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

const generateFilm = () => ({
  title: getRandomTitle(),
  rating: getRandomFloat(0.0, 10.0),
  year: getRandomInteger(1950, 2021),
  duration: getRandomDuration(),
  poster: getRandomPosters(),
  description: getRandomDescription(),
  comments: getRandomComments(0, 5),
  titleOriginal: getOriginalTitle(),
  director: getRandomDirector(),
  writers: getRandomWriters(),
  actors: getRandomActors(),
  releaseDate: getRandomReleaseDate(),
  country: getRandomCountry(),
  genres: getRandomGenres(),
  age: getRandomAge()
});


export { generateFilm };
