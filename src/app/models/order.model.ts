import { Customer } from './customer.model';
import { Technical } from './technical.model';

export class Order {

    constructor(
        public creationDate: Date,
        public executionDate: Date,
        public dayOfService: number,
        public theoryDescription: string,
        public user: string,
        public customer: Customer,
        public technical: Technical,
        public realDescription?: string,
        public technicalObservation?: string,
        public customerObservation?: string,
        public ammount?: number,
        public status?: string,
        public id?: string
    ) {}
}
