// class ImageApiService {
//   constructor() {
//     this.URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
//     this.page = 1;
//     this.searchQuery = '';
//     this.KEY = '22387532-0967f6e2e55f286a38e8c1dae';
//   }
//   resetPage() {
//     this.page = 1;
//   }

//   nextPage() {
//     this.page += 1;
//   }

//   resetQuery(query) {
//     if (this.searchQuery !== query) {
//       this.searchQuery = query;
//       this.page = 1;
//     }
//   }

//   fetchImages(query) {
//     this.resetQuery(query);
//     return fetch(`${this.URL}?q=${query}&page=${this.page}&per_page=12&key=${this.KEY}`).then(res =>
//       res.json(),
//     );
//   }
// }

// export default ImageApiService;

const URL = 'https://pixabay.com/api/';
const KEY = '22387532-0967f6e2e55f286a38e8c1dae';

const ImageApiService = (searchQuery, page = 1) => {
  return fetch(
    `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => res.json());
};

export default ImageApiService;
