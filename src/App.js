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

const API = new ImageApiService();

class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    images: [],
    urlModal: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props.searchQuery) {
      this.onGetImages(this.state.searchQuery);
      // this.setState({ loading: true });
    }
  }
  onGetImages() {
    API.fetchImages(this.state.searchQuery).then(({ hits }) => {
      this.setState({ images: [this.state.images, ...hits] });
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
