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

    findAll(page: number = 1,limit: number = 20) {
        limit = Math.min(limit,20) //max 20 elements per page
        const total = this.sales.length;
        const total_pages = Math.ceil(total/limit);
        //Math.ceil(number) returns smallest integer greater than or equal to given number
        //Prevent invalid page numbers
        if (page < 1){
            page = 1
        } else if (page > total_pages) {
            page = total_pages
        };
        const start = (page - 1) * limit;
        const end = start + limit;

        const data = this.sales.slice(start, end);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                total_pages
            }
        };
    }

    findOne(rank: number) {
        return this.sales.find(
        (sales) => sales.rank === rank,
        );
    }
}
