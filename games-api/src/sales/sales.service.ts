import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SalesService {
    private sales: any[];

    constructor() {
        const filePath = join(
            process.cwd(),
            'data',
            'vgsales.json',
        );

        const file = readFileSync(filePath, 'utf-8');
        this.sales = JSON.parse(file);

    }

    findAll() {
        return this.sales;
    }

    findOne(id: number) {
        return this.sales.find(
            (sales) => sales.id === id,
        );
    }
}
