<template>
  <div>
    <FormItem :label="type + '-Address'" label-position="top">
      <Input v-model="addr" placeholder="127.0.0.1:3306" />
    </FormItem>
    <FormItem :label="type + '-Schema'" label-position="top">
      <Input v-model="schema" placeholder="test" />
    </FormItem>
    <FormItem :label="type + '-User'" label-position="top">
      <Input v-model="user" placeholder="root" />
    </FormItem>
    <FormItem :label="type + '-Password'" label-position="top">
      <Input v-model="password" placeholder="123" />
    </FormItem>
    <FormItem :label="type + '-Disable'">
      <i-switch v-model="disable" size="large">
        <span slot="open"></span>
        <span slot="close"></span>
      </i-switch>
    </FormItem>
  </div>
</template>

<script>
  const dsnType = ["Online", "Test"];

  export default {
    name: "dsn",
    props: {
      type: {
        type: String,
        required: true,
        validator: function(value) {
          return dsnType.indexOf(value) !== -1;
        }
      }
    },
    computed: {
      addr: {
        get() {
          return this.$store.state.config[this.type.toLowerCase() + "-dsn"].addr;
        },
        set(value) {
          this.$store.dispatch("set" + this.type + "DsnAddr", value);
        }
      },
      schema: {
        get() {
          return this.$store.state.config[this.type.toLowerCase() + "-dsn"]
            .schema;
        },
        set(value) {
          this.$store.dispatch("set" + this.type + "DsnSchema", value);
        }
      },
      user: {
        get() {
          return this.$store.state.config[this.type.toLowerCase() + "-dsn"].user;
        },
        set(value) {
          this.$store.dispatch("set" + this.type + "DsnUser", value);
        }
      },
      password: {
        get() {
          return this.$store.state.config[this.type.toLowerCase() + "-dsn"]
            .password;
        },
        set(value) {
          this.$store.dispatch("set" + this.type + "DsnPassword", value);
        }
      },
      disable: {
        get() {
          return this.$store.state.config[this.type.toLowerCase() + "-dsn"]
            .disable;
        },
        set(value) {
          this.$store.dispatch("set" + this.type + "DsnDisable", value);
        }
      }
    }
  };
</script>
