import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';

import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService,
    ) {}

    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(Number(id));
    }
}
