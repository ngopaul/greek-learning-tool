import SimpleTable from "../components/SimpleTable";

const chapter2_1 = [
  {title: 'Present Indicative Endings of -ω verbs: Active Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ω', col3: '', col4: '-ομεν'},
  {col1: '2nd', col2: '-εις', col3: '', col4: '-ετε'},
  {col1: '3rd', col2: '-ει', col3: '', col4: '-ουσιν'},
  {col1: 'Infinitive', col2: '', col3: '-ειν', col4: ''}
];

const chapter2_2 = [
  {title: 'Present Indicative Endings of -ω verbs: Middle/Passive Voice'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: '-ομαι', col3: '', col4: '-όμεθα'},
  {col1: '2nd', col2: '-ει/-ῃ', col3: '', col4: '-εσθε'},
  {col1: '3rd', col2: '-εται', col3: '', col4: '-ονται'},
  {col1: 'Infinitive', col2: '', col3: '-εσθαι', col4: ''}
]

const chapter2_3 = [
  {title: 'εἰμὶ'},
  {col1: 'Person', col2: 'Singular', col3: '', col4: 'Plural'},
  {col1: '1st', col2: 'εἰμὶ', col3: '', col4: 'ἐσμέν'},
  {col1: '2nd', col2: 'εἶ', col3: '', col4: 'ἐστέ'},
  {col1: '3rd', col2: 'ἐστί(ν)', col3: '', col4: 'εἰσί'},
  {col1: 'Infinitive', col2: '', col3: '-εἶναι', col4: ''}
]

const chapter3_1 = [
  {title: '2nd Declension Masculine Nouns'},
  {col1: 'Declension', col2: 'Singular', col3: 'Plural', col4: ''},
  {col1: 'Nominative', col2: 'ὁ ...ος', col3: 'οἱ ...οι', col4: ''},
  {col1: 'Genitive', col2: 'τοῦ ...ου', col3: 'τῶν ...ων', col4: ''},
  {col1: 'Dative', col2: 'τῷ ...ῳ', col3: 'τοῖς ...οις', col4: ''},
  {col1: 'Accusative', col2: 'τὸν ...ον', col3: 'τοὺς ...ους', col4: ''},
  {col1: 'Vocative', col2: '...ε', col3: '...οι', col4: ''}
]

const chapter3_2 = [
  {title: '2nd Declension Neuter Nouns'},
  {col1: 'Declension', col2: 'Singular', col3: 'Plural', col4: ''},
  {col1: 'Nominative', col2: 'τὸ ...ον', col3: 'τὰ ...α', col4: ''},
  {col1: 'Genitive', col2: 'τοῦ ...ου', col3: 'τῶν ...ων', col4: ''},
  {col1: 'Dative', col2: 'τῷ ...ῳ', col3: 'τοῖς ...οις', col4: ''},
  {col1: 'Accusative', col2: 'τὸ ...ον', col3: 'τὰ ...α', col4: ''},
  {col1: 'Vocative', col2: '...ον', col3: '...α', col4: ''}
]

export const unitNameToTables = {
  "Chapter 2": (
    <div>
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
  )
};