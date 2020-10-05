import yargs from 'yargs';


export const argv = yargs.options({
    verbose: {
        alias: 'v',
        describe: 'Print some of the things',
        type: 'boolean',
        default: false,
        demandOption: false
    },
    debug: {
        alias: 'd',
        describe: 'Print ALL the things',
        type: 'boolean',
        default: false,
        demandOption: false
    }
})
.wrap(120)
.argv;
