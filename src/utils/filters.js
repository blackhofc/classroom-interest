function Section(students) {
	const edges = [];
	const processedPairs = new Set(); // To keep track of processed pairs

	// Iterate over each student
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];

		// Iterate over other students
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

function SameAge(students) {
    const edges = [];

    // Iterate over each student
    for (let i = 0; i < students.length; i++) {
        const person1 = students[i];
        const age = person1.age;

        // Iterate over other students to find matching ages
        for (let j = i + 1; j < students.length; j++) {
            const person2 = students[j];
            if (person2.age === age) {
                // If ages match, create an edge between them
                edges.push({
                    from: person2.id,
                    to: person1.id
                });
            }
        }
    }

    return edges;
}

function Gender(students) {
	const edges = [];

	// Iterate over each student
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];
		const gender = person1.gender;

		// Iterate over other students to find matching genders
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

function Common(students, key) {
	const edges = [];

	// Iterate over each student
	for (let i = 0; i < students.length; i++) {
		const person1 = students[i];
		let maxCommon = 0;
		let maxCommonPersonIndices = [];

		// Iterate over other students
		for (let j = i + 1; j < students.length; j++) {
			const person2 = students[j];

			// Find common [key] between the two students
			const commonObject = person1[key].filter((value) =>
				person2[key].includes(value)
			);

			// Check if the students speak at least one [key] in common
			if (commonObject.length > 0) {
				// Check if the number of common [key] is greater than the current maximum
				if (commonObject.length > maxCommon) {
					maxCommon = commonObject.length;
					maxCommonPersonIndices = [j];
				} else if (commonObject.length === maxCommon) {
					maxCommonPersonIndices.push(j);
				}
			}
		}

		// Create edges for all students with the same maximum number of common [key]
		maxCommonPersonIndices.forEach((index) => {
			edges.push({
				from: person1.id,
				to: students[index].id
			});
		});
	}

	return edges;
}

const filters = [
    { value: "class", label: "Classroom" },
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
    { value: "music_genres", label: "Music Genres" },
    { value: "fav_sports", label: "Favorite Sports" },
    { value: "languages", label: "Languages" },
  ];

  function groupStudents(students, filter) {
    switch (filter) {
      case "age":
        filter = SameAge(students);
        break;
      case "gender":
        filter = Gender(students);
        break;
      case "music_genres":
        filter = Common(students, "music_genres");
        break;
      case "fav_sports":
        filter = Common(students, "fav_sports");
        break;
      case "languages":
        filter = Common(students, "languages");
        break;
      default:
        filter = Section(students);
        break;
    }
    return filter;
  }

export {
    Section,
	SameAge,
    Common,
    Gender,
	filters,
	groupStudents
}