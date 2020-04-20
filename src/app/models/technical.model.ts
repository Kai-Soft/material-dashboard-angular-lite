import { BussinessPartner } from './bussiness-partner.model';

export class Technical {

    constructor(
        public technicalIdCompany: string,
        public bussinessPartner: BussinessPartner,
        public status?: string,
        public id?: string
    ) { }

}
