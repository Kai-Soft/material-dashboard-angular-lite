import { BussinessPartner } from './bussiness-partner.model';

export class Customer {

    constructor(
    public customerIdCompany: string,
    public bussinessPartner: BussinessPartner,
    public status?: string,
    public id?: string
    ) {}

}
