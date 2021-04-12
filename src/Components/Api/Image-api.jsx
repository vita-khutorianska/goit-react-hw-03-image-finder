import axios from 'axios';
const ApiKey = '20342526-89d38198e8299a53d4950dffe';
const fetchImages = async ({ searchImage = '', currentPage = 1 }) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchImage}&page=${currentPage}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data.hits;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchImages };
