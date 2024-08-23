const request = require("supertest");
const { getBooks, getBookById } = require("../controllers");
const { app } = require("../index");
const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("API Endpoints tests", () => {
  it("GET /books returns all the books", async () => {
    const mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getBooks.mockReturnValue(mockBooks);

    const response = await request(server).get("/books");
    expect(response.body.books).toEqual(mockBooks);
    expect(response.status).toEqual(200);
    expect(response.body.books.length).toBe(3);
  });

  it("GET /books/details/:id return specific book", async () => {
    const mockBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };

    getBookById.mockReturnValue(mockBook);

    const response = await request(server).get("/books/details/1");
    expect(response.body.book).toEqual(mockBook);
    expect(response.status).toEqual(200);
  });
});

describe("Controllers function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all the games", () => {
    const mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getBooks.mockReturnValue(mockBooks);

    const response = getBooks();
    expect(response).toEqual(mockBooks);
  });
});
