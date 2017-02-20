/**
 * Created by ZhuangQianQian on 17/2/14.
 */
;(function($){
    var defaults = {
        divBgColor : '#eee',
        divColor : '#333',
        divBorder : '1px solid #ddd',
        ulBgColor : '#fff',
        ulColor : '#333',
        ulBorder : '1px solid #D4D4D4'
    };
    var model = {
        changeStyle : function(settings,selector){
            var className = $(selector).attr("class"),
                str = className.substr(className.indexOf("-")+1);
            $(selector).css({
                backgroundColor : settings[str+"BgColor"],
                color : settings[str+"Color"],
                border : settings[str+"Border"]
            });
        }
    };
    $.fn.select = function(option){
        var settings = $.extend({},defaults,option);
        return this.each(function(){
            var $this = $(this);
            selectHtml = '';
            selectHtml += '<div class="select-body">';
            //selectHtml += '<div class="select-body" style="left:'+$this.offset().left+'px;top:'+$this.offset().top+'px;">';
            selectHtml += '<div class="select-div" data-value='+$this.find(":selected").val()+'>'+ $this.find(":selected").text() +'</div>';
            selectHtml += '<ul class="select-ul">';
            $this.children("option").each(function(){
                var $option = $(this);
                if($this.data("value") == $option.val()){
                    selectHtml += '<li class="cur" data-value='+$option.val()+'>'+$option.text()+'</li>';
                }else{
                    selectHtml += '<li data-value='+$option.val()+'>'+$option.text()+'</li>';
                }
            });
            selectHtml += '</ul>';
            selectHtml += '</div>';
            $this.after(selectHtml);
            $this.hide();
            model.changeStyle(settings,$this.next().find(".select-div"));
            model.changeStyle(settings,$this.next().find(".select-ul"));
            $this.next().find(".select-ul li")
                .on("click",function(e){
                    $this.next().find(".select-ul li").removeClass("cur");
                    $(this).addClass("cur");
                    $(this).parent().prev().text($(this).text()).data("value",$(this).data("value"));
                    $(this).parent().slideToggle();
                    e.stopPropagation();
                });
            $this.next().find(".select-div")
                .on("click",function(e){
                    if(!($(this).next()).is(":animated")){
                        $(this).next().slideToggle();
                    }
                    e.stopPropagation();
                });
        });
    }
})(jQuery);