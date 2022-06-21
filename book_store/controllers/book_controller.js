const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
    } catch (err){
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({message:"No books found"});
    }
    return res.status(200).json({ books });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
        let book;
        try{
            book = await Book.findById(id);
        } catch (err) {
            console.log(err);    
        }
        if (!book) {
            return res.status(404).json({message:"No book found"});
        }
        return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
    const { name, author, description, pages, status, image} = req.body; 
    let book;
    try{
        book = new Book({
            // name: req.body.name or we can also do it buy calling all this is in const 
            name, // like this
            author,
            description,
            pages,
            status,
            image,
        });
        await book.save();
    } catch (err) {
      console.log(err);
      }

    if(!book) {
        return res.status(500).json({message:"Unable to add book"})
    }
    return res.status(201).json({ book });
};


const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, pages, status, image} = req.body; 
    let book;
    try{
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            pages,
            status,
            image
        });
        book = await book.save();
    } catch (err) {
      console.log(err);
      }

    if(!book) {
        return res.status(404).json({message:"Unable to update book"})
    }
    return res.status(200).json({ book });
};



const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try{
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
      }

    if(!book) {
        return res.status(404).json({message:"Unable to delete book"})
    }
    return res.status(200).json({message: "book deleted" });
};



exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
