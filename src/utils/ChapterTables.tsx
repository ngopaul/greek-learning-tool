import React, { ReactNode } from "react";
import SimpleTable, { SimpleTableData } from "../components/SimpleTable";

const chapter2_1 : SimpleTableData = [
  {title: 'Present Indicative -ω verbs: Active Voice', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-ω',         '',     '-ομεν'],
  ['2nd',         '-εις',       '',     '-ετε'],
  ['3rd',         '-ει',        '',     '-ουσιν'],
  ['Infinitive',  '',           '-ειν', ''],
];

const chapter2_2: SimpleTableData = [
  {title: 'Present Indicative -ω verbs: Middle/Passive Voice', numColumns: 4},
  ['Person', 'Singular', '', 'Plural'],
  ['1st', '-ομαι', '', '-όμεθα'],
  ['2nd', '-ει/-ῃ', '', '-εσθε'],
  ['3rd', '-εται', '', '-ονται'],
  ['Infinitive', '', '-εσθαι', ''],
]

const chapter2_3 : SimpleTableData= [
  {title: 'εἰμὶ Present Active Indicative', numColumns: 4},
  ['Person', 'Singular', '', 'Plural'],
  ['1st', 'εἰμὶ', '', 'ἐσμέν'],
  ['2nd', 'εἶ', '', 'ἐστέ'],
  ['3rd', 'ἐστί(ν)', '', 'εἰσί(ν)'],
  ['Infinitive', '', '-εἶναι', ''],
]

const chapter3_1 : SimpleTableData= [
  {title: '2nd Declension Masculine Nouns', numColumns: 3},
  ['Declension', 'Singular', 'Plural'],
  ['Nominative', 'ὁ ...ος', 'οἱ ...οι'],
  ['Genitive', 'τοῦ ...ου', 'τῶν ...ων'],
  ['Dative', 'τῷ ...ῳ', 'τοῖς ...οις'],
  ['Accusative', 'τὸν ...ον', 'τοὺς ...ους'],
  ['Vocative', '...ε', '...οι']
]

const chapter3_2 : SimpleTableData= [
  {title: '2nd Declension Neuter Nouns', numColumns: 3},
  ['Declension', 'Singular', 'Plural'],
  ['Nominative', 'τὸ ...ον', 'τὰ ...α'],
  ['Genitive', 'τοῦ ...ου', 'τῶν ...ων'],
  ['Dative', 'τῷ ...ῳ', 'τοῖς ...οις'],
  ['Accusative', 'τὸ ...ον', 'τὰ ...α'],
  ['Vocative', '...ον', '...α']
]

const chapter4_1 : SimpleTableData= [
  {title: '1st Declension Feminine Nouns (Sing.)', numColumns: 4},
  ['', 'Normal Base', 'ε, ι, ρ base', 'Mixed Base'],
  ['Nominative', 'ἡ ...η', 'ἡ ...α', 'ἡ ...α'],
  ['Genitive', 'τῆς ...ης', 'τῆς ...ας', 'τῆς ...ης'],
  ['Dative', 'τῇ ...ῃ', 'τῇ ...ᾳ', 'τῇ ...ῃ'],
  ['Accusative', 'τὴν ...ην', 'τὴν ...αν', 'τὴν ...αν'],
  ['Vocative', '...η', '...α', '...α']
]

const chapter4_2 : SimpleTableData= [
  {title: '1st Declension Feminine Nouns (Plur.)', numColumns: 4},
  ['', 'Normal Base', 'ε, ι, ρ base', 'Mixed Base'],
  ['Nominative', 'αἱ ...αι', 'αἱ ...αι', 'αἱ ...αι'],
  ['Genitive', 'τῶν ...ων', 'τῶν ...ων', 'τῶν ...ων'],
  ['Dative', 'ταῖς ...αις', 'ταῖς ...αις', 'ταῖς ...αις'],
  ['Accusative', 'τὰς ...ας', 'τὰς ...ας', 'τὰς ...ας'],
  ['Vocative', '...αι', '...αι', '...αι'],
]

const chapter4_3 : SimpleTableData= [
  {title: '1st Declension Masculine Nouns', numColumns: 4},
  ['', 'Normal Base (Sing.)', 'ε, ι, ρ base (Sing.)', 'All Plurals'],
  ['Nominative', 'οἱ ...ης', 'οἱ ...ας', 'οἱ ...αι'],
  ['Genitive', 'τοῦ ...ου', 'τοῦ ...ου', 'τῶν ...ων'],
  ['Dative', 'τῷ ...ῃ', 'τῷ ...ᾳ', 'τοῖς ...αις'],
  ['Accusative', 'τὸν ...ῃν', 'τὸν ...αν', 'τοὺς ...ας'],
  ['Vocative', '...α', '...α', '...αι']
]

const chapter4_4 : SimpleTableData= [
  {title: "The Definite Article: 'the'", numColumns: 7},
  ['', 'M Sing.' , 'F Sing.', 'N Sing.', 'M Plur.', 'F Plur.', 'N Plur.'],
  ['Nominative', 'ὁ', 'ἡ', 'τό', 'οἱ', 'αἱ', 'τά'],
  ['Genitive', 'τοῦ', 'τῆς', 'τοῦ', 'τῶν', 'τῶν', 'τῶν'],
  ['Dative', 'τῷ', 'τῇ', 'τῷ', 'τοῖς', 'ταῖς', 'τοῖς'],
  ['Accusative', 'τόν', 'τήν', 'τό', 'τούς', 'τάς', 'τά'],
]

const chapter5_1 : SimpleTableData= [
  {title: 'Imperfect Indicative -ω verbs: Active Voice', numColumns: 3},
  ['Person', 'Singular', 'Plural'],
  ['1st', '-ο-ν', '-ο-μεν'],
  ['2nd', '-ε-ς', '-ε-τε'],
  ['3rd', '-ε(ν)', '-ο-ν'],
];

const chapter5_2 : SimpleTableData= [
  {title: 'Imperfect Indicative -ω verbs: Middle/Passive Voice', numColumns: 3},
  ['Person', 'Singular', 'Plural'],
  ['1st', '-ο-μην', '-ο-μεθα'],
  ['2nd', '-ου', '-ε-σθε'],
  ['3rd', '-ε-το', '-ο-ντο'],
];

const chapter5_3 : SimpleTableData= [
  {title: 'εἰμὶ Imperfect Indicative', numColumns: 3},
  ['Person', 'Singular', 'Plural'],
  ['1st', 'ἤμην', 'ἦμεν/ἦμεθα'],
  ['2nd', 'ἦς/ἦσθα', 'ἦτε'],
  ['3rd', 'ἦν', 'ἦσαν'],
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
      <SimpleTable data={chapter4_4}/>
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
