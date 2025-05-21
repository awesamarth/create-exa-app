const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const execa = require('execa');
const gitClone = require('git-clone/promise');

async function init() {
  program
    .name('create-exa-app')
    .description('Create Exa AI applications with a Next.js starter template')
    .version('0.1.0')
    .argument('[directory]', 'Directory to create the app in')
    .option('--use-npm', 'Use npm instead of detecting package manager')
    .option('--use-yarn', 'Use yarn instead of detecting package manager')
    .option('--use-pnpm', 'Use pnpm instead of detecting package manager')
    .parse(process.argv);

  const options = program.opts();
  let targetDir = program.args[0] || '';

  // If no directory provided, ask for it
  if (!targetDir) {
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project named?',
        default: 'my-exa-app',
      },
    ]);
    targetDir = projectName;
  }

  const resolvedProjectPath = path.resolve(process.cwd(), targetDir);
  const projectName = path.basename(resolvedProjectPath);

  // Check if directory already exists
  if (fs.existsSync(resolvedProjectPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${chalk.cyan(targetDir)} already exists. Overwrite?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.red('Operation cancelled'));
      return;
    }

    await fs.remove(resolvedProjectPath);
  }

  // Create directory
  fs.ensureDirSync(resolvedProjectPath);

  console.log();
  console.log(`Creating a new Exa AI app in ${chalk.green(resolvedProjectPath)}`);
  console.log();

  // Clone repository
  const spinner = ora('Downloading template...').start();
  try {
    await gitClone(
      'https://github.com/awesamarth/exa-next-template',
      resolvedProjectPath,
      { shallow: true }
    );

    // Remove git folder
    await fs.remove(path.join(resolvedProjectPath, '.git'));

    spinner.succeed('Template downloaded successfully');
  } catch (error) {
    spinner.fail('Failed to download template');
    console.error(error);
    return;
  }

  // Detect package manager
  let packageManager = 'npm';
  if (options.useNpm) packageManager = 'npm';
  else if (options.useYarn) packageManager = 'yarn';
  else if (options.usePnpm) packageManager = 'pnpm';
  else {
    try {
      // Check if pnpm is available
      await execa('pnpm', ['--version']);
      packageManager = 'pnpm';
    } catch {
      try {
        // Check if yarn is available
        await execa('yarn', ['--version']);
        packageManager = 'yarn';
      } catch {
        // Default to npm
        packageManager = 'npm';
      }
    }
  }

  // Install dependencies
  const installSpinner = ora('Installing dependencies...').start();
  try {
    const installCommands = {
      npm: ['install'],
      yarn: ['install'],
      pnpm: ['install'],
    };

    await execa(packageManager, installCommands[packageManager], {
      cwd: resolvedProjectPath,
    });

    installSpinner.succeed('Dependencies installed successfully');
  } catch (error) {
    installSpinner.fail('Failed to install dependencies');
    console.error(`Error: ${error.message}`);
    return;
  }

  // Update package.json
  const pkgPath = path.join(resolvedProjectPath, 'package.json');
  const pkg = require(pkgPath);
  pkg.name = projectName;
  pkg.version = '0.1.0';
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  // Display success message
  console.log();
  console.log(chalk.green('Success!'), 'Created', chalk.cyan(projectName), 'at', chalk.cyan(resolvedProjectPath));
  console.log();
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${packageManager}${packageManager === 'npm' ? ' run' : ''} build`));
  console.log('    Builds the app for production.');
  console.log();
  console.log(chalk.cyan(`  ${packageManager}${packageManager === 'npm' ? ' run' : ''} start`));
  console.log('    Runs the built app in production mode.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), targetDir);
  console.log(chalk.cyan(`  ${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`));
  console.log();
  console.log('Remember to add your Exa AI API key in .env.local:');
  console.log();
  console.log(chalk.cyan('  EXA_API_KEY=your_api_key_here'));
  console.log();
  console.log('Happy hacking!');
  console.log();

}

module.exports = init;