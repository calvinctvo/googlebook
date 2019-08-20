import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SavedBookDetail from "./SavedBookDetail";
import API from "../utils/API";

class SavedBooks extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        API.getBooks()
            .then(res => this.setState(
                {
                    books: res.data
                },
                console.log(res.data)
            )
            )
            .catch(err => console.log(err));
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data })
            )
            .catch(err => console.log(err));
    };

    handleDeleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        {this.state.books.length ? (
                            <Card heading="Saved Books">
                                {this.state.books.map(book => (
                                    <SavedBookDetail
                                        key={book._id}
                                        src={book
                                            ? book.src
                                            : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-icon.png"}
                                        title={book.title}
                                        authors={book.authors.join(", ")}
                                        date={book.date}
                                        description={book.description}
                                        link={book.link}
                                        handleDeleteBook={() => this.handleDeleteBook(book._id)}
                                    />
                                ))}
                            </Card>
                        ) : (
                                <Card heading="Saved Books"></Card>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SavedBooks;