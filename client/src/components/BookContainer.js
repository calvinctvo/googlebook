import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import BookDetail from "./BookDetail";
import API from "../utils/API";

class BookContainer extends Component {
  state = {
    books: {},
    search: ""
  };


  searchBooks = query => {
    API.search(query)
      .then(res => this.setState({ books: res.data, search: "" }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
  };

  handleSaveBook = bookData => {
    API.saveBook(bookData)
      .then(res => alert("Book Saved!"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card heading="Google Books Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.books.length ? (
              <Card heading="Results">
                {this.state.books.map(book => (
                  <BookDetail
                    key={book.id}
                    src={book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-icon.png"}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "N/A"}
                    date={book.volumeInfo.publishedDate}
                    description={book.volumeInfo.description}
                    link={book.volumeInfo.infoLink}
                    handleSaveBook={() => this.handleSaveBook({
                      title: book.volumeInfo.title,
                      src: book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-icon.png",
                      authors: book.volumeInfo.authors,
                      date: book.volumeInfo.publishedDate,
                      description: book.volumeInfo.description,
                      link: book.volumeInfo.infoLink
                    })}
                  />
                ))}
              </Card>
            ) : (
                <Card heading="Search Results"></Card>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookContainer;
