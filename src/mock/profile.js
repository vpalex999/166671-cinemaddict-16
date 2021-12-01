import { getRandomInteger } from '../util';

const getRandomRating = () => {
  const ratings = [
    'Movie Buff',
    'Movie Critic'
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);
  return ratings[randomIndex];
};

const getRandomAvatar = () => {
  const avatars = [
    './images/bitmap@2x.png'
  ];

  return avatars[0];
};

const generateProfile = () => ({
  rating: getRandomRating(),
  avatar: getRandomAvatar()
});


export { generateProfile };
