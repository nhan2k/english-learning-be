import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from '@app/common/Vocabulary/dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from '@app/common/Vocabulary/dto/update-vocabulary.dto';
import { ExceptionHandlerUtilService } from '@app/common/exceptions/exceptions.service';

@Controller('vocabulary')
export class VocabularyController {
  constructor(
    private readonly vocabularyService: VocabularyService,
    private readonly exceptionHandlerUtilService: ExceptionHandlerUtilService,
  ) {}

  @Post()
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    try {
      return this.vocabularyService.create(createVocabularyDto);
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }

  @Get()
  findAll() {
    return this.vocabularyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocabularyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    return this.vocabularyService.update(+id, updateVocabularyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabularyService.remove(+id);
  }
}
