import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import ClientModel from "./client.model";
import ProductModel from "./product.model";

@Table({
    tableName: "orders",
    timestamps: false,
})

export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    client_id: string

    @BelongsTo(() => ClientModel)
    client: ClientModel;

    @HasMany(() => ProductModel)
    products: ProductModel[];

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    total: number;
}