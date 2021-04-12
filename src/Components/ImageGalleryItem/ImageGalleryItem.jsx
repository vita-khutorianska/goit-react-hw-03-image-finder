import style from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, modalSrc, onClick }) => (
  <li className={style.imageGalleryItem} key={id}>
    <img
      src={webformatURL}
      alt="querly img"
      className={style.imageGalleryItem_image}
      onClick={() => onClick({ modalSrc })}
    />
  </li>
);
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
};
export default ImageGalleryItem;
