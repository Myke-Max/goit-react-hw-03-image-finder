import { Component } from 'react';
import Container from './components/container';
import ImageApiService from './API-service/api';
import Modal from './components/modal';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/Searchbar/searchBar';
import LoadMore from './components/button/button';
import Loader from './components/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// const API = new ImageApiService();
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  LOADING: 'loading',
};
class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    images: [],
    urlModal: '',
    status: 'idle',
    error: '',
    page: 1,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.state.searchQuery;
    const nextPage = this.state.page;
    if (this.state.status === Status.LOADING) {
      this.setState({ status: Status.PENDING });
      this.onGetImages(newQuery, nextPage);
    }
    if (this.state.status !== Status.LOADING && prevState.page !== nextPage) {
      this.onGetImages(newQuery, nextPage);
      this.setState({ error: '' });
    }
    if (!this.state.showModal && !prevState.showModal) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
  onGetImages(newQuery, page) {
    ImageApiService(newQuery, page)
      .then(({ hits, total }) => {
        this.setState({
          images: [...this.state.images, ...hits],
          total: total / 12 > 500 ? 500 : total / 12,
        });
        hits.length > 0
          ? this.setState({ status: Status.RESOLVED })
          : this.setState({ status: Status.REJECTED, error: 'not found' });
      })
      .catch(error => this.setState({ status: Status.REJECTED, error }));
  }

  handleQuerySubmit = searchQuery => {
    this.setState({ searchQuery, status: Status.LOADING, page: 1, images: [] });
  };

  toggleModal = url => {
    this.setState({
      showModal: !this.state.showModal,
      urlModal: url,
    });
  };
  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };
  render() {
    const { searchQuery, showModal, images, urlModal, error, status, page, total } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <ToastContainer />
            <SearchBar onSubmit={this.handleQuerySubmit} />
            {error && <p>Oops, there are no results for the {searchQuery} </p>}
            <ImageGallery images={images} toggleOpen={this.toggleModal} />
            {page < total && <LoadMore nextPage={this.handleIncrement} />}
            {status === 'pending' && <Loader />}
            {showModal && (
              <Modal toggleClose={this.toggleModal}>
                <img src={urlModal} alt="" />
              </Modal>
            )}
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
