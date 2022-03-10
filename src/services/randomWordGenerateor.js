import randomWords from 'random-words';

export const randomWordService = {
    getword
}

function getword() {

    const words = {
        esay: randomWords({ maxLength: 3, exactly: 3 }),
        medium: randomWords({ minLength: 4, maxLength: 5, exactly: 3 }),
        hard: randomWords({ minLength: 6, maxLength: 9, exactly: 3 }),
    }
    return words
}
