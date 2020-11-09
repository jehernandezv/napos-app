const productsCtrl = {};

const pool = require('../database');

productsCtrl.renderAddProduct = (req, res) => {
    res.render('products/add');
};

productsCtrl.addProduct = async (req, res, done) => {
    const { reference, category, cant, value_neto, value_transport, profit, description } = req.body;
    const newProduct = {
        reference,
        category,
        cant,
        value_neto,
        value_transport,
        profit,
        description,
        user_id: req.user.id
    };
    console.log(newProduct);

    const rows = await pool.query('SELECT * FROM products WHERE reference  = ?',[reference]);

    if(rows.length >= 1){
        done(null, false, req.flash('message','Error!,  ya existe una referencia de producto con ese nombre'));
        res.redirect('/products/add');
    }else{
        await pool.query('INSERT INTO products set ?', [newProduct]);
        req.flash('success', 'Producto Guardado Satisfactoriamente');
        res.redirect('/products');
    }
    
}

productsCtrl.renderProducts = async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.render('products/list', { products });
}

productsCtrl.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/products');
};

productsCtrl.renderEditProduct = async (req, res) => {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    console.log(product);
    res.render('products/edit', {product: product[0]});
};

productsCtrl.editProduct = async (req,res) => {
    const { id } = req.params;
    const { reference, category, cant, value_neto, value_tansport, description} = req.body; 
    const newLink = {
        reference,
        category,
        cant,
        value_neto,
        value_tansport,
        description
    };
    await pool.query('UPDATE products set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Producto Actualizado Satisfactoriamente');
    res.redirect('/products');
}


module.exports = productsCtrl;