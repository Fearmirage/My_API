import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

@Injectable()
export class SalesService {
    private sales: any[];

    constructor() {
        const filePath = join(
            process.cwd(),
            'data',
            'vgsales.csv',
        );
        const file = readFileSync(filePath, 'utf-8');
        this.sales = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
    }

    findAll() {
        return this.sales;
    }

    findOne(rank: number) {
        return this.sales.find(
        (sales) => sales.rank === rank,
        );
    }
}
