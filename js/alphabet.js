/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global $:false */

$(document).ready(function(){
    'use strict';

    var $scroller       = $('#scroller'),
        $list           = $('#list'),
        $indexArray     = $list.find('[data-type]'),
        $alphabetArray  = $scroller.find('a'),
        listIndexArray  = [];
    function updateHighlight(){
        
    }
    $indexArray.each(function(){
        var type = $(this).data('type');
        listIndexArray.push(type);
    });
    $alphabetArray.each(function(i){
        var $this   = $(this),
            link    = $this.text(),
            charCode= link.charCodeAt(0),
            lastLink;
        // TODO: without type A
        if($.inArray(charCode, listIndexArray) === -1) {
            lastLink = $alphabetArray.eq(--i).attr('href');
            $this.attr('href', lastLink)
                 .addClass('disabled');
        }
    });

});
