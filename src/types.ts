export interface Book {
  audio_file: string
  collectionId: string
  collectionName: string
  created: string
  description: string
  easy_level_text: string
  grade: number
  hard_level_text: string
  id: string
  img: string
  intermediate_level_text: string
  title: string
  updated: string
  word_markup: string
}

export interface Review {
  book: string
  collectionId: string
  collectionName: string
  created: string
  id: string
  name: string
  review: string
  updated: string
}

export interface Student {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  name: string
  grade: number
  division: string
  score: number
  quotient: number
  depressed: boolean
}

export interface Message {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  text: string
  from: string
  student: string
}

export interface Result {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  score: number
  place: string
  time: string
  response: string
  contribution: string
  teacher: string
  safe: string,
  student_name: string
}
