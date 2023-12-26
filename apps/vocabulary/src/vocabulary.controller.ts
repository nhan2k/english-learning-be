import { Controller, Get } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateVocabularyDto } from '@app/common/Vocabulary/dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from '@app/common/Vocabulary/dto/update-vocabulary.dto';
import { VocabularyDocument } from '@app/common/Vocabulary/entities/vocabulary.model';

@Controller()
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @MessagePattern('createVocabulary')
  async createVocabulary(
    @Payload() createDto: CreateVocabularyDto,
  ): Promise<VocabularyDocument> {
    return this.vocabularyService.createVocabulary(createDto);
  }

  @MessagePattern('getVocabulary')
  async getVocabulary(
    @Payload('word') word: string,
  ): Promise<VocabularyDocument | null> {
    return this.vocabularyService.getVocabulary(word);
  }

  @MessagePattern('getAllVocabulary')
  async getAllVocabulary(): Promise<VocabularyDocument[]> {
    return this.vocabularyService.getAllVocabulary();
  }

  @MessagePattern('updateVocabulary')
  async updateVocabulary(
    @Payload('word') word: string,
    @Payload() updateDto: UpdateVocabularyDto,
  ): Promise<VocabularyDocument | null> {
    return this.vocabularyService.updateVocabulary(word, updateDto);
  }

  @MessagePattern('deleteVocabulary')
  async deleteVocabulary(
    @Payload('word') word: string,
  ): Promise<VocabularyDocument | null> {
    return this.vocabularyService.deleteVocabulary(word);
  }
}
