function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        DisplayPeople('Search Results', searchResults);
    } else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    } else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.', ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':

            //! TODO
            // const traits = validatedPrompt('Please enter in what trait you would like to search for.', [$ { person.data }
            //     $ { person.gender },
            //     $ { person.dob },
            //     $ { person.height },
            //     $ { person.weight },
            //     $ { person.eyeColor }
            //     $ { person.occupation },
            //     $ { person.reset }
            // ]);
            //prompt the user to enter the traits they would like to search
            // const traitChoice = validatedPrompt(
            //     `Please choose a trait to search for. \nCurrent number of matching records: ${people.length}
            //     `, ['gender', 'dob', 'height', 'weight', 'eyeColor', 'occupation', 'reset', 'done']
            // );
            const traitChoice = validatedPrompt(
                `Please choose a trait to search for. \nCurrent number of matching records: ${people.length}
                Person data: ${person.data}, Gender: ${person.gender}, DOB: ${person.dob}, Height: ${person.height}, Weight: ${person.weight}, 
                Eye color: ${person.eyeColor}, Occupation: ${person.occupation}, Reset: ${person.reset}, Done: ${person.done}
                `, ['data', 'gender', 'dob', 'height', 'weight', 'eyeColor', 'occupation', 'reset', 'done']
            );
            results = searchByTraits('traits', people);
            break;

        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`, ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            const personInfo = alert(`Full Information:\n\nName: ${person.firstName} ${person.lastName}\nGender: ${person.gender}\n Date of Birth: ${person.dob}\nHeight: ${person.height}\nWeight: ${person.weight}\nEye Color: ${person.eyeColor}\nOccupation: ${person.occupation}\nCurrent Spouse:${ person.currentSpouse}`);
            displayPersonInfo('info', person);
            break;

        case "family":
            //! TODO
            const findPersonFamily = alert(`Family:\n\nName: ${person.firstName} ${person.lastName} ${person.currentSpouse} ${person.currentSpouse}`)
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            const findPersonDescendants = alert(`Descendants:\n\nName: ${person.firstName} ${person.lastName} ${person.currentSpouse} ${person.currentSpouse}`)
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":

            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}