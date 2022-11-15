import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    modelName: "order-product",
    tableName: "order-products",
    timestamps: false,
})

export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    salesPrice: number;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    productId: string

    @BelongsTo(() => OrderModel)
    client: OrderModel;
}