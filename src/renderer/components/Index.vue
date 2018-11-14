<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <img src="../assets/logo.png" class="layout-header-logo">
        <Button class="layout-header-config" @click="displayConfigDrawer">
          <Icon type="md-settings" size="20" />
        </Button>
        <Config></Config>
      </Header>

      <Content class="layout-content">
        <Input type="textarea" class="layout-content-sql" v-model="sql" :autosize="{ maxRows: 5, minRows: 5 }" placeholder="Enter SQL..." />
        <Button type="primary" class="layout-content-query" @click="query()" :style="{  }">查询</Button>

        <Card class="layout-content-out" shadow>
          <p slot="title">
            输出结果
          </p>
          <article class="layout-content-out-content markdown-body" v-html="out" ref="out">
          </article>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import Config from "./Config/Index";
  import soar from "../common/soar.js";
  import showdown from "showdown";

  import "github-markdown-css/github-markdown.css";

  export default {
    name: "index",
    components: { Config },
    data() {
      return {
        sql: "",
        out: ""
      };
    },
    mounted() {
      let out = this.$refs.out;
      out.parentElement.style.padding = "0px";
    },
    methods: {
      displayConfigDrawer() {
        this.$store.dispatch("changeDisplayConfigDrawer");
        console.log(this.$store.state.layout.displayConfigDrawer);
      },
      query() {
        if (this.sql == null || this.sql.trim().length == 0) {
          this.$Message.warning({
            content: "请输入 SQL 语句",
            duration: 3
          });
          this.sql = "";
          return;
        }

        soar.query(
          this.sql,
          out => {
            let i = out.indexOf("# Query:");
            out = out.substring(i);
            debugger;

            let converter = new showdown.Converter();
            converter.setFlavor("github");
            let html = converter.makeHtml(out);
            this.out = html;
          },
          error => {
            console.error(error);
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

  .layout-header {
    background: #e8eaec;
  }

  .layout-header-logo {
    position: absolute;
    clip: rect(34px 293px 72px 148px);
    height: 120px;
    float: left;
    top: -21px;
    left: -98px;
  }

  .layout-header-config {
    height: 34px;
    float: right;
    position: relative;
    top: 15px;
  }

  .layout-content {
    margin: 20px 20px 20px 20px;
  }

  .layout-content-sql {
    width: calc(100% - 105px);
    resize: none;
  }

  .layout-content-query {
    width: 95px;
    height: 115px;
    float: right;
    margin-left: 10px;
  }

  .layout-content-out {
    margin-top: 10px;
  }

  .layout-content-out-content {
    overflow-y: scroll;
    overflow-x: auto;
    height: 258px;
    padding-left: 20px;
    padding-right: 10px;
  }
</style>