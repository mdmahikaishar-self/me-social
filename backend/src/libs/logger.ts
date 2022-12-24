import chalk from "chalk";

/**
 * logger
 * -------------
 *
 */
export default class logger {
  static log(...message: any[]) {
    this.info(...message);
  }
  static info(...message: any[]) {
    console.log(chalk.blueBright("info"), ...message);
  }
  static success(...message: any[]) {
    console.log(chalk.greenBright("success"), ...message);
  }
  static warn(...message: any[]) {
    console.log(chalk.yellowBright("warn"), ...message);
  }
  static error(...message: any[]) {
    console.log(chalk.redBright("error"), ...message);
  }
}
