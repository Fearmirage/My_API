import {
    Controller,
    Get,
    Post,
    Param,
    Query,
    Body,
} from '@nestjs/common';

import { SalesService } from './sales.service.js'; //.ts becomes .js locally when ran

@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService,
    ) {}

    @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) { // Here, ? means the parameter is optional
        return this.salesService.findAll(
            page ? Number(page): 1, // Here, ? here is a compact if/else
            limit ? Number(limit): 20 // if limit exists/is truthy, use Number(limit). Else, use 20
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(Number(id));
    }

    @Post()
    addSale(@Body() sale:any){
        return this.salesService.addSale(sale)
    }
}
