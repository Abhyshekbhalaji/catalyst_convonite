import express from 'express';
import { decodeMiddleware } from '../middleware/decodeTokenMiddleware.mjs';
import { getOrder, placeOrder } from '../controllers/userController.mjs';

const router= express.Router(); 

/*expects something like {
shipping_address,
payment_method.
items:[
{
id,
quantity
}
]
}
*/
router.post('/orders',decodeMiddleware,placeOrder);
router.get('/orders',decodeMiddleware,getOrder);

export default router;