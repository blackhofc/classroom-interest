function Section(students) {
	const edges = [];
	const processedPairs = new Set(); // To keep track of processed pairs

	// Iterate over each person
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];

		// Iterate over other persons
		for (let j = i + 1; j < students.length; j++) {
			const person2 = students[j];

			// Check if the pair is not already processed
			if (!processedPairs.has(`${person1.id}-${person2.id}`)) {
				// Add the pair to the processed set
				processedPairs.add(`${person1.id}-${person2.id}`);
				processedPairs.add(`${person2.id}-${person1.id}`);

				// Create an edge between person1 and person2
				edges.push({
					from: person1.id,
					to: person2.id
				});
			}
		}
	}

	return edges;
}

function Gender(students) {
	const edges = [];

	// Iterate over each person
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];
		const gender = person1.gender;

		// Iterate over other persons to find matching genders
		for (let j = i + 1; j < students.length; j++) {
			const person2 = students[j];
			if (person2.gender === gender) {
				// If genders match, create an edge
				edges.push({
					from: person2.id,
					to: person1.id
				});
			}
		}
	}

	return edges;
}

function Language(students) {
	const edges = [];

	// Iterate over each person
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];
		let maxCommonLanguages = 0;
		let maxCommonPersonIndices = [];

		// Iterate over other persons
		for (let j = i + 1; j < students.length; j++) {
			const person2 = students[j];

			// Find common languages between the two persons
			const commonLanguages = person1.languages.filter((lang) =>
				person2.languages.includes(lang)
			);

			// Check if the persons speak at least one language in common
			if (commonLanguages.length > 0) {
				// Check if the number of common languages is greater than the current maximum
				if (commonLanguages.length > maxCommonLanguages) {
					maxCommonLanguages = commonLanguages.length;
					maxCommonPersonIndices = [j];
				} else if (commonLanguages.length === maxCommonLanguages) {
					maxCommonPersonIndices.push(j);
				}
			}
		}

		// Create edges for all persons with the same maximum number of common languages
		maxCommonPersonIndices.forEach((index) => {
			edges.push({
				from: person1.id,
				to: students[index].id
			});
		});
	}

	return edges;
}

export {
    Section,
    Language,
    Gender
}