const books = require("../model/book.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// {"role": { $ne: 'Super Admin' }
// exports.createBook = (req, res) => {
//   const authHeader = req.headers.token;
//   jwt.verify(authHeader, "userToken", (err, data) => {
//     if (data) {
//   books.findOne({$or: [ { bookName: req.body.bookName }, {author: req.body.author }]}, (err,book) => {
//     if(book){
//         return res.send("sorry this book or author already exist")
//     }
//     book = new books({
//     bookName: req.body.bookName,
//     author: req.body.author,
//     description: req.body.description,
//     dateOfPuplish: Date.now(),
//     puplisherName: req.body.puplisherName,

//   });

//   book
//     .save()
//     .then(res.send(book))
//     .catch((err) => {
//       res.send(err.message);
//     });
// }

// )}});
// };

exports.createBook = (req, res) => {
  books.findOne({ userId: req.params.userId }, (err, book) => {
     
    if (book) {
      return res.status(400).send("sorry but you already published your book");
    }
     book =  new books({
      bookName: req.body.bookName,
      author: req.body.author,
      description: req.body.description,
      dateOfPuplish: Date.now(),
      puplisherName: req.body.userName,
      userId : req.params.userId,
    });

    book
      .save()
      .then(res.status(200).send(book))
      .catch((err) => {
        res.status(500).send(err);
      });
})};
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
      { $set:  req.body  }
    )  
    .then((Book) => {    
        res.status(200).send(Book);
    })
    .catch((err) => res.send(err));
};
exports.deleteBook = (req, res) => {
  books.findOneAndDelete(
    {userId : req.params.userId})
    .then((Book)=>{
      if (!Book) {
        return res.status(400).send("incorrect user id");
      }
      res.status(201).send("deleted successfully")

    })}
    // (err, book) => {
    //   // )}});
     
      // res.send("deleted successfully");
    // }
// exports.createBook = (req, res) => {
//   const authHeader = req.headers.token;
//   jwt.verify(authHeader, "userToken", (err, data) => {
//     if (data) {
//       const newBook = new book({
//         bookName: req.body.bookName,
//         author: req.body.author,
//         description: req.body.description,
//         dateOfPuplish: Date.now(),
//         puplisherName: data.username,
//       });
//       newBook
//         .save()
//         .then((book) => res.send(book))
//         .catch((err) => res.send(err.message));
//     } else {
//       res.send("You cannot create books");
//     }
//   });
// };

// exports.editBook = (req, res) => {
//   const authHeader = req.headers.token;
//   jwt.verify(authHeader, "userToken", (err, data) => {
//     if (data) {
//       book
//         .findOne({ _id: req.params.id })
//         .then((Book) => {
//           if (data.username === Book.puplisherName || data.type == "admin") {
//             Book.bookName = req.body.bookName;
//             Book.author = req.body.author;
//             Book.description = req.body.description;
//             Book.save()
//               .then((result) => res.send(result))
//               .catch((err) => res.send(err.message));
//           } else {
//             res.send("You cant edit this book");
//           }
//         })

//         .catch((err) => res.send("Wrong id"));
//     }

//     else {
//       res.send(err.message);
//     }
//   });
// };

// exports.deleteBook = (req, res) => {
//   const authHeader = req.headers.token;
//   jwt.verify(authHeader, "userToken", (err, data) => {
//     if (data) {
//       book
//         .findOne({ _id: req.params.id })
//         .then((Book) => {
//           if (data.username === Book.puplisherName || data.type == "admin") {
//             book
//               .deleteOne({ _id: req.params.id })
//               .then((result) => res.send(result))
//               .catch((err) => res.send(err.message));
//           } else {
//             res.send("You cant delete this book");
//           }
//         })
//         .catch((err) => res.send("Wrong id"));
//     } else {
//       res.send("You should login first");
//     }
//   });
// };
// exports.getAllBooks = (req, res) => {
//   book
//     .find()
//     .then((Books) => res.send(Books))
//     .catch((err) => res.send(err));
// };

// exports.displayBookByName = (req, res) => {
//   book
//     .findOne({ bookName: req.body.bookName })
//     .then((Book) => {
//       if (Book) {
//         res.send(Book);
//       } else {
//         res.send("Wrong Book Name");
//       }
//     })
//     .catch((err) => res.send(err.message));
// };
// exports.displayBook = (req, res) => {
//   book
//     .find({})
//     .limit(10)
//     .skip((+req.params.pageNum - 1) * 10)
//     .exec((err, data) => {
//       if (data.length > 0) {
//         res.send(data);
//       } else {
//         res.send("thers no book in this page");
//       }
//       if (err) {
//         res.send(err.message);
//       }
//     });
// };
