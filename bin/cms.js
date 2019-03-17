#!/usr/bin/env node

runTask(
   taskName(),
   require('path').resolve(process.env.PWD, 'package.json'),
   process.argv.slice(3)
);




function taskName () {
   const assert = require('assert');

   const task = process.argv[2];

   assert.strictEqual(typeof task, 'string', 'Must have a task specified');
   assert.ok(/^[a-z]+$/.test(task), 'must have a known task');

   return task;
}

function runTask (task, pkg, args) {
   const runner = loadTask(task);
   runner(
      require(pkg),
      ...args,
   );
}

function loadTask (task) {
   try {
      return require(`../scripts/${ task }`);
   }

   catch (e) {
      throw new Error(`Unable to run task '${task}'. Helper file not found.`);
   }
}
