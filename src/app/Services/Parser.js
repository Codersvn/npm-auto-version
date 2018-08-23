import semver from 'semver';
import fs from 'fs';

class Version {
  constructor(data) {
    this.major = data.major;
    this.minor = data.minor;
    this.patch = data.patch;
  }
  toString() {
    return [this.major, this.minor, this.patch].join('.');
  }
  increase(type = 'patch') {
    return semver.inc(this.toString(), type);
  }
}
export class Parser {
  constructor(file_path) {
    this.file_path = file_path;
  }
  getPackageVersion() {
    let version;
    try {
      version = require(this.file_path).version;
    } catch (e) {
      throw new Error('Could not load package.json, please make sure it exists');
    }

    if (!semver.valid(version)) {
      throw new Error('Invalid version number found in package.json, please make sure it is valid');
    }

    return new Version({ major: semver.major(version), minor: semver.minor(version), patch: semver.patch(version) });
  }

  /**
   * Updates the package.json with the new version number
   * @method writePackageVersion
   * @param  {String} newVersion New version string MAJOR.MINOR.PATCH
   */
  writePackageVersion(newVersion) {
    const raw = require(this.file_path);

    raw.version = newVersion;

    fs.writeFileSync(this.file_path, JSON.stringify(raw, null, 2));
  }
}
