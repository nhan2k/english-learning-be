import { Schema, model, Document } from 'mongoose';

export interface Phonetic {
  text: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface VocabularyDocument extends Document {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

const DefinitionSchema = new Schema<Definition>({
  definition: { type: String, required: true },
  example: { type: String, required: true },
  synonyms: { type: [String], default: [] },
  antonyms: { type: [String], default: [] },
});

const MeaningSchema = new Schema<Meaning>({
  partOfSpeech: { type: String, required: true },
  definitions: { type: [DefinitionSchema], default: [] },
});

const VocabularySchema = new Schema<VocabularyDocument>({
  word: { type: String, required: true, unique: true },
  phonetic: { type: String, required: true },
  phonetics: { type: [{ text: String, audio: String }], default: [] },
  origin: { type: String, default: '' },
  meanings: { type: [MeaningSchema], default: [] },
});

const VocabularyModel = model<VocabularyDocument>(
  'Vocabulary',
  VocabularySchema,
);

export default VocabularyModel;
