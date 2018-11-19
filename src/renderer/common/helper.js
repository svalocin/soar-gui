const helper = {
    isEmpty(str) {
        return (str == undefined || str == null || str.trim().length == 0);
    }
};

helper.install = function (Vue, options) {
    Vue.mixin({
        created: function () {
            let that = this;

            this.$helper = {
                handleError(error) {
                    console.error(error);

                    let msg = "发生错误：" + error;
                    if (msg.length > 100) msg = msg.substring(0, 100) + "...";

                    that.$Message.error({
                        content: msg,
                        duration: 3
                    });
                }
            };
        }
    })
}

export default helper;