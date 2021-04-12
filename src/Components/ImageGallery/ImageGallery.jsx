import style from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => (
  <div className={style.grid}>
    <ul className={style.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            modalSrc={largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  </div>
);
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
    }),
  ).isRequired,
};
export default ImageGallery;
