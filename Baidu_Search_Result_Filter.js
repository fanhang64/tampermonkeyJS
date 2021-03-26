// ==UserScript==
// @name        Baidu_Search_Result_Filter
// @author      kyouichirou
// @version     1.0
// @update      2020-08-15
// @description Block/Filter Baidu search results, which is contained some specific items_(en)
// @description 过滤/屏蔽包含指定黑名单词汇的百度搜索结果_(cn)
// @include     https://www.baidu.com/*
// @namespace   https://greasyfork.org/zh-CN/users/676366-kyouichirou
// @note        如果你使用的浏览器版本低于Chrome 58	Edge 14	Firefox 54	Safari 10	Opera 55, 将代码中的let, const替换为var
// @note        perfectly compatible chorme 64+
// @grant       none
// ==/UserScript==
//'use strict';
(function () {
    //黑名单, 新添加以"|"符号隔开即可
    //下面仅作为示例,不代表作者的任何观点
    const blankList = "csdn|CSDN";
    let iTems = blankList.split("|");
    let ilength = iTems.length + 1;
    document.body.addEventListener("DOMNodeInserted", removeitems);
    function removeitems() {
        let sDom = document.getElementById("content_left");
        if (sDom == null) return;
        sDom = sDom.getElementsByClassName("c-container");
        if (sDom == null) return;
        let i = sDom.length;
        if (i === 0) return;
        i--;
        let p = 0;
        for (i; i >= 0; i--) {
            let stext = sDom[i].innerText;
            for (let k = 0; k < ilength; k++) {
                if (stext.includes(iTems[k]) === true) {
                    p++;
                    sDom[i].remove();
                    break;
                }
            }
        }
        if (p === 0) {
            return;
        } else if (p > 0 && p < 5) {
            removetips(0);
        } else {
            removetips(1); //如果多个过滤, 则搜索相关则无价值, 屏蔽
        }
        function removetips(x) {
            let sTable = document.getElementsByTagName("table");
            if (sTable == null) return;
            let m = sTable.length;
            if (m === 0) return;
            m--;
            if (x === 1) {
                sTable[m].hidden = true;
                return;
            }
            let rTable = sTable[m].getElementsByTagName("th");
            m = rTable.length;
            if (m < 1) return;
            for (let i = 0; i < m; i++) {
                let stext = rTable[i].innerText;
                for (let k = 0; k < ilength; k++) {
                    //为了避免其他元素的位置发生变化, 设置全透明
                    if (stext.includes(iTems[k]) === true) {
                        rTable[i].style.opacity = 0;
                        break;
                    }
                }
            }
        }
    }
})();