import s from './imageGalleryItem.module.css';

const GalleryItems = ({ toggleOpen, webformatURL, largeImageURL, tags }) => (
  <li onClick={toggleOpen} className={s.ImageGalleryItem}>
    <img
      onClick={e => toggleOpen(e.target.dataset.large)}
      src={webformatURL}
      alt={tags}
      className={s.ImageGalleryItem__image}
      data-large={largeImageURL}
    />
  </li>
);

export default GalleryItems;
