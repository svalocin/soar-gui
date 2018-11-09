const showdown = require('showdown');

const { yaml } = require("./js/yaml");
const { soar } = require("./js/soar");

console.log(require('path').resolve('./'));

var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        yaml: {
            'online-dsn': {
                addr: "",
                schema: "",
                user: "",
                password: "",
                disable: false
            }
        },
        soar: {
            sql: "",
            out: ""
        }
    },
    methods: {
        revertYaml() {
            this.yaml = yaml.get();
        },
        saveYaml() {
            yaml.set(this.yaml);
        },
        querySoar() {
            soar.query(this.soar.sql, (out) => {
                let i = out.indexOf('# Query:');
                out = out.substring(i);

                let converter = new showdown.Converter();
                let html = converter.makeHtml(out);
                this.soar.out = html;
            }, (error) => {
                console.error(error);
            })
        }
    }
})

vm.$data.yaml = yaml.get();
