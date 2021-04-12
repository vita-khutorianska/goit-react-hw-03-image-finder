import React, { Component } from 'react';
import Modal from './Components/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Notification } from 'react-pnotify';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import imageApi from './Components/Api/Image-api';
import SearchBar from './Components/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  state = {
    showModal: false,
    images: [],
    currentPage: 1,
    searchImage: '',
    isLoading: false,
    error: null,
    modalURL: '',
    scrollScr: false,
    enterError: false,
  };
  // Пример прокрутки взят из документации https://ru.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const list = this.listRef.current;
      // console.log("set snapshot: ", list.scrollHeight, list.scrollTop)
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchImage !== this.state.searchImage) {
      console.log('call fetchImage()');
      this.fetchImage();
    }

    if (snapshot !== null) {
      const list = this.listRef.current;
      console.log('snapshot: ', list.scrollHeight, snapshot);
      if (this.state.scrollScr) {
        window.scrollTo({
          top:
            document.documentElement.scrollTop + (list.scrollHeight - snapshot),
          behavior: 'smooth',
        });
      } else {
        this.setState({ scrollScr: true });
      }
    }
  }

  addImage = image => {
    // console.log('addImage()');
    this.setState({
      searchImage: image,
      images: [],
      currentPage: 1,
      scrollScr: false,
    });
  };

  fetchImage = () => {
    console.log('fetchImage()');
    const { searchImage, currentPage } = this.state;
    const options = { searchImage, currentPage };
    this.setState({ isLoading: true });

    if (searchImage.length <= 2) {
      this.setState({ isLoading: false });
      return;
    }
    imageApi
      .fetchImages(options)
      .then(hits =>
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toogleModal = () => {
    console.log('toogleModal()');
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getModalImage = largeImageURL => {
    console.log('modalURL', this.state.modalURL);
    this.setState({ modalURL: largeImageURL.modalSrc });
    this.toogleModal();
  };

  render() {
    const {
      showModal,
      images,
      isLoading,
      // enterError,
      modalURL,
    } = this.state;
    console.log('render() searchImage', this.state.searchImage);
    return (
      <div ref={this.listRef}>
        <SearchBar onSubmit={this.addImage} />
        <ImageGallery images={images} onClick={this.getModalImage} />

        {isLoading && <CircularProgress color="secondary" />}
        {images.length > 0 && <Button onClick={this.fetchImage} />}
        {showModal && (
          <Modal onClick={this.toogleModal} onClose={this.toogleModal}>
            <img width="1200" height="900" src={modalURL} alt="something" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
