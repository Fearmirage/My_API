import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Query,
    Body,
} from '@nestjs/common';

import { SalesService } from './sales.service.js'; //.ts becomes .js locally when ran
import { CreateGameDto } from './dto/create-game.dto.js';

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

    @Get(':rank')
    findOne(@Param('rank') rank: string) {
        return this.salesService.findOne(Number(rank));
    }

    @Post()
    addSale(@Body() sale: CreateGameDto){ //! The CreateGameDto format is expected but not enforced
        return this.salesService.addSale(sale)
    }

    @Patch(':rank')
    update(@Param('rank') rank: string, @Body() updated_game: CreateGameDto){
        return this.salesService.update(Number(rank),updated_game)
    }
}
