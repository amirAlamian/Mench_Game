#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');

function validateRE (term) {
    const re = new RegExp(/\[(feature|fix)\] #PA-\d{3,} (\w+)/);
    return re.test(term);
}

function validateMergeCommit (term) {
    return term.startWith('Merge remote-tracking branch ');
}

const main = (argv) => {
    const lines = fs
        .readFileSync(argv[2])
        .toString()
        .split('\n')
        .map((x) => x.trim())
        .filter((x) => x.length !== 0 && !x.startsWith('#'));

    for (const line of lines) {
        const right = validateRE(line) || validateMergeCommit(line);

        if (!right) {
            // eslint-disable-next-line no-console
            console.error(`
        ${chalk.red.bold('Wrong Message')}: ${line}

        Please read the commit message guidelines:
            1. ${chalk.blue.bold('Commit must start with [feature] or [fix]')}
            2. ${chalk.blue.bold('Followed by #PA-123')}
            3. ${chalk.blue.bold('finally message')}
            -------------------------------------------
            ${chalk.green.bold('Result: [fix] #123 message')}
        `);
            return 1;
        }
    }

    return 0;
};

process.exit(main(process.argv));
