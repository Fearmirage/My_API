import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
} from '@nestjs/common';

import { SalesService } from './sales.service.js'; //.ts becomes .js locally when ran
import { CreateGameDto } from './dto/create-game.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

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

    @UseGuards(AuthGuard)
    @Post()
    addSale(@Body() sale: CreateGameDto){ //! The CreateGameDto format is expected but not enforced
        return this.salesService.addSale(sale)
    }

    @UseGuards(AuthGuard)
    @Patch(':rank')
    update(@Param('rank') rank: string, @Body() updated_game: CreateGameDto){
        return this.salesService.update(Number(rank),updated_game)
    }

    @UseGuards(AuthGuard)
    @Delete(':rank')
    delete(@Param('rank') rank: string) {
        return this.salesService.delete(Number(rank))
    }
}
