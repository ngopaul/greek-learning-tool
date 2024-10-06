# Greek Testing Tool 
![greek testing tool logo](./public/logo96.png)

Learn Greek by following along with the Greek Textbook, 
"A Reader's Grammar of the Greek New Testament"! This tool 
provides access to the open-source OpenGNT Bible in Greek, 
and helps to learn Greek in a bite-sized way by focusing on the 
words from specific chapters in the textbook.

This site is available at [greek-learning-tool.vercel.app](https://greek-learning-tool.vercel.app).

## Contributing

First install npm. For example, one may use nvm to manage node versions:

```shell
brew install nvm
nvm install --lts
nvm use --lts
```

Clone the repo and run `npm install` to install dependencies.

```shell
git clone https://github.com/ngopaul/greek-learning-tool.git
cd greek-learning-tool
npm install
```

Run the app with `npm start`. The app will open in your browser, and it will automatically reload if you make changes to
the code.

### What to contribute?

- [ ] General UI improvements
  - [ ] Make the pop-up windows scrollable
  - [ ] Change left and right arrow colors to use "secondary" palette, not "primary"
  - [ ] Make the "keyboard shortcuts" look better - maybe a table?
  - [ ] Add dark mode (should be easy with material ui)
- [ ] Make it mobile friendly. For mobile devices (detected by screen width):
  - [ ] Remove left/right words, and use horizontal flexbox in `WordDisplay.js`
  - [ ] Hide "keyboard shortcuts"
  - [ ] Make book/chapter/verse search/select look better
- [ ] Add a progress bar when running `loadOpenGNTData`
  - [ ] need to see if this is possible for a async promise
  - [ ] Faster loading times in general. We cache OpenGNTData (which is processed data), but maybe we should also
  cache the raw data with only BookChapterVerseWord, Greek, Morphology, and English, and calculate only the
  StudyChunkID when needed (lazy load)?
- [ ] Make a smarter version of SimpleTable that formats a table with an arbitrary number of columns, so that
  we can put in arbitrary ChapterTables
- [ ] Add chapters 5 to 21 from "A Reader's Grammar of the Greek New Testament" to `study_chunks.csv` and 
`ChapterTables.js`. Do this a chapter at a time.
  - [ ] Add the charts from the chapter to `ChapterTables.js`
  - [ ] Add the words from the chapter to `study_chunks.csv`. Look at `public/data/OpenGNT_DictRMAC_English.tsv` 
  for the TANTT keys to use, and Ctrl+F for the TANTT keys through `public/data/OpenGNT_keyedFeatures.csv` 
  to copy and paste the appropriate word endings.
- [ ] Add unit tests

## Resources
We use OpenGNT for our greek source text:
[link to github](https://github.com/eliranwong/OpenGNT)

## File Descriptions

### `OpenGNT_keyedFeatures.csv`
Οne important column here is〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕, for example 〔000001｜000001｜40.1.1.w1〕. 
The OpenTextWord_KEY gives us the book, the chapter, the verse, and the word (Matthew is the 40th book). 

"〔TANTT〕" has values like "〔BIMNRSTWH=Βίβλος=G0976=N-NSF;〕". 
We get the greek word and morphology from here.
Sometimes there are multiple possibilities like
"〔IMNW=Χριστοῦ=G5547=N-GSM-T; BRSTH=χριστοῦ=G5547=N-GSM-T;〕", 
in which case we choose the first one.

The column  "〔TBESG｜IT｜LT｜ST｜Español〕" contains the english - we use the IT transliation. 
Example values include: "〔book｜[The] book｜[The] book｜[This is the] record｜Libro〕"

### `OpenGNT_DictRMAC_English.tsv`
This file maps TANTT codes, like "V-IAI-3P", to their meanings, 
like "Verb, Imperfect, Active, Indicative, third, Plural"

### `study_chunks.csv`
This is a csv with headers `unit`, `name`, `morphologies`, and `endings`.
`unit` might be something like "Chapter 2". 
`name` is something like "ω verbs Active 1st Person Singular".
`morphologies` will be a list of morphologies, like "N-NSM|N-NPM|N-NSN|N-NPN".
`endings` is a list of greek endings, like "οῦ|ὸν|οὺς".
The logic to parse this file is in `src/utils/dataLoader.js`, in function `loadStudyChunks`.

### `index.js `

Has our ThemeProvider, which is used to wrap the app.

### `App.js`

This is the main component of the app. It displays everything else by using components in the `components/` folder.

### `contexts/AppContext.js`

This is the context for the app. It contains the state of the app, and the functions to update the state.
It provides a centralized place for all the variables that are used throughout the app.