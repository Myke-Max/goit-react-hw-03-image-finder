import { Component } from 'react';
import Container from './components/container';
import ImageApiService from './API-service/api';
import Modal from './components/modal';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/Searchbar/searchBar';
import ModalCss from './components/modal/modal.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// const API = new ImageApiService();

class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    images: [],
    urlModal: '',
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.searchQuery;
    const newImage = this.state.searchQuery;
    if (prevImage !== newImage) {
      // console.log('pre', prevState.searchQuery);
      // console.log('this', this.state.searchQuery);
      // рендерим по условию лодинг
      this.setState({ loading: true, images: [] });
      this.onGetImages(newImage);
    }
  }
  onGetImages(newImage) {
    ImageApiService(newImage).then(({ hits }) => {
      this.setState({ images: [...hits] });
    });
  }
  handleQuerySubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  toggleModal = url => {
    this.setState({
      showModal: !this.state.showModal,
      urlModal: url,
    });
  };
  render() {
    const { showModal, images, urlModal } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <ToastContainer />
            <SearchBar onSubmit={this.handleQuerySubmit} />
            <ImageGallery images={images} toggleOpen={this.toggleModal} />
            {showModal && (
              <Modal toggleClose={this.toggleModal}>
                <img src={urlModal} alt="" />
                <button
                  type="button"
                  onClick={this.toggleModal}
                  className={ModalCss.buttonClose}
                ></button>
              </Modal>
            )}
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
