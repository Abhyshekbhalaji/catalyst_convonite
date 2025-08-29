import connection from "../db/connect.mjs"
class Products{
    static async getAll(){
  
   let res= await connection.query('Select * from products')
        return res;
    }
    static async addProduct(product_name, description ,current_price,image_url=null){
       let res = await connection.query(
    `INSERT INTO products (product_name, description, current_price, image_url) VALUES (?, ?, ?, ?)`,
    [product_name, description, current_price, image_url || null]
);
return res;
               
    }

    static async getById(id){
    
    let [res]=await connection.query(`Select * from products where product_id =${id};`)
    return res[0];
    }
}

export default Products;
