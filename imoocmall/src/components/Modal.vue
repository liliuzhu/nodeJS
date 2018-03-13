<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="close">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="msg"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="mdShow" @click="close"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "",
        data() {
            return {};
        },
        props: {
            mdShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
