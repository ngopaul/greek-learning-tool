# Greek Testing Tool

Learn Greek by following along with the Greek Textbook, 
"A Reader's Grammar of the Greek New Testament"! This tool 
provides access to the open-source OpenGNT Bible in Greek, 
and helps to learn Greek in a bite-sized way by focusing on the 
words from specific chapters in the textbook.

This site is available at [greek-learning-tool.vercel.app](https://greek-learning-tool.vercel.app).

## Contributing
Run `npm start` and make modifications and verify that they work by manually testing - unit tests TODO.

### Things To Do

- [ ] Add unit tests
- [ ] Add chapters 5 to 21 from "A Reader's Grammar of the Greek New Testament" to `study_chunks.csv` and 
`ChapterTables.js`
- [ ] Improve UI, especially at the end of a unit test
- [ ] Make a smarter version of SimpleTable that formats a table with an arbitrary number of columns, so that
we can put in arbitrary ChapterTables


## Resources
We use OpenGNT for our greek source text: https://github.com/eliranwong/OpenGNT

### `OpenGNT_keyedFeatures.csv`
Οne important key here is "〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕, for example "〔000001｜000001｜40.1.1.w1〕". 
The OpenTextWord_KEY gives us the book, the chapter, the verse, and the word (Matthew is the 40th book). 
"〔TANTT〕" has keys like "〔BIMNRSTWH=Βίβλος=G0976=N-NSF;〕". 
We get the greek word and morphology from here.
Sometimes there are multiple possibilities like
"〔IMNW=Χριστοῦ=G5547=N-GSM-T; BRSTH=χριστοῦ=G5547=N-GSM-T;〕", 
in which case we choose the first one.
The key  "〔TBESG｜IT｜LT｜ST｜Español〕" contains the meaning - we use the IT meaning. 
Example values include: "〔book｜[The] book｜[The] book｜[This is the] record｜Libro〕"

### `OpenGNT_DictRMAC_English.tsv`
This file maps TANTT codes, like "V-IAI-3P", to their meanings, 
like "Verb, Imperfect, Active, Indicative, third, Plural"

### `study_chunks.csv`
This is a csv with headers "unit", "name", "morphologies", and "endings"
Unit might be something like "Chapter 2". 
Name is something like "ω verbs Active 1st Person Singular"
Morphologies will be a list of morphologies, like "N-NSM|N-NPM|N-NSN|N-NPN".
endings is a list of greek endings, like "οῦ|ὸν|οὺς".

## File Structure
This react app stores data in the `public/` directory, where as most of the site is stored in React Components in the `src/` directory.
We use a React Context in order to modify the state of the app, which includes variables such as the reading mode, the words that need to be displayed (along with metadata about the words such as morphology and meaning), the states of checkboxes, etc.

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
