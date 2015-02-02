$.fn.extend({
    isOnScreenVisible: function() {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    }
});




$(document).ready(function() {
    console.log('加载完毕');

    $('.post_in_list').each(function() {
        var _this = $(this);
        if (_this.isOnScreenVisible() == true) {
            console.log('可见');
            _this.addClass('already-visible')
        }
    })


    $(window).scroll(function() {
        $('.post_in_list').each(function() {
            var _this = $(this);
            if (_this.isOnScreenVisible() == true && _this.hasClass('already-visible') != true) {
                // console.log($(this));
                _this.addClass('fadeInUpBig animated')
            }
        })
    })


})
