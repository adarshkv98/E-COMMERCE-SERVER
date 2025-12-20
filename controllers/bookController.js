import Book from "../models/bookModel";

//CREATE BOOK//



export const createBook = async (req , res)=>{
    try {
        
const book = new Book(req.body);
await book.save();

res.status(201).json({
    message:"book created successfully",
    book,
});
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
        
    }
};

//GET ALL BOOKS///

export  const getAllBooks = async (req , res)=>{
    try {
        const books = await Book.find();

        res.status(200).json({
            message:books,
        });
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
        
    }
};


//GET BOOK BY ID//


export const getSingleBook = async (req , res)=>{
    try {
       
      const book = await Book.findById(req.params.id);
      
      
      if (!book){
        return res.status(404).json({
            message:"book not found",
        });
      }
      res.status(200).json({
    message:book,
      });

    } catch (error) {
        res.status(400).json({
            message:"invalid book",
            erroor:error.message,
        });
        
    }
};

//UPDATE  BOOK///

export const updateBook = async(req , res)=>{
try {
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json({
        message:updatedBook,
    });
} catch (error) {
    res.status(400).json({
        message:"updation failed",
        error:error .message
    });
}

};



//DELETE BOOK//

export const deleteBoook =async(req , res)=>{
    try {
await Book.findByIdAndDelete(req.params.id)
res.status(200).json({
    message:"delete successfully",
    error:error.message,
});
    
    } catch (error) {
        res.status(500).json({
            message:"delete failed",
            error:error.message,
        });
    }
}