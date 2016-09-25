#!/usr/bin/env node
var shell = require('shelljs');
var chalk = require('chalk');

shell.ls().forEach(function(dir) {
	shell.cd(dir);
	shell.exec('git status', { silent:true }, function(code, stdout, stderr) {
  		if(stderr) {
  			console.error(
          chalk.yellow(dir), '>', chalk.red('Not a git repository'));
  			return;
  		}
  		if(stdout) {
  			var hasUncommittedChanges = stdout.indexOf('up-to-date') > -1;
  			var isAhead = stdout.indexOf('is ahead') > -1;

        if(!isAhead && !hasUncommittedChanges) {
          console.log(chalk.bold.green('[OK]'), '\t', chalk.green(dir));
        } else if(isAhead) {
          console.log(chalk.bold.yellow('[MEH]'), '\t', chalk.yellow(dir));
        } else if(hasUncommittedChanges) {
          console.log(chalk.bold.red('[NOK]'), '\t', chalk.red(dir));
        }

  		}
	});
	shell.cd('..');
});