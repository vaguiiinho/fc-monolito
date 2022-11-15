import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "store_product",
    tableName: "store-products",
    timestamps: false,
})
export class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    salesPrice: number;
}