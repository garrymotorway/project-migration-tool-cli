import { program } from 'commander';
import { readFileSync, existsSync } from 'fs';

const run = require('project-migration-tool').default;

program
  .requiredOption('-c, --config <filename>', 'config file location, should be a JSON file (required)')
  .requiredOption('-s,--source-token <string>', 'the token to access source data')
  .requiredOption('-d,--destination-token <string>', 'the token to access destination data')
  .requiredOption('-a,--default-assignee <string>', 'default person to assign unassignable tickets to')
  .option('-n,--destination-seed <number>', 'if destination already has issues, set this to the highest issue number to avoid ID clashes')
  .option('-x,--sample <number>', 'for testing uploads; generate a sample of issues rather than a full extract')
  .parse();

const options = program.opts();
process.env.CONSUMER_TOKEN = options.sourceToken;
process.env.PRODUCER_TOKEN = options.destinationToken;
process.env.DEFAULT_REPORTER = options.defaultAssignee;
process.env.DEST_SEED = options.destinationSeed;
process.env.SAMPLE = options.sample;

if (!existsSync(options.config)) {
  throw new Error(`The file '${options.config}' does not exist. Exiting...`);
}

const config = JSON.parse(readFileSync(options.config, { encoding: 'utf-8' }));

(async function cli() {
  await run(config);
}());
