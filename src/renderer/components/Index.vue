<template>
  <div class="layout">
    <Layout>
      <Menu ref="menu" mode="horizontal" theme="light" active-name="review" @on-select="selectMenu">
        <!-- <img src="../assets/logo.png" class="layout-menu-logo"> -->
        <div class="layout-menu-nav">
          <MenuItem name="review">评审</MenuItem>
          <MenuItem name="rewrite">SQL 重写</MenuItem>
          <!-- <MenuItem name="analyze">EXPLAIN 分析</MenuItem> -->
        </div>
        <div class="layout-menu-nav-btn">
          <ButtonGroup size="small" class="layout-menu-btn">
            <Button icon="md-settings" @click="displayConfigDrawer"></Button>
          </ButtonGroup>
        </div>
      </Menu>

      <Content class="layout-content">
        <Input type="textarea" class="layout-content-input" v-model="input" :autosize="{ maxRows: 5, minRows: 5 }" placeholder="Enter SQL..." />
        <Button type="primary" class="layout-content-btn" @click="execute" :style="{  }">{{queryButtonName}}</Button>

        <Card ref="card" class="layout-content-output" shadow>
          <p slot="title">
            输出结果
          </p>
          <article class="layout-content-output-content markdown-body" v-html="output">
          </article>
        </Card>
      </Content>
    </Layout>
    <Config></Config>
  </div>
</template>

<script>
  import soar from "../common/soar.js";

  import showdown from "showdown";
  import "github-markdown-css/github-markdown.css";

  import Config from "./Config/Index";
  import helper from "../common/helper.js";

  export default {
    name: "index",
    components: { Config },
    data() {
      return {
        queryButtonName: "评审",
        input: "",
        output: "",
        cache: {
          currentMenuName: "review",
          inputs: {},
          outputs: {}
        }
      };
    },
    mounted() {
      this.$refs.card.$el.querySelector(".ivu-card-body").style.padding = "0px";
    },
    methods: {
      displayConfigDrawer() {
        this.$store.dispatch("changeDisplayConfigDrawer");
        console.log(this.$store.state.layout.displayConfigDrawer);
      },
      selectMenu(name) {
        if (this.cache.currentMenuName !== name) {
          this.cache.inputs[this.cache.currentMenuName] = this.input;
          this.cache.outputs[this.cache.currentMenuName] = this.output;

          let cacheInput = this.cache.inputs[name];
          if (cacheInput != undefined && cacheInput != null) {
            this.input = cacheInput;
          } else {
            this.input = "";
          }

          let cacheOutput = this.cache.outputs[name];
          if (cacheOutput != undefined && cacheOutput != null) {
            this.output = cacheOutput;
          } else {
            this.output = "";
          }

          this.cache.currentMenuName = name;
        }

        switch (name) {
          case "review":
            this.queryButtonName = "评审";
            break;
          case "rewrite":
            this.queryButtonName = "重写";
            break;
          case "analyze":
            this.queryButtonName = "分析";
            break;
          default:
            this.$Message.error("未知菜单！！！");
            break;
        }
        console.log(this.$refs.menu.currentActiveName);
      },
      execute() {
        if (this.input == null || this.input.trim().length == 0) {
          this.$Message.warning({
            content: "请输入要执行操作的语句",
            duration: 3
          });
          this.input = "";
          return;
        }

        let func = null;
        switch (this.$refs.menu.currentActiveName) {
          case "review":
            func = soar.query;
            break;
          case "rewrite":
            func = soar.rewrite;
            break;
          case "analyze":
            func = soar.explain;
            break;
          default:
            break;
        }
        if (func == null) {
          this.$Message.warning("无法执行该操作");
          return;
        }

        func(
          this.input,
          output => {
            if (helper.isEmpty(output)) {
              this.$Message.info("输出结果为空");
              return;
            }

            let converter = new showdown.Converter();
            converter.setFlavor("github");
            let html = converter.makeHtml(output);
            this.output = html;
          },
          error => {
            this.$helper.handleError(error);
          }
        );
      }
    },
    computed: {}
  };
</script>

<style scoped>
  .layout,
  .ivu-layout {
    height: 100%;
  }

  .ivu-menu {
    padding: 0 40px 0 40px;
  }

  .layout-menu-logo {
    position: absolute;
    clip: rect(34px 293px 72px 148px);
    height: 120px;
    float: left;
    top: -22px;
    left: -109px;
  }

  .layout-menu-nav-btn {
    float: right;
  }

  .layout-menu-btn {
    margin-left: 20px;
  }

  .layout-content {
    margin: 20px 20px 20px 20px;
  }

  .layout-content-input {
    width: calc(100% - 105px);
    resize: none;
  }

  .layout-content-btn {
    width: 95px;
    height: 115px;
    float: right;
    margin-left: 10px;
  }

  .layout-content-output {
    margin-top: 10px;
  }

  .layout-content-output-content {
    overflow-y: scroll;
    overflow-x: auto;
    height: 294px;
    padding-left: 20px;
    padding-right: 10px;
  }
</style>