import { Table, Model, PrimaryKey, Column, HasMany } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    tableName: "clients",
    timestamps: false,
})

export default class ClientModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    address: string;

    @HasMany(() => OrderModel)
    orders: OrderModel[];
}