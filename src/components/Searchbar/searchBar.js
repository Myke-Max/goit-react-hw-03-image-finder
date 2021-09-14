import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './searchBar.module.css';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };
  handleQueryValue = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Wow,specify your wishes');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleQueryValue}
            value={this.state.searchQuery}
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
