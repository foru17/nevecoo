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



var General = {
    init: function() {
        General.scrollToPos();
        General.checkKey();
    },

    //模拟鼠标上下滚动
    checkKey: function(e) {
        e = e || window.event;
        if (e.keyCode == '74') {
            console.log('按下键盘');
            $('html,body').stop();
            $('html,body').animate({
                scrollTop: $(window).stop().scrollTop() + 200
            }, 'fast')
        } else if (e.keyCode == '75') {
            $('html,body').stop();
            $('html,body').animate({
                scrollTop: $(window).stop().scrollTop() - 200
            }, 'fast')
        }
    },


    //平滑滚动到顶部
    scrollToPos: function(position) {
        var STR_TO_TOP = '我要飞到最高',
            coverHeight = position || $(window).height(); //获得图片高度
        var button = $('<a href="#" id="to-top" title="' + STR_TO_TOP + '"> <div class="to-top-wrap"></div></a>').appendTo('body');
        $(window).scroll(function() {
            if ($(window).scrollTop() > $(window).height()) {
                button.fadeIn(500);
            } else {
                button.fadeOut(500);
            }
        });

        button.click(function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: coverHeight - 50
            }, 1000, function() {
                window.location.hash = '#';
            });
            console.log('我跳');
        })
    },
    //处理屏幕变化时
    resize: function() {
        visualContainerWidh = $(window).width();
        // contentWidth=$('.post-content').width();
        // $('.single-post-inner img').each(function() {
        //     var _img = $(this);
        //     checkImg(_img);
        // })
    }



}


$(document).ready(function() {
    console.log('加载完毕');
    General.init();


    $('.single-post-inner p:has(img)').each(function() {

        var _this = $(this);
        _this.addClass('with-img');
        if (_this.isOnScreenVisible() == true) {
            _this.addClass('with-img').addClass('already-visible');
        }

    })




    $('.post-in-list').each(function() {
        var _this = $(this);
        if (_this.isOnScreenVisible() == true) {
            console.log('可见');
            _this.addClass('already-visible')
        }
    })
    $('.share h4').on('click', function() {
        $('.share-icons').css('display', 'block').addClass('fadeInUpBig animated')
        $(this).fadeOut(500);

        setTimeout(function() {
            $('html,body').animate({
                scrollTop: $('#share-icons').offset().top - $(window).height() / 2
            }, 1000, function() {
                // window.location.hash = '#';
            });
        }, 1000)


    })



    // $('.share h4').hover(function() {
    //     console.log('点击');
    //     $('.share-icons').css('display','block').addClass('fadeInUpBig animated')
    //     $(this).fadeOut(500);
    // }, function() {
    //     // $('.share-icons').fadeOut(500)
    // })

    $('#header').click(function() {
        console.log('下滑');
        $('html,body').animate({
            scrollTop: $(window).height() - 20
        }, 1000, function() {
            // window.location.hash = '#';
        });
        return false;
    })


    $(window).scroll(function() {

        if ($(window).scrollTop() > 50) {
            // $('.nav-header').removeClass('hide').addClass('fadeInDownBig animated')
        }

        if ($('.share-icons').isOnScreenVisible() == false) {
            $('.share-icons').removeClass('fadeInUpBig animated').css('display', 'none')
            $('.share h4').css('display', 'block');
        }


        $('.post-in-list').each(function() {
            var _this = $(this);
            if (_this.isOnScreenVisible() == true && _this.hasClass('already-visible') != true) {
                _this.addClass('fadeInUpBig animated')
            }
        })

        $('.single-post-inner p:has(img)').each(function() {
            var _this = $(this);
            if (_this.isOnScreenVisible() == true && _this.hasClass('already-visible') != true) {
                setTimeout(function() {
                    _this.addClass('with-img');
                }, 200)

            }
        })



    })

})
