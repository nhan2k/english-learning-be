import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VocabularyDocument,
  Phonetic,
  Meaning,
  Definition,
} from '../../../libs/common/src/Vocabulary/entities/vocabulary.model';
import { CreateVocabularyDto } from '../../../libs/common/src/Vocabulary/dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from '../../../libs/common/src/Vocabulary/dto/update-vocabulary.dto';
import { ExceptionHandlerUtilService } from '@app/common/exceptions/exceptions.service';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel('Vocabulary')
    private readonly vocabularyModel: Model<VocabularyDocument>,
    private readonly exceptionHandlerUtilService: ExceptionHandlerUtilService,
  ) {}

  async createVocabulary(
    createDto: CreateVocabularyDto,
  ): Promise<VocabularyDocument> {
    try {
      const { word, phonetic, phonetics, origin, meanings } = createDto;
      const newVocabulary = new this.vocabularyModel({
        word,
        phonetic,
        phonetics,
        origin,
        meanings,
      });
      return newVocabulary.save();
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }

  async getVocabulary(word: string): Promise<VocabularyDocument | null> {
    try {
      return this.vocabularyModel.findOne({ word }).exec();
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }

  async getAllVocabulary(): Promise<VocabularyDocument[]> {
    try {
      return this.vocabularyModel.find().exec();
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }

  async updateVocabulary(
    word: string,
    updateDto: UpdateVocabularyDto,
  ): Promise<VocabularyDocument | null> {
    try {
      return this.vocabularyModel
        .findOneAndUpdate({ word }, updateDto, {
          new: true,
        })
        .exec();
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }

  async deleteVocabulary(word: string): Promise<VocabularyDocument | null> {
    try {
      return this.vocabularyModel.findOneAndDelete({ word }).exec();
    } catch (error: unknown) {
      this.exceptionHandlerUtilService.handleException(
        error,
        this.constructor.name,
      );
      throw new Error(this.constructor.name);
    }
  }
}
