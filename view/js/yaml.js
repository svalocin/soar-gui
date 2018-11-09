const yaml = require('js-yaml');
const fs = require('fs');

const filePath = './soar/soar.yaml';

exports.yaml = {
    get() {
        var doc = yaml.safeLoad(fs.readFileSync(filePath));
        return doc;
    },
    set(obj) {
        let doc = yaml.safeDump(obj);
        fs.writeFileSync(filePath, doc);
    }
}
