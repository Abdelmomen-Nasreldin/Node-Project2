const books = require("../model/book.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.createBook = (req, res) => {
  books.findOne({ userId: req.params.userId }, (err, book) => {
    if (book) {
      return res.status(400).send("sorry but you already published your book");
    }
    book = new books({
      bookName: req.body.bookName,
      author: req.body.author,
      description: req.body.description,
      dateOfPuplish: Date.now(),
      puplisherName: req.body.userName,
      userId: req.params.userId,
    });

    book
      .save()
      .then(res.status(200).send(book))
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
// exports.createBook = (req, res) => {
//   books.findOne({ userId: req.params.userId }, async (err, user) => {

//     if (user) {
//       return res.status(400).send("sorry but you already published your book");
//     }
//     try {
//     const book = await new books({
//       bookName: req.body.bookName,
//       author: req.body.author,
//       description: req.body.description,
//       dateOfPuplish: Date.now(),
//       puplisherName: req.body.userName,
//       userId : req.body.userId,
//     });

//     book
//       .save()
//       .then(res.status(200).send(book))
//     } catch (error) {
//       res.status(500).send("err => err");
//     }
//       // .catch((err) => {
//       //   res.status(500).send(err);
//       // });
//   });
// };

exports.getAllBooks = (req, res) => {
  books
    .find({})
    .limit(10)
    .then((book) => res.status(200).send(book))
    .catch((err) => res.status(500).send(err));
};

exports.displayBookByName = (req, res) => {
  books.find({ bookName: req.body.bookName }, (err, book) => {
    if (err) {
      res.status(500).send("there is error, pleare try later");
    }
    if (!book) {
      res.status(400).send("sorry but there is not a bookName with that name");
    }
    res.status(200).send(book);
  });
  // .then((Book) => {
  //   if (Book) {
  //     res.send(Book);
  //   } else {
  //     res.send("Wrong Book Name");
  //   }
  // })
  // .catch((err) => res.send(err));
};

exports.editBook = (req, res) => {
  books
    .updateOne(
      { userId: req.params.userId },
      {
        $set: {
          bookName: req.body.bookName,
          author: req.body.author,
          description: req.body.description,
        },
      }
    )
    .then((Book) => {
      res.status(200).send(Book);
    })
    .catch((err) => res.send(err));
};
exports.deleteBook = (req, res) => {
  books.findOneAndDelete({ userId: req.params.userId }).then((Book) => {
    if (!Book) {
      return res.status(400).send("incorrect user id");
    }
    res.status(201).send("deleted successfully");
  });
};
