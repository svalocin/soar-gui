<template>
  <Drawer title="配置" v-model="display" width="300" :mask-closable="false" :styles="styles.main" @on-close="display = false" @on-visible-change="change">
    <div>
      <Form>
        <Dsn type="Online"></Dsn>
      </Form>
    </div>
    <div :style="styles.footer">
      <Button style="margin-right: 8px" @click="display = false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Drawer>
</template>

<script>
  import Dsn from "./Dsn";

  export default {
    name: "config",
    components: { Dsn },
    data() {
      return {
        styles: {
          main: {
            height: "calc(100% - 103px)",
            overflow: "auto",
            position: "static"
          },
          footer: {
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            "border-top": "1px solid #e8e8e8",
            padding: "10px 16px",
            "text-align": "right",
            background: "#fff"
          }
        }
      };
    },
    computed: {
      display: {
        get() {
          return this.$store.state.layout.displayConfigDrawer;
        },
        set(value) {
          if (this.$store.state.layout.displayConfigDrawer === value) return;
          this.$store.dispatch("changeDisplayConfigDrawer");
        }
      }
    },
    methods: {
      save() {
        this.$store.dispatch("writeConfig");
        this.display = false;
      },
      change(display) {
        if (!display) return;
        this.$store.dispatch("readConfig");
      }
    }
  };
</script>
