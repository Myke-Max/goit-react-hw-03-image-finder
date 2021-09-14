import React from 'react';
import s from './imageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem';

const ImageGallery = ({ toggleOpen, images }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          toggleOpen={toggleOpen}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
