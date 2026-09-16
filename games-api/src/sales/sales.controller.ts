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
import {
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { SalesService } from './sales.service.js'; //.ts becomes .js locally when ran
import { CreateGameDto } from './dto/create-game.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService,
    ) {}

    @ApiQuery({ // Metadata for Swagger
        name: 'page',
        required: false,
        type: Number,
        example: 1,
    })
    @ApiQuery({ // Metadata for Swagger
        name: 'limit',
        required: false,
        type: Number,
        example: 20,
    })
    @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) { // Here, ? means the parameter is optional
        return this.salesService.findAll(
            page ? Number(page): 1, // Here, ? here is a compact if/else
            limit ? Number(limit): 20 // if limit exists/is truthy, use Number(limit). Else, use 20
        );
    }

    @ApiParam({ // Metadata for Swagger
        name: 'rank',
        type: Number,
        example: 1,
    })
    @Get(':rank')
    findOne(@Param('rank') rank: string) {
        return this.salesService.findOne(Number(rank));
    }

    @ApiBearerAuth() //Metadata for swagger, that allows it to recognize the Bearer Authentication that protects this route.
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
            Rank: {
                type: 'number',
                example: 16601,
            },
            Name: {
                type: 'string',
                example: 'Example Game',
            },
            Platform: {
                type: 'string',
                example: 'PS5',
            },
            Year: {
                type: 'number',
                example: 2025,
            },
            Genre: {
                type: 'string',
                example: 'Action',
            },
            Publisher: {
                type: 'string',
                example: 'Example Publisher',
            },
            NA_Sales: {
                type: 'number',
                example: 1.5,
            },
            EU_Sales: {
                type: 'number',
                example: 1.2,
            },
            JP_Sales: {
                type: 'number',
                example: 0.5,
            },
            Other_Sales: {
                type: 'number',
                example: 0.3,
            },
            Global_Sales: {
                type: 'number',
                example: 3.5,
            },
            },
        },
    })
    @UseGuards(AuthGuard)
    @Post()
    addSale(@Body() sale: CreateGameDto){ //! The CreateGameDto format is expected but not enforced
        return this.salesService.addSale(sale)
    }

    @ApiBearerAuth() //Metadata for swagger, that allows it to recognize the Bearer Authentication that protects this route.
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
            Name: {
                type: 'string',
                example: 'Updated Game Name',
            },
            Genre: {
                type: 'string',
                example: 'Update Genre',
            },
            Publisher: {
                type: 'string',
                example: 'Updated Publisher',
            },
            },
        },
    })
    @UseGuards(AuthGuard)
    @Patch(':rank')
    update(@Param('rank') rank: string, @Body() updated_game: CreateGameDto){
        return this.salesService.update(Number(rank),updated_game)
    }

    @ApiBearerAuth() //Metadata for swagger, that allows it to recognize the Bearer Authentication that protects this route.
    @UseGuards(AuthGuard)
    @Delete(':rank')
    delete(@Param('rank') rank: string) {
        return this.salesService.delete(Number(rank))
    }
}
