import express, { Request, Response } from "express"
import CheckoutRepository from "../../modules/checkout/repository/checkout.repository"
import PlaceOrderUseCase from "../../modules/checkout/usecase/place-order/place-order.usecase"
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/facade.factory"
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory"
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory"
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory"
import StoreCatalogFacadeFactory from "../../modules/store-adm/factory/facade.factory"

export const checkoutRoute = express.Router()

checkoutRoute.post("/", async (req: Request, res: Response) => {

    const clientFacade = ClientAdmFacadeFactory.create()
    const productFacade = ProductAdmFacadeFactory.create()
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    const checkoutRepository = new CheckoutRepository()
    const invoiceFacade = InvoiceFacadeFactory.create()
    const paymentFacade = PaymentFacadeFactory.create()

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        storeCatalogFacade,
        checkoutRepository,
        invoiceFacade,
        paymentFacade
    )

    try {
        const checkoutDto = {
            clientId: req.body.clientId,
            products: req.body.products
        }
        const output = await usecase.execute(checkoutDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
});