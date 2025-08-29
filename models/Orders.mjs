import connection from "../db/connect.mjs"; 
import Products from "./Products.mjs";
class Orders{
    static async createOrder(user_id,shipping_address, payment_method,itemsId){
  
      try {

        let totalAmount = 0;
        let items=[];
        for (let i of itemsId) {
         
          let it =await Products.getById(i.id);
          let item=it[0];
         
          totalAmount += (parseInt(item.current_price) * parseInt(i.quantity));
        
          items.push({
            product_id:item.product_id,
            quantity:i.quantity,
            current_price:item.current_price
          })
        }

        
        const [orderResult] = await connection.query(
          `insert into orders (user_id, shipping_address, payment_method, total_amount) 
           values (?,?,?,?)`,[user_id ,shipping_address,payment_method,totalAmount] 
        );  
        console.log('Placed an order in the db');

        const orderId = orderResult.insertId;

        for (let item of items) {
          await connection.query(
            `insert into order_items (product_id, order_id, quantity) 
             values(?,?,?)`,[item.product_id, orderId, item.quantity],
          );
        }
        return orderId;
      } catch (error) {
       return error;
      }

    }
    static async getOrderById(userId){
    // const q = `
    //     SELECT 
    //         o.order_id, o.order_date, o.order_status, o.shipping_address, o.payment_method, o.total_amount,
    //         oi.order_item_id, oi.product_id, oi.quantity,
    //         p.product_name, p.description, p.current_price, p.image_url
    //     FROM orders o
    //     JOIN order_items oi ON o.order_id = oi.order_id
    //     JOIN products p ON oi.product_id = p.product_id
    //     WHERE o.user_id = ?;
    // `;
   
    const q= `Select * from orders where user_id =?;`
    const [res] = await connection.query(q,[userId]);
   
    return res;

    }
   static async deleteOrderById(orderId){
   
    let res=connection.query("delete from orders where order_id = ?", [orderId]);
    return res; 

   }
   static async updateOrderById(orderId,status){
 
        let res=await connection.query(`Update orders set order_status =? where order_id=?`,[status,orderId]);
        return res;
   }
}
export default Orders;
 /*
  order_id INT PRIMARY KEY AUTO_INCREMENT,  
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT NOW(),
    order_status ENUM("pending", "processing", "shipped", "delivered", "cancelled") DEFAULT "pending",
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 */

/*
order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
)
*/