import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

import { RedisService } from '../redis/redis.service.js';

@Injectable()
export class SalesService {
    private sales: any[];

    constructor(private readonly redisService: RedisService) {
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

    async findAll(page: number = 1,limit: number = 20) {
        limit = Math.min(limit,20) //max 20 elements per page
        const total = this.sales.length;
        const totalPages = Math.ceil(total/limit);
        //Math.ceil(number) returns smallest integer greater than or equal to given number
        //Prevent invalid page numbers
        if (page < 1){
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        };
        const cacheKey = `sales:page:${page},limit:${limit}`;
        //check if redis has the data already
        const cachedResult = await this.redisService.get(cacheKey);
        if (cachedResult){
            console.log("cache info")
            return JSON.parse(cachedResult) // return result in the expected format
        };
        //Not cached, so find it in the data directly
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = this.sales.slice(start, end);
        const result = {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        };
        await this.redisService.set(
            cacheKey, JSON.stringify(result), 60
        );
        console.log("created cache");
        return result;
    }

    async findOne(rank: number) { //async allows asynchronous operations with Redis
        const cacheKey = `sales:${rank}`; // called a template litteral, made using the backtics (`) : allows ${rank} syntax
        //check if redis has the data already
        const cachedResult = await this.redisService.get(cacheKey)
        if (cachedResult){
            console.log("cache info");
            return JSON.parse(cachedResult); // return result in the expected format
        }

        //Not cached, so find it in the data directly
        let result = this.sales.find(
            (sale) => Number(sale.Rank) === rank
        );
        if(!result){
            return undefined; // avoids caching undefined
        }
        //cache the newly obtained result
        await this.redisService.set(
            cacheKey, JSON.stringify(result), 60
        );
        console.log("created cache");
        return result;
    }

    async addSale(sale: any){
        this.sales.push(sale);
        await this.redisService.flushAll(); //data updated -> reset outdated cache
        return sale;
    }

    async update(rank: number, updatedGame: any) {
        const index = this.sales.findIndex(
            (sale) => Number(sale.Rank) === rank,
        );
        if (index === -1) { return undefined };

        this.sales[index] = {
            ...this.sales[index], ...updatedGame
            // '...' is the spread operator
        };
        await this.redisService.flushAll(); //data updated -> reset outdated cache
        return this.sales[index];
    }

    async delete(rank: number){
        const index = this.sales.findIndex(
            (sale) => Number(sale.Rank) === rank,
        );
        if (index === -1) { return undefined };

        const deletedGame = this.sales[index];
        this.sales.splice(index, 1); //Removes one element starting from index

        await this.redisService.flushAll(); //data updated -> reset outdated cache
        return deletedGame;
    }
}
