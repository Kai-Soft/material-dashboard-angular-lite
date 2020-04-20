import { Customer } from './customer.model';
import { Technical } from './technical.model';

export class BussinessPartner {

    constructor(
        public firstName: string,
        public lastName: string,
        public nit: string,
        public direction?: string,
        public telephone?: number,
        public status?: string,
        public id?: string,
        public customer?: Customer,
        public technical?: Technical
    ) { }

}
