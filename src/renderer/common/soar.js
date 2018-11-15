var cmd = require('node-cmd');
const path = require('path');

const soarPath = path.resolve('./soar/soar.windows-amd64');
console.log(soarPath);

const yamlPath = path.resolve('./soar/soar.yaml');
console.log(yamlPath);

export default {
    soarPath: soarPath,
    yamlPath: yamlPath,

    query(sql, out, error) {
        sql = sql.replace(new RegExp('\r\n', "g"), " ").replace(new RegExp('\r', "g"), " ").replace(new RegExp('\n', "g"), " ");

        let str = `"${soarPath}" -config "${yamlPath}" -query "${sql}"`;
        console.log('cmd: ', str);

        cmd.get(
            str,
            function (err, stdout, stderr) {
                if (err) {
                    error(stderr);
                } else {
                    out(stdout);
                }
            }
        );
    }
};




