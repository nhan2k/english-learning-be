import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';

describe('VocabularyController', () => {
  let vocabularyController: VocabularyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyController],
      providers: [VocabularyService],
    }).compile();

    vocabularyController = app.get<VocabularyController>(VocabularyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vocabularyController.getHello()).toBe('Hello World!');
    });
  });
});
