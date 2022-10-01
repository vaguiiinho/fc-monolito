import express, { Request, Response } from "express";
import InvoiceRepository from "../../modules/invoice/repository/invoice.repository";
import GenerateInvoiceUsecase from "../../modules/invoice/usecase/generate/generate.invoice.usecase";
import FindInvoiceUsecase from "../../modules/invoice/usecase/find/find.invoice.usecase";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new GenerateInvoiceUsecase(new InvoiceRepository());
    try {
        const invoicetDto = {
            id: req.body.id,
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items
        }
        const output = await usecase.execute(invoicetDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindInvoiceUsecase(new InvoiceRepository());
    try {
        const output = await usecase.execute({ id: req.params.id });
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
});