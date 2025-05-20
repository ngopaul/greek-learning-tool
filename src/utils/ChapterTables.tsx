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
  ['Infinitive', '', 'εἶναι', ''],
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
  ['Nominative', 'ὁ ...ης', 'ὁ ...ας', 'οἱ ...αι'],
  ['Genitive', 'τοῦ ...ου', 'τοῦ ...ου', 'τῶν ...ων'],
  ['Dative', 'τῷ ...ῃ', 'τῷ ...ᾳ', 'τοῖς ...αις'],
  ['Accusative', 'τὸν ...ην', 'τὸν ...αν', 'τοὺς ...ας'],
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

const chapter6_1 : SimpleTableData= [
  {title: '1st/2nd Decl Singular Adjectives', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nominative', '-ος', '-η/-α', '-ον'],
  ['Genitive', '-ου', '-ης/-ας', '-ου'],
  ['Dative', '-ῳ', '-ῃ/-ᾳ', '-ῳ'],
  ['Accusative', '-ον', '-ην/-αν', '-ον'],
  ['Vocative', '-ε', '-η/-α', '-ον'],
];

const chapter6_2 : SimpleTableData= [
  {title: '1st/2nd Decl Plural Adjectives', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nominative', '-οι', '-αι', '-α'],
  ['Genitive', '-ων', '-ων', '-ων'],
  ['Dative', '-οις', '-αις', '-οις'],
  ['Accusative', '-ους', '-ας', '-α'],
  ['Vocative', '-οι', '-αι', '-α'],
];

const chapter8_1 : SimpleTableData = [
  {title: 'Future Active Indicative -ω verbs: Active', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-σω',         '',     '-σομεν'],
  ['2nd',         '-σεις',       '',     '-σετε'],
  ['3rd',         '-σει',        '',     '-σουσιν'],
  ['Infinitive',  '',           '-σειν', ''],
];

const chapter8_2: SimpleTableData = [
  {title: 'Future Active Indicative -ω verbs: Middle/Passive', numColumns: 4},
  ['Person', 'Singular', '', 'Plural'],
  ['1st', '-σ-ο-μαι', '', '-σ-ό-μεθα'],
  ['2nd', '-σ-ει/-σ-ῃ', '', '-σ-εσθε'],
  ['3rd', '-σ-ε-ται', '', '-σ-ο-νται'],
  ['Infinitive', '', '-σ-ε-σθαι', ''],
]

const chapter8_3 : SimpleTableData = [
  {title: 'εἰμὶ Future Active Indicative', numColumns: 4},
  ['Person', 'Singular', '', 'Plural'],
  ['1st', 'ἔσομαι', '', 'ἐσόμεθα'],
  ['2nd', 'ἔσῃ', '', 'ἔσεσθε'],
  ['3rd', 'ἔσται', '', 'ἔσονται'],
  ['Infinitive', '', 'ἔσεσθαι', ''],
]

const chapter9_1 : SimpleTableData = [
  {title: 'First Aorist Indicative -ω verbs: Active', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-σα',         '',     '-σαμεν'],
  ['2nd',         '-σας',       '',     '-σατε'],
  ['3rd',         '-σε(ν)',        '',     '-σαν'],
  ['Infinitive',  '',           '-σαι', ''],
]

const chapter9_2 : SimpleTableData = [
  {title: 'First Aorist Indicative -ω verbs: Middle', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-σαμην',         '',     '-σαμεθα'],
  ['2nd',         '-σω',       '',     '-σασθε'],
  ['3rd',         '-σατο',        '',     '-σαντο'],
  ['Infinitive',  '',           '-σασθαι', ''],
]

const chapter9_3 : SimpleTableData = [
  {title: 'Second Aorist Indicative -ω verbs: Active', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-ον',         '',     '-ομεν'],
  ['2nd',         '-ες',       '',     '-ετε'],
  ['3rd',         '-ε(ν)',        '',     '-ον'],
  ['Infinitive',  '',           '-ειν', ''],
]

const chapter9_4 : SimpleTableData = [
  {title: 'Second Aorist Indicative -ω verbs: Middle', numColumns: 3},
  ['Person',      'Singular',   '',     'Plural'],
  ['1st',         '-ομην',         '',     '-ομεθα'],
  ['2nd',         '-ου',       '',     '-εσθε'],
  ['3rd',         '-ετο',        '',     '-οντο'],
  ['Infinitive',  '',           '-εσθαι', ''],
]

const chapter10_1 : SimpleTableData= [
  {title: 'Personal Pronouns, 1st and 2nd person', numColumns: 5},
  ['', '1S', '1P', '2S', '2P'],
  ['Nom.', 'ἐγώ', 'ἡμεῖς', 'σὺ', 'ὑμεῖς'],
  ['Gen.', 'ἐμοῦ, μου', 'ἡμῶν', 'σοῦ, σου', 'ὑμῶν'],
  ['Dat.', 'ἐμοί, μοι', 'ἡμῖν', 'σοί, σοι', 'ὑμῖν'],
  ['Acc.', 'ἐμέ, με', 'ἡμᾶς', 'σέ, σε', 'ὑμᾶς'],
];

const chapter10_2 : SimpleTableData= [
  {title: 'Personal Pronouns, 3rd person', numColumns: 7},
  ['', 'Sing. Masc.', 'Sing. Fem.', 'Sing. Neut.', 'Plur. Masc.', 'Plur. Fem.', 'Plur. Neut.'],
  ['Nom.', 'αὐτός', 'αὐτή', 'αὐτό', 'αὐτοί', 'αὐταί', 'αὐτά'],
  ['Gen.', 'αὐτοῦ', 'αὐτῆς', 'αὐτοῦ', 'αὐτῶν', 'αὐτῶν', 'αὐτῶν'],
  ['Dat.', 'αὐτῷ', 'αὐτῇ', 'αὐτῷ', 'αὐτοῖς', 'αὐταῖς', 'αὐτοῖς'],
  ['Acc.', 'αὐτόν', 'αὐτήν', 'αὐτό', 'αὐτούς', 'αὐτάς', 'αὐτά'],
];

const chapter10_3 : SimpleTableData= [
  {title: 'Demonstrative Pronouns', numColumns: 7},
  ['', 'Sing. Masc.', 'Sing. Fem.', 'Sing. Neut.', 'Plur. Masc.', 'Plur. Fem.', 'Plur. Neut.'],
  ['Nom.', 'οὗτος', 'αὕτη', 'τοῦτο', 'οὗτοι', 'αὗται', 'ταῦτα'],
  ['Gen.', 'τούτου', 'ταύτης', 'τούτου', 'τούτων', 'τούτων', 'τούτων'],
  ['Dat.', 'τούτῳ', 'ταύτῃ', 'τούτῳ', 'τούτοις', 'ταύταις', 'τούτοις'],
  ['Acc.', 'τούτον', 'ταύτην', 'τοῦτο', 'τούτους', 'ταύτας', 'ταῦτα'],
];

const chapter10_4 : SimpleTableData= [
  {title: 'Relative Pronouns', numColumns: 7},
  ['', 'Sing. Masc.', 'Sing. Fem.', 'Sing. Neut.', 'Plur. Masc.', 'Plur. Fem.', 'Plur. Neut.'],
  ['Nom.', 'ὅς', 'ἥ', 'ὅ', 'οἵ', 'αἵ', 'ἅ'],
  ['Gen.', 'οὗ', 'ἧς', 'οὗ', 'ὧν', 'ὧν', 'ὧν'],
  ['Dat.', 'ᾧ', 'ᾗ', 'ᾧ', 'οἷς', 'αἷς', 'οἷς'],
  ['Acc.', 'ὅν', 'ἥν', 'ὅ', 'οὕς', 'ἅς', 'ἅ'],
]

const chapter11_1 : SimpleTableData= [
  {title: '3rd Declension Noun Endings', numColumns: 5},
  ['Declension', 'Masc/Fem Sing.',  'Masc/Fem Pl.', 'Neuter Singular', 'Neuter Plural'],
  ['Nominative', '-ς', '-ες', '[no ending]', '-α'],
  ['Genitive', '-ος', '-ων', '-ος', '-ων'],
  ['Dative', '-ι(ν)', '-σι(ν)', '-ι(ν)', '-σι(ν)'],
  ['Accusative', '-α/-ν', '-ας', '[no ending]', '-α'],
  ['Vocative', '-ς', '-ες', '[no ending]', '-α'],
];

const chapter11_2 : SimpleTableData= [
  {title: '3rd Declension κ/τ/ρ/δ Endings', numColumns: 6},
  ['Decl.', 'woman, ἡ', 'night, ἡ', 'flesh, ἡ', 'hand, ἡ', 'foot, ὁ', 'witness, ὁ'],
  ['Nom. Sg.', 'γυνή', 'νύξ', 'σάρξ', 'χείρ', 'πούς', 'μάρτυς'],
  ['Gen. Sg.', 'γυναικός', 'νυκτός', 'σαρκός', 'χειρός', 'ποδός', 'μάρτυρος'],
  ['Dat. Sg.', 'γυναικί', 'νυκτί', 'σαρκί', 'χειρί', 'ποδί', 'μάρτυρι'],
  ['Acc. Sg.', 'γυαῖκα', 'νύκτα', 'σάρκα', 'χεῖρα', 'πόδα', 'μάρτυρα'],
  ['Voc. Sg.', 'γύναι', 'νύξ', 'σάρξ', 'χείρ', 'πούς', 'μάρτυρ'],
  ['Nom./Voc. Pl.', 'γυναῖκες', 'νύκτες', 'σάρκες', 'χεῖρες', 'πόδες', 'μάρτυρες'],
  ['Gen. Pl.', 'γυναικῶν', 'νυκτῶν', 'σαρκῶν', 'χειρῶν', 'ποδῶν', 'μαρτύρων'],
  ['Dat. Pl.', 'γυναιξί', 'νυξί', 'σαρξί', 'χειρσί', 'ποσί', 'μάρτυρσι'],
  ['Acc. Pl.', 'γυναῖκας', 'νύκτας', 'σάρκας', 'χεῖρας', 'πόδας', 'μάρτυρας']
]

const chapter11_3 : SimpleTableData= [
  {title: '3rd Declension ων Endings', numColumns: 4},
  ['Decl.', 'age, ὁ', 'old man, ὁ', 'ruler, ὁ'],
  ['Nom. Sg.', 'αἰών', 'γέρων', 'ἄρχων'],
  ['Gen. Sg.', 'αἰῶνος', 'γέροντος', 'ἄρχοντος'] ,
  ['Dat. Sg.', 'αἰῶνι', 'γέροντι', 'ἄρχοντι' ],
  ['Acc. Sg.', 'αἰῶνα', 'γέροντα', 'ἄρχοντα' ],
  ['Voc. Sg.', 'αἰών', 'γέρον', 'ἄρχον' ],
  ['Nom./Voc. Pl.', 'αἰῶνες', 'γέροντες', 'ἄρχοντες' ],
  ['Gen. Pl.', 'αἰώνων', 'γερόντων', 'ἀρχόντων' ],
  ['Dat. Pl.', 'αἰῶσι', 'γέρουσι', 'ἄρχουσι' ],
  ['Acc. Pl.', 'αἰῶνας', 'γέροντας', 'ἄρχοντας'] 
]

const chapter11_4 : SimpleTableData= [
  {title: '3rd Declension Neuter τ Endings', numColumns: 6},
  ['Decl.', 'body τό', 'blood τό', 'will τό', 'name τό', 'spirit τό'],
  ['Nom. Sg.', 'σῶμα', 'αἷμα', 'θέλημα', 'ὄνομα', 'πνεῦμα'],
  ['Gen.', 'σώματος', 'αἵματος', 'θελήματος', 'ὀνόματος', 'πνεύματος'],
  ['Dat.', 'σώματι', 'αἵματι', 'θελήματι', 'ὀνόματι', 'πνεύματι'],
  ['Acc.', 'σῶμα', 'αἷμα', 'θέλημα', 'ὄνομα', 'πνεῦμα'],
  ['Voc.', 'σῶμα', 'αἷμα', 'θέλημα', 'ὄνομα', 'πνεῦμα'],
  ['Nom./Voc. Pl.', 'σώματα', 'αἵματα', 'θέληματα', 'ὀνόματα', 'πνεύματα'],
  ['Gen.', 'σωμάτων', 'αἵματων', 'θελημάτων', 'ὀνομάτων', 'πνευμάτων'],
  ['Dat.', 'σώμασι', 'αἵμασι', 'θελήμασι', 'ὀνόμασι', 'πνεύμασι'],
  ['Acc.', 'σώματα', 'αἵματα', 'θέληματα', 'ὀνόματα', 'πνεύματα'],
]

const chapter11_5 : SimpleTableData= [
  {title: '3rd Declension Neuter ες Endings (intervocalic σ)', numColumns: 6},
  ['Decl.', '[theory]', 'kind τό', 'year τό', 'nation τό', 'member τό'],
  ['Nom. Sg.', 'ες→ος', 'γένος', 'ἔτος', 'ἔθνος', 'μέλος'],
  ['Gen.', 'εσος→ους', 'γένους', 'ἔτους', 'ἔθνους', 'μέλους'],
  ['Dat.', 'εσι→ει', 'γένει', 'ἔτει', 'ἔθνει', 'μέλει'],
  ['Acc.', 'ες→ος', 'γένος', 'ἔτος', 'ἔθνος', 'μέλος'],
  ['Voc.', 'ες→ος', 'γένος', 'ἔτος', 'ἔθνος', 'μέλος'],
  ['Nom./Voc. Pl.', 'εσα→η', 'γένη', 'ἔτη', 'ἔθνη', 'μέλη'],
  ['Gen.', 'εσων→ων', 'γενῶν', 'ἔτων', 'ἐθνῶν', 'μελῶν'],
  ['Dat.', 'εσσι→εσι', 'γένεσι', 'ἔτεσι', 'ἔθνεσι', 'μέλεσι'],
  ['Acc.', 'εσα→η', 'γένη', 'ἔτη', 'ἔθνη', 'μέλη'],
]

// TODO: Add tables for chapter 12. 
// Use the two tables from the following link:
// https://docs.google.com/spreadsheets/d/1MAWRoRWt0Zafy0pVEW12AggLszAyCcWOlZaWEUYDI5g/edit?gid=1884359243#gid=1884359243

// Adjectives which don't follow the rules (Third Declension and Irregular Adjectives)
const chapter14_1 : SimpleTableData= [
  {title: 'Third Decl Adjective in -ης, -ες', numColumns: 5},
  ['', 'Sing. Masc./Fem.', 'Sing. Neut.', 'Plural Masc./Fem.', 'Plural Neut.'],
  ['Nom.', '-ης', '-ες', '-εις', '-η'],
  ['Gen.', '-ους', '-ους', '-ων', '-ων'],
  ['Dat.', '-ει', '-ει', '-εσι(ν)', '-εσιν(ν)'],
  ['Acc.', '-η', '-ες', '-εις', '-η'],
  ['Voc.', '-ες', '-ες', '-εις', '-η'],
];

const chapter14_2 : SimpleTableData= [
  {title: 'Third Decl Adjective in -ων, -ον', numColumns: 5},
  ['', 'Sing. Masc./Fem.', 'Sing. Neut.', 'Plural Masc./Fem.', 'Plural Neut.'],
  ['Nom.', '-ων', '-ον', '-ες', '-α'],
  ['Gen.', '-ονος', '-ονος', '-ων', '-ων'],
  ['Dat.', '-ονι', '-ονι', '-οσι(ν)', '-σοι(ν)'],
  ['Acc.', '-ονα', '-ον', '-ονας', '-ονα'],
  ['Voc.', '-ον', '-ον', '-ονες', '-α'],
];

const chapter14_3 : SimpleTableData= [
  {title: 'Third Decl Adjective in -υς, -εια, -υ', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nom. Sing.', '-υς', '-εια', '-υ'],
  ['Gen. Sing.', '-εωσ', '-ειας', '-εως'],
  ['Dat. Sing.', '-ει', '-ειᾳ', '-ει'],
  ['Acc. Sing.', '-υν', '-ειαν', '-υ'],
  ['Voc. Sing.', '-υ', '-εια', '-υ'],
  ['Nom. Plur.', '-εις', '-ειαι', '-εα'],
  ['Gen. Plur.', '-εων', '-ειων', '-εων'],
  ['Dat. Plur.', '-εισι(ν)', '-ειαις', '-εσι(ν)'],
  ['Acc. Plur.', '-εις', '-ειας', '-εα'],
  ['Voc. Plur.', '-εις', '-ειαι', '-εα'],
];

const chapter14_4 : SimpleTableData= [
  {title: 'Third Decl Adjective πᾶς, πᾶσα, πᾶν', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nom. Sing.', 'πᾶς', 'πᾶσα', 'πᾶν'],
  ['Gen. Sing.', 'παντός', 'πάντης', 'παντός'],
  ['Dat. Sing.', 'παντί', 'πάντῃ', 'παντί'],
  ['Acc. Sing.', 'πάντα', 'πᾶσαν', 'πᾶν'],
  ['Voc. Sing.', 'πᾶν', 'πᾶσα', 'πᾶν'],
  ['Nom. Plur.', 'πάντες', 'πᾶσαι', 'πάντα'],
  ['Gen. Plur.', 'πάντων', 'πασῶν', 'πάντων'],
  ['Dat. Plur.', 'πᾶσι(ν)', 'πάσαις', 'πᾶσι(ν)'],
  ['Acc. Plur.', 'πάντας', 'πάσας', 'πάντα'],
  ['Voc. Plur.', 'πάντες', 'πᾶσαι', 'πάντα'],
];

const chapter14_5 : SimpleTableData= [
  {title: 'More Charts to be added soon...', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nom. Sing.', '...', '...', '...'],
]

const chapter15_1 : SimpleTableData= [
  {title: 'More Charts to be added soon...', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nom. Sing.', '...', '...', '...'],
]

const chapter16_1 : SimpleTableData= [
  {title: 'More Charts to be added soon...', numColumns: 4},
  ['', 'Masculine', 'Feminine', 'Neuter'],
  ['Nom. Sing.', '...', '...', '...'],
]

export const unitNameToTables: Record<string, ReactNode> = {
  "Unit 2": (<div>
    <div>
      <SimpleTable data={chapter2_1}/>
      <SimpleTable data={chapter2_2}/>
      <SimpleTable data={chapter2_3}/>
    </div>
  </div>
),
  "Unit 3": (
    <div>
      <SimpleTable data={chapter3_1}/>
      <SimpleTable data={chapter3_2}/>
    </div>
  ),
  "Unit 4": (
    <div>
      <SimpleTable data={chapter4_1}/>
      <SimpleTable data={chapter4_2}/>
      <SimpleTable data={chapter4_3}/>
      <SimpleTable data={chapter4_4}/>
    </div>
  ),
  "Unit 5": (
    <div>
      <SimpleTable data={chapter5_1}/>
      <SimpleTable data={chapter5_2}/>
      <SimpleTable data={chapter5_3}/>
    </div>
  ),
  "Unit 6": (
    <div>
      <SimpleTable data={chapter6_1}/>
      <SimpleTable data={chapter6_2}/>
    </div>
  ),
  "Unit 8": (
    <div>
      <SimpleTable data={chapter8_1}/>
      <SimpleTable data={chapter8_2}/>
      <SimpleTable data={chapter8_3}/>
    </div>
  ),
  "Unit 9": (
    <div>
      <SimpleTable data={chapter9_1}/>
      <SimpleTable data={chapter9_2}/>
      <SimpleTable data={chapter9_3}/>
      <SimpleTable data={chapter9_4}/>
    </div>
  ),
  "Unit 10": (
    <div>
      <SimpleTable data={chapter10_1}/>
      <SimpleTable data={chapter10_2}/>
      <SimpleTable data={chapter10_3}/>
      <SimpleTable data={chapter10_4}/>
    </div>
  ),
  "Unit 11": (
    <div>
      <SimpleTable data={chapter11_1}/>
      <SimpleTable data={chapter11_2}/>
      <SimpleTable data={chapter11_3}/>
      <SimpleTable data={chapter11_4}/>
      <SimpleTable data={chapter11_5}/>
    </div>
  ),
  "Unit 14": (
    <div>
      <SimpleTable data={chapter14_1}/>
      <SimpleTable data={chapter14_2}/>
      <SimpleTable data={chapter14_3}/>
      <SimpleTable data={chapter14_4}/>
      <SimpleTable data={chapter14_5}/>
    </div>
  ),
  "Unit 15": (
    <div>
      <SimpleTable data={chapter15_1}/>
    </div>
  ),
  "Unit 16": (
    <div>
      <SimpleTable data={chapter16_1}/>
    </div>
  )
};
