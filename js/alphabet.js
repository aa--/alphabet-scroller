/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global $:false */

$(document).ready(function(){
    'use strict';

    var $scroller       = $('#scroller'),                   // 滚动条
        $list           = $('#list'),                       // 列表
        $indexArray     = $list.find('[data-type]'),        // 列表锚点的jquery对象
        $alphabetArray  = $scroller.find('a'),              // 字母链接的jquery对象
        $itemArray      = $list.find('li li'),              // 列表项
        $firstItem      = $itemArray.eq(0),                 // 第一项
        listIndex       = '',                               // 列表索引组成的字符串
        itemHeight      = $firstItem.height(),              // item高度
        listHeight      = $list.height(),                   // 列表显示高度
        visiableNum     = parseInt(listHeight / itemHeight, 10),
        n,
        highlightStart  = '',                               // 当前高亮首项
        highlightEnd    = '',                               // 当前高亮末项
        timer,
        firstIndex      = '',                               // 索引首位
        firstHref       = '',                               // 首位链接
        $firstAlphabet;                                     // 首个字母链接jquery对象
    //--- 更新滚动条 ----------------------------------------------
    function updateHighlight() {
        n = - parseInt($firstItem.position().top / itemHeight, 10);
        highlightStart = unicodeOffsetA($itemArray.eq(n).text());
        highlightEnd = unicodeOffsetA($itemArray.eq(n+visiableNum).text());
        $alphabetArray.removeClass('highlight');
        $alphabetArray.slice(highlightStart, highlightEnd + 1)
                      .addClass('highlight');
    }
    //--- turn to charCode offset to 'A' ----------------------------------------------
    function unicodeOffsetA(name) {
        return name.toUpperCase().charCodeAt(0) - 65;
    }
    //--- initialize listIndex ----------------------------------------------
    $indexArray.each(function() {
        var type = $(this).data('type');
        listIndex += type;
    });
    //--- without type A ----------------------------------------------
    firstIndex = listIndex.slice(0,1);
    if(firstIndex !== 'A') {
        $firstAlphabet = $alphabetArray.eq(0);
        firstHref = $firstAlphabet.attr('href');
        firstHref = firstHref.slice(0, -1) + firstIndex;
        $firstAlphabet.attr('href', firstHref)
                      .addClass('disabled');
    }
    //--- scroller map to list ----------------------------------------------
    $alphabetArray.each(function(i) {
        var $this   = $(this),
            link    = $this.text(),
            lastLink;
        if(listIndex.indexOf(link) === -1 && i) {
            lastLink = $alphabetArray.eq(--i).attr('href');
            $this.attr('href', lastLink)
                 .addClass('disabled');
        }
    });

    updateHighlight();
    $list.bind('scroll', function() {
        //updateHighlight();
        if(timer) {
            clearTimeout(timer);
            timer = 0;
        }
        timer = setTimeout(function() {
                    updateHighlight();
                }, 50);
    });
});
