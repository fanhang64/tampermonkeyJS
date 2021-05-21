// ==UserScript==
// @name         Bing_Search_Result_Filter
// @author       fanhang64
// @update      2021-05-21
// @version      0.2
// @description  过滤必应搜索结果
// @include     https://cn.bing.com/*
// @grant        none
// ==/UserScript==
//    'use strict';
(function() {
    const blankList = "csdn|CSDN";
    let iTems = blankList.split("|")
    let iLength = iTems.length;
    document.body.addEventListener("DOMNodeInserted", removeitems);

    function removeitems(){
        let sDom = document.getElementById("b_results")
        if (sDom == null) return;
        let liDoms = sDom.getElementsByClassName("b_algo");
        if (liDoms){
            exec_remove(liDoms);
        }
        let liBansDoms = sDom.getElementsByClassName("b_ans");
        if (liBansDoms){
            exec_remove(liBansDoms);
        }
        
    }
    function exec_remove(elems){
        for(let i=elems.length-1; i>=0; i--){
            let stext = "";
            let b_caption = elems[i].getElementsByClassName('b_caption');
            if(!b_caption){
                continue;
            }
            stext = b_caption[0].innerText;
            for(let k = 0; k < iLength; k++){
                if(stext.includes(iTems[k]) === true){
                    if(elems[i] && elems[i].remove){
                       elems[i].remove();
                    }
                }
            }
        }
    }
})();