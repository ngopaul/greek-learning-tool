import React, { ReactNode } from "react";
import SimpleTable, { TableDataType } from "../components/SimpleTable";

const chapter2_1 : TableDataType = [
  {title: 'Present Indicative -ω verbs: Active Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ω', col3: '', col4: '-ομεν'},
  {col1: '2nd', col2: '-εις', col3: '', col4: '-ετε'},
  {col1: '3rd', col2: '-ει', col3: '', col4: '-ουσιν'},
  {col1: 'Infinitive', col2: '', col3: '-ειν', col4: ''}
];

const chapter2_2 : TableDataType = [
  {title: 'Present Indicative -ω verbs: Middle/Passive Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ομαι', col3: '', col4: '-όμεθα'},
  {col1: '2nd', col2: '-ει/-ῃ', col3: '', col4: '-εσθε'},
  {col1: '3rd', col2: '-εται', col3: '', col4: '-ονται'},
  {col1: 'Infinitive', col2: '', col3: '-εσθαι', col4: ''}
]

const chapter2_3 : TableDataType = [
  {title: 'εἰμὶ Present Active Indicative'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: 'εἰμὶ', col3: '', col4: 'ἐσμέν'},
  {col1: '2nd', col2: 'εἶ', col3: '', col4: 'ἐστέ'},
  {col1: '3rd', col2: 'ἐστί(ν)', col3: '', col4: 'εἰσί(ν)'},
  {col1: 'Infinitive', col2: '', col3: '-εἶναι', col4: ''}
]

const chapter3_1 : TableDataType = [
  {title: '2nd Declension Masculine Nouns'},
  {col1: 'Declension', col2: 'Singular', col3: 'Plural', col4: ''},
  {col1: 'Nominative', col2: 'ὁ ...ος', col3: 'οἱ ...οι', col4: ''},
  {col1: 'Genitive', col2: 'τοῦ ...ου', col3: 'τῶν ...ων', col4: ''},
  {col1: 'Dative', col2: 'τῷ ...ῳ', col3: 'τοῖς ...οις', col4: ''},
  {col1: 'Accusative', col2: 'τὸν ...ον', col3: 'τοὺς ...ους', col4: ''},
  {col1: 'Vocative', col2: '...ε', col3: '...οι', col4: ''}
]

const chapter3_2 : TableDataType = [
  {title: '2nd Declension Neuter Nouns'},
  {col1: 'Declension', col2: 'Singular', col3: 'Plural', col4: ''},
  {col1: 'Nominative', col2: 'τὸ ...ον', col3: 'τὰ ...α', col4: ''},
  {col1: 'Genitive', col2: 'τοῦ ...ου', col3: 'τῶν ...ων', col4: ''},
  {col1: 'Dative', col2: 'τῷ ...ῳ', col3: 'τοῖς ...οις', col4: ''},
  {col1: 'Accusative', col2: 'τὸ ...ον', col3: 'τὰ ...α', col4: ''},
  {col1: 'Vocative', col2: '...ον', col3: '...α', col4: ''}
]

const chapter4_1 : TableDataType = [
  {title: '1st Declension Feminine Nouns (Sing.)'},
  {col1: '', col2: 'Normal Base', col3: 'ε, ι, ρ base', col4: 'Mixed Base'},
  {col1: 'Nominative', col2: 'ἡ ...η', col3: 'ἡ ...α', col4: 'ἡ ...α'},
  {col1: 'Genitive', col2: 'τῆς ...ης', col3: 'τῆς ...ας', col4: 'τῆς ...ης'},
  {col1: 'Dative', col2: 'τῇ ...ῃ', col3: 'τῇ ...ᾳ', col4: 'τῇ ...ῃ'},
  {col1: 'Accusative', col2: 'τὴν ...ην', col3: 'τὴν ...αν', col4: 'τὴν ...αν'},
  {col1: 'Vocative', col2: '...η', col3: '...α', col4: '...α'},
]

const chapter4_2 : TableDataType = [
  {title: '1st Declension Feminine Nouns (Plur.)'},
  {col1: '', col2: 'Normal Base', col3: 'ε, ι, ρ base', col4: 'Mixed Base'},
  {col1: 'Nominative', col2: 'ἡ ...αι', col3: 'ἡ ...αι', col4: 'ἡ ...αι'},
  {col1: 'Genitive', col2: 'τῶν ...ων', col3: 'τῶν ...ων', col4: 'τῶν ...ων'},
  {col1: 'Dative', col2: 'ταῖς ...αις', col3: 'ταῖς ...αις', col4: 'ταῖς ...αις'},
  {col1: 'Accusative', col2: 'τὰς ...ας', col3: 'τὰς ...ας', col4: 'τὰς ...ας'},
  {col1: 'Vocative', col2: '...αι', col3: '...αι', col4: '...αι'}
]

const chapter4_3 : TableDataType = [
  {title: '1st Declension Masculine Nouns'},
  {col1: '', col2: 'Normal Base (Sing.)', col3: 'ε, ι, ρ base (Sing.)', col4: 'All Plurals'},
  {col1: 'Nominative', col2: 'ὁ ...ης', col3: 'ὁ ...ας', col4: 'οἱ ...αι'},
  {col1: 'Genitive', col2: 'τοῦ ...ου', col3: 'τοῦ ...ου', col4: 'τῶν ...ων'},
  {col1: 'Dative', col2: 'τῷ ...ῃ', col3: 'τῷ ...ᾳ', col4: 'τοῖς ...αις'},
  {col1: 'Accusative', col2: 'τὸν ...ῃν', col3: 'τὸν ...αν', col4: 'τοὺς ...ας'},
  {col1: 'Vocative', col2: '...α', col3: '...α', col4: '...αι'}
]

const chapter5_1 : TableDataType = [
  {title: 'Imperfect Indicative -ω verbs: Active Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ο-ν', col3: '', col4: '-ο-μεν'},
  {col1: '2nd', col2: '-ε-ς', col3: '', col4: '-ε-τε'},
  {col1: '3rd', col2: '-ε(ν)', col3: '', col4: '-ο-ν'},
];

const chapter5_2 : TableDataType = [
  {title: 'Imperfect Indicative -ω verbs: Middle/Passive Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ό-μην', col3: '', col4: '-ό-μεθα'},
  {col1: '2nd', col2: '-ου', col3: '', col4: '-ε-σθε'},
  {col1: '3rd', col2: '-ε-το', col3: '', col4: '-ο-ντο'},
];

const chapter5_3 : TableDataType = [
  {title: 'εἰμὶ Imperfect Indicative'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: 'ἤμην', col3: '', col4: 'ἦμεν/ἦμεθα'},
  {col1: '2nd', col2: 'ἦς/ἦσθα', col3: '', col4: 'ἦτε'},
  {col1: '3rd', col2: 'ἦν', col3: '', col4: 'ἦσαν'},
]

export const unitNameToTables: Record<string, ReactNode> = {
  "Chapter 2": (<div>
    <div>
      <SimpleTable data={chapter2_1}/>
      <SimpleTable data={chapter2_2}/>
      <SimpleTable data={chapter2_3}/>
    </div>
  </div>
),
  "Chapter 3": (
    <div>
      <SimpleTable data={chapter3_1}/>
      <SimpleTable data={chapter3_2}/>
    </div>
  ),
  "Chapter 4": (
    <div>
      <SimpleTable data={chapter4_1}/>
      <SimpleTable data={chapter4_2}/>
      <SimpleTable data={chapter4_3}/>
    </div>
  ),
  "Chapter 5": (
    <div>
      <SimpleTable data={chapter5_1}/>
      <SimpleTable data={chapter5_2}/>
      <SimpleTable data={chapter5_3}/>
    </div>
  )
};