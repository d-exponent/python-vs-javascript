const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const start = Date.now()

// Read names and starting letter files
const names = fs.readFileSync('./Names/invited_names.txt', 'utf8')
const startingLetter = fs.readFileSync('./Letters/starting_letter.txt', 'utf8')

const makeLetters = async () => {
	const readyLettersDir = path.join(process.cwd(), 'Output', 'Ready to send')

	//GOAL=> ENSURE THAT WE HAVE A READY LETTER DIRECTORY
	try {
		await fsp.opendir(readyLettersDir) // Check if dir exists
	} catch (err) {
		await fsp.mkdir(readyLettersDir, { recursive: true }) // Make dir if not
	}

	const namesArray = names.split('\n') 

	// loop through the names array and replace [name] in the letter content
	namesArray.forEach(async (name) => {
		const newLetter = startingLetter.replace('[name]', name)

		const newLetterFile = path.join(readyLettersDir, `letter_to_${name}.txt`)

		// Create a dynamic letter file and write the new letter to it
		await fsp.writeFile(newLetterFile, newLetter)
	})
}

makeLetters()

const totalTime = (Date.now() - start) / 1000

console.log('Duration: ' + totalTime.toFixed(3) + 'sec')
