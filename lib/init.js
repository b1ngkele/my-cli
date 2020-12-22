const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content));
const { clone } = require('./download');
const open = require('open')


const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(res => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      res()
    })
  })
}

module.exports = async name => {
  //打印欢迎界面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)
  //下载
  log(`创建项目   ${name}`)
  await clone('github:b1ngkele/myblog', name)
  //自动安装依赖
  log('安装依赖')
  //如果是windows使用npm.cmd  如果是mac使用npm
  await spawn('npm.cmd', ['install'], { cwd: `./${name}` })
  log(`
  安装成功:
  To get Start:
  ====================================
          cd ${name}
          npm start
  ====================================
  `)


  //启动
  // open(`http://localhost:8000`)
  // await spawn('npm.cmd', ['run', 'serve'], { cwd: `./${name}` })
}