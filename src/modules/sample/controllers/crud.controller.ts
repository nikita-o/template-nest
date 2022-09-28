import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CrudService } from '../providers/crud.service';
import { CreateDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('crud')
@Controller('crud')
export class CrudController {
  constructor(private crud: CrudService) {}

  @Get(':id')
  public async read(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.crud.read(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }
    return result;
  }

  @Post()
  public async create(@Body() body: CreateDto): Promise<{ id: number }> {
    const result = await this.crud.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }
    return { id: result.id };
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
  ): Promise<{ success: boolean }> {
    const result = await this.crud.update(id, body);
    return { success: !!result.affected };
  }

  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.crud.remove(id);
    return { success: !!result.affected };
  }
}
