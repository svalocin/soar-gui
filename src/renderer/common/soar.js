import helper from "./helper";

var cmd = require('node-cmd');
const path = require('path');

const soarPath = path.resolve('./soar/soar.windows-amd64');
console.log(soarPath);

const yamlPath = path.resolve('./soar/soar.yaml');
console.log(yamlPath);

function handleSql(sql) {
    return sql.trim().replace(new RegExp('\r\n', "g"), " ")
        .replace(new RegExp('\r', "g"), " ")
        .replace(new RegExp('\n', "g"), " ");
}

function runCmd(str, output, error) {
    console.log('cmd: ', str);

    cmd.get(
        str,
        function (err, stdout, stderr) {
            if (err) {
                error(stderr);
            } else {
                console.log('cmd out: ', stdout);
                output(stdout);
            }
        }
    );
}

function rewriteOutput(output, stdout) {
    if (helper.isEmpty(stdout)) {
        output("");
        return;
    }

    output('# Rewrite: \r\n```\r\n' + stdout + '\r\n```');
};

const soar = {
    get soarPath() { return soarPath.slice(); },
    get yamlPath() { return yamlPath.slice(); },

    yamlPath: yamlPath,

    query(sql, output, error) {
        sql = handleSql(sql);
        let str = `"${soarPath}" -config "${yamlPath}" -query "${sql}"`;
        runCmd(str, (stdout) => {
            if (helper.isEmpty(stdout)) {
                output("");
                return;
            }

            let i = stdout.indexOf("# Query:");
            stdout = stdout.substring(i);
            output(stdout);

        }, error);
    },

    rewriteUpdate(sql, output, error) {
        sql = handleSql(sql);
        let str = `"${soarPath}" -config "${yamlPath}" -query "${sql}" -report-type rewrite -rewrite-rules dml2select,delimiter`;
        runCmd(str, (stdout) => {
            rewriteOutput(output, stdout);
        }, error);
    },

    // soar 目前还没实现该功能
    rewriteAlter(sql, output, error) {
        sql = handleSql(sql);
        let str = `"${soarPath}" -config "${yamlPath}" -query "${sql}" -report-type rewrite -rewrite-rules mergealter`;
        runCmd(str, (stdout) => {
            rewriteOutput(output, stdout);
        }, error);
    },

    rewrite(sql, output, error) {
        let temp = sql.trim().toLowerCase();

        if (temp.indexOf('update') == 0) {
            soar.rewriteUpdate(sql, output, error);
            return;
        }

        if (temp.indexOf('alter') == 0) {
            soar.rewriteUpdate(sql, output, error);
            return;
        }

        throw "未知类型语句无法优化";
    },

    // soar 目前还没实现该功能
    explain(sql, output, error) {
        sql = sql.trim();
        let str = `"${soarPath}" -config "${yamlPath}" -report-type explain-digest -query '${sql}'`;
        runCmd(str, (stdout) => {
            if (helper.isEmpty(stdout)) {
                output("");
                return;
            }

            output(stdout);

        }, error);
    }
};

export default soar;




