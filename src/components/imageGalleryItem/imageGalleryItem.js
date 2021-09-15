import s from './imageGalleryItem.module.css';

const GalleryItems = ({ toggleOpen, id, webformatURL, largeImageURL, tags }) => (
  <li className={s.ImageGalleryItem}>
    <img
      onClick={e => toggleOpen(e.target.dataset.large)}
      src={webformatURL}
      alt={tags}
      className={s.ImageGalleryItem__image}
      data-large={largeImageURL}
      key={id}
    />
  </li>
);

export default GalleryItems;
