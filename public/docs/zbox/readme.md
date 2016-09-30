/**
 * Created by zrz on 2015/3/10，17:01.创建zrz工具箱，名称暂定为zBox，为便于调用，特全部小写，即为：zbox.
 * @version 1.0.0 created . 新增一个方便添加全选和单选相互触发的自定义函数selectAll。
 * @version 1.0.1 updated . 重新定义selectAll的选择器。更为方便的指定单选组和全选按钮的选择事件。
 * @version 1.0.2 created . 新增反选按钮与单选按钮的触发事件绑定。
 */

(function (z) {
    z.zbox = {
        /**
         * 全选与单选事件触发
         * @param allCheck 全选的选择器
         * @param radioChecks 单选的参数值 (!!)此处的单选为多选按钮组checkbox的一个按钮
         */
        selectAll: function (allCheck, radioChecks) {
            //筛选单选按钮组
            var radioValueEles = $(radioChecks);
            //点击全选时，同组按钮被同步
            $(document).delegate(allCheck, "click", function () {
                if (radioValueEles && radioValueEles.length > 0) {
                    for (var _r = 0; _r < radioValueEles.length; _r++) {
                        if (radioValueEles.hasOwnProperty(_r)) {
                            radioValueEles[_r].checked = $(this).is(":checked");
                        }
                    }
                }
            });
            //点击单选按钮时，
            $(document).delegate(radioChecks, "click", function () {
                $(allCheck)[0].checked = $(radioChecks + ":checked").length == $(radioChecks).length;
            });
        },
        /**
         * 反选与单选事件触发，可选择是否绑定全选按钮
         * @param inverseCheck 全选的选择器
         * @param radioChecks 单选checkbox的选择器
         * @param allChecks 反选的选择器
         */
        selectInverse: function (inverseCheck, radioChecks, allCheck) {
            //筛选单选按钮组
            var radioValueEles = $(radioChecks);
            $(document).delegate(inverseCheck, "click", function () {
                var allChecked = true;
                //点击反选时，同组按钮被反向选择
                if (radioValueEles && radioValueEles.length > 0) {
                    for (var _r = 0; _r < radioValueEles.length; _r++) {
                        if (radioValueEles.hasOwnProperty(_r)) {
                            radioValueEles[_r].checked = !radioValueEles[_r].checked;
                            allChecked &= radioValueEles[_r].checked;
                        }
                    }
                }
                //若有全选的触发，则检测全选按钮是否选中
                if (allCheck) {
                    $(allCheck)[0].checked = allChecked;
                }
            });
        }
    }
})(jQuery, document);