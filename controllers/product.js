const db = require("../database");

exports.addProduct = async (req, res) => {
  const { name, price, image, catagory } = req.body;
  console.log(req.body, "k");
  await db.query(
    `INSERT INTO product SET ? `,
    { name, price, image, catagory },
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Product add fail",
        });
      } else {
        console.log(results);
        res.json({
          message: "Product added successfully",
          results: results.insertId,
        });
      }
    }
  );
};
exports.getProducts = (req, res) => {
  db.query(`SELECT * FROM product`, (err, results) => {
    if (err) {
      res.json({
        message: "Product get fail",
      });
    } else {
      res.json(results);
    }
  });
};

exports.deleteProduct = (req, res) => {
  const { name, price, image } = req.body;
  db.query(
    "DELETE FROM product WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.json({
          message: "Product delete fail",
        });
      } else {
        res.json({
          message: "Product deleted successfully",
        });
      }
    }
  );
};

exports.getProduct = (req, res) => {
  db.query(
    `SELECT * FROM product WHERE id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) {
        res.json({
          message: "Product get fail",
        });
      } else {
        res.json(results);
      }
    }
  );
};
exports.updateProduct = (req, res) => {
  const { name, price, image, catagory } = req.body;
  console.log(name, price, image);
  db.query(
    `UPDATE product  SET ? WHERE id = ${req.params.id}`,
    { name, price, image, catagory },
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Product update fail",
        });
      } else {
        console.log(results),
          res.json({
            message: "Product updated successfully",
          });
      }
    }
  );
};

exports.getCatagory = (req, res) => {
  db.query(`SELECT * FROM catagory`, (err, results) => {
    if (err) {
      res.json({
        message: "Catagory get fail",
      });
    } else {
      res.json(results);
    }
  });
};
exports.putCatagory = (req, res) => {
  const { catagory, productId } = req.body;
  console.log(catagory, productId);
  db.query(
    `UPDATE put SET ? WHERE  catagoryID = ${catagory}`,
    { ProductID: productId },
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Catagory update fail",
        });
      } else {
        res.json({
          message: "Catagory updated successfully",
        });
      }
    }
  );
};

exports.productCatagory = (req, res) => {
  db.query(
    `SELECT * FROM product WHERE catagory = ${req.params.catagory}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Catagory get fail",
        });
      } else {
        res.json(results);
      }
    }
  );
};

//user

exports.addUser = (req, res) => {
  const { email } = req.body;
  db.query(`INSERT INTO user SET ? `, { email }, (err, results) => {
    if (err) {
      console.log(err);
      res.json({
        message: "User add fail",
      });
    } else {
      console.log(results);
      res.json({
        message: "User added successfully",
        results: results.insertId,
      });
    }
  });
};

exports.getUser = (req, res) => {
  const { email } = req.params;
// const email = "aravindhabii27@gmail.com"
  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, results) => {
    if (err) {
      res.json({
        message: "User get fail",
      });
    } else {
        console.log(results[0].id);
        res.json(results[0].id);
    }
  });
};




exports.addCart = (req, res) => {
    const { userId,products,count  } = req.body;
    db.query(`INSERT INTO cart SET ? `, {products, orderBy: userId,carttotal: count}, (err, results) => {
        if (err) {
            console.log(err);
            res.json({
            message: "Cart add fail",
            });
        } else {
            console.log(results);
            res.json({
            message: "Product added to cart",
            results: results,
            });
        }


    })
};

exports.getCart = (req, res) => {
    db.query(`SELECT * FROM cart WHERE orderBy = ?`, [req.params.userId], (err, results) => {
        if (err) {
            res.json({
            message: "Cart get fail",
            });
        } else {
            res.json(results);
        }
    })

}


exports.updateCart = (req, res) => {
  const { userId,products,count  } = req.body;
  db.query(`UPDATE cart SET ? WHERE orderBy = ${userId}`,{products,carttotal: count},(err,results)=> {


    if(err){
      console.log(err);
      res.json({
          message:"Cart add fail"
      })

    } else {
      res.json({
        message: "Product added to cart",
        results: results,
        });
    }
  })
}