import { Component } from 'react';
import styles from '../SearchBar/SearchBar.module.css';

class SearchBar extends Component {
  state = {
    image: '',
  };

  handleChange = e => {
    this.setState({ image: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
    // console.log(this.state.image);
  };
  render() {
    return (
      <div>
        <header className={styles.search_bar}>
          <form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.searchForm_button}>
              <span className={styles.searchForm_button_label}>Search</span>
            </button>

            <input
              onChange={this.handleChange}
              className={styles.searchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.image}
            />
          </form>
        </header>
      </div>
    );
  }
}
export default SearchBar;
