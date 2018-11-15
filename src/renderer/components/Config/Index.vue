<template>
  <Drawer title="配置" v-model="display" width="300" :styles="styles.main" @on-close="display = false" @on-visible-change="change">
    <div>
      <Form>
        <Dsn type="Online"></Dsn>
        <Dsn type="Test"></Dsn>
        <FormItem label="Allow online as test">
          <i-switch v-model="allowOnlineAsTest" size="large">
            <span slot="open"></span>
            <span slot="close"></span>
          </i-switch>
        </FormItem>
        <FormItem label="Drop test temporary">
          <i-switch v-model="dropTestTemporary" size="large">
            <span slot="open"></span>
            <span slot="close"></span>
          </i-switch>
        </FormItem>
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
      },
      allowOnlineAsTest: {
        get() {
          return this.$store.state.config["allow-online-as-test"];
        },
        set(value) {
          this.$store.dispatch("setAllowOnlineAsTest", value);
        }
      },
      dropTestTemporary: {
        get() {
          return this.$store.state.config["drop-test-temporary"];
        },
        set(value) {
          this.$store.dispatch("setDropTestTemporary", value);
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
