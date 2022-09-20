import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import orderEntity from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: orderEntity): Promise<void> {
        await OrderModel.create(
            {
                id: order.id.id,
                client: {
                    id: order.client.id.id,
                    name: order.client.name,
                    email: order.client.email,
                    address: order.client.address
                },
                products: order.products.map(p => {
                    return {
                        id: p.id.id,
                        name: p.name,
                        description: p.description,
                        salesPrice: p.salesPrice,
                    }
                }),
                status: order.status,
                total: order.total
            },
            {
                include: [ClientModel, ProductModel]
            }
        )
    }
    async findOrder(id: string): Promise<orderEntity> {
        const order = await OrderModel.findOne({
            where: { id: "1" },
            include: [ProductModel, ClientModel],
        })
        return new orderEntity({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.client.id),
                name: order.client.name,
                email: order.client.email,
                address: order.client.address
            }),
            products: order.products.map(p => {
                return new Product({
                    id: new Id(p.id),
                    name: p.name,
                    description: p.description,
                    salesPrice: p.salesPrice
                })
            })
        })
    }


}