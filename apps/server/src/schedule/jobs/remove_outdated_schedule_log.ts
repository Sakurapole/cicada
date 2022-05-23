import fs from 'fs';
import util from 'util';
import { SCHEDULE_LOG_DIR } from '@/constants/directory';

const TTL = 1000 * 60 * 60 * 24 * 30;
const readdirAsync = util.promisify(fs.readdir);
const rmAsync = util.promisify(fs.rm);
const statAsync = util.promisify(fs.stat);

async function removeOutdatedScheduleLog() {
  const files = await readdirAsync(SCHEDULE_LOG_DIR);
  for (const file of files) {
    const absolutePath = `${SCHEDULE_LOG_DIR}/${file}`;
    const stat = await statAsync(absolutePath);
    if (stat.isDirectory() || Date.now() - stat.birthtimeMs >= TTL) {
      await rmAsync(absolutePath, {
        recursive: true,
        force: true,
      });
    }
  }
}

export default removeOutdatedScheduleLog;
