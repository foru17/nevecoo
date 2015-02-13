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


var Duoshuo = {

    dataThreadKey: location.protocol + '//' + location.host + location.pathname,

    init: function() {
        Duoshuo.toggleBox();
    },

    toggleBox: function() {

        $('.toggle-comment').on('click', function(container) {
            // console.log('开启评论');
            if ($('.comment-area').has('div').length > 0) {
                $('.comment-area').empty();
                return;
            }
            var el = document.createElement('div');
            el.setAttribute('data-thread-key', Duoshuo.dataThreadKey);
            el.setAttribute('data-url', location.href);
            DUOSHUO.EmbedThread(el);
            $('.comment-area').append(el);

            setTimeout(function() {
                $('.comment-area').addClass('toggle-up');
            }, 500)


            setTimeout(function() {
                if ($('.comment-area').isOnScreenVisible() == true) {
                    $('.toggle-comment').addClass('animated fadeOut').fadeOut(500)
                }
            }, 1000)



        })

    }
}





var General = {
    init: function() {
        General.scrollToPos();
        General.checkKey();
        General.updateImageWidth();
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

    updateImageWidth: function() {
        var $postContent = $(".post-content");
        $postContent.fitVids();

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $(".single-post-inner img").on('load', updateImageWidth);

        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
    },

    /*给文章中的url添加iconfont方便识别*/
    urlIconlize: function(url) {
        var domain,
            _output;
        var iconMap = { /*索引 可在这里添加匹配规则*/
            'twitter': 'icon-twitter',
            'qzone': 'icon-qzone',
            'weibo': 'icon-weibo',
            'facebook': 'icon-facebook',
            'github': 'icon-github',
            'douban': 'icon-douban',
            'google': 'icon-google',
            'luolei': 'icon-luolei',
            'dribble': 'icon-dribble'

        }

        for (var name in iconMap) {
            if (typeof iconMap[name] !== 'function') {
                var MapKey = name;
                if (url.indexOf(MapKey) >= 0) {
                    domain = MapKey;
                    _output = iconMap[MapKey];
                }
            }
        }

        return _output;
    },

    addIcons: function() {
        /*给博客文章地址url添加ico识别*/
        $('.single-post-inner p a:not(:has(img))').each(function(i) {
            var _src = $(this).attr('href');
            var tmp = document.createElement('a');
            tmp.href = _src;
            _selfDomain = tmp.hostname;
            General.urlIconlize(_selfDomain);
            console.log(_selfDomain);
            //$(this).append(urlIconlize(_selfDomain));
            $(this).prepend('<i class="iconfont ' + General.urlIconlize(_selfDomain) + '"></i>');
            var _selfColor = $(this).find('i').css('color'),
                _originalColor = $(this).css('color');

            /*鼠标悬浮时*/
            $(this).hover(function() {
                $(this).css('color', _selfColor);
                $(this).addClass('animated pulse');
            }, function() {
                $(this).css('color', _originalColor);
                $(this).removeClass('animated pulse');
            });

        });
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
    General.init();
    General.updateImageWidth();
    // 加载多说评论
    Duoshuo.init();



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
            _this.addClass('already-visible')
        }
    })
    $('.share h4').on('click', function() {
        $('.share-icons').css('display', 'block').addClass('fadeInUpBig animated')
        $(this).fadeOut(500);

        // setTimeout(function() {
        //     $('html,body').animate({
        //         scrollTop: $('#share-icons').offset().top - $(window).height() / 2
        //     }, 1000, function() {
        //         // window.location.hash = '#';
        //     });
        // }, 1000)


    })

    $('#header').click(function() {
        console.log('下滑');
        $('html,body').animate({
            scrollTop: $(window).height() - 20
        }, 1000, function() {
            // window.location.hash = '#';
        });
        return false;
    })


    if ($('body').hasClass('post-template')) {
        // console.log('处理图标');
        $('img[alt="cover"]').addClass('cover-image');
        General.addIcons();
    }

        if ($('body').hasClass('archive-template') || $('body').hasClass('home-template')) {
    $('.post-excerpt').each(function(){
        var _this = $(this);
        if(_this.has('img').length == 0){
            console.log('没有图片');
            _this.append('<img src="https://luoleiorg.b0.upaiyun.com/tmp/nev-set.jpg"></img>')
        }else{
            console.log('With');
        }
    })
        }




    $(window).scroll(function() {

        if ($(window).scrollTop() > 50) {
            // $('.nav-header').removeClass('hide').addClass('fadeInDownBig animated')
        }

        if ($('.share-icons').isOnScreenVisible() == false) {
            $('.share-icons').removeClass('fadeInUpBig animated').css('display', 'none')
            $('.share h4').css('display', 'block');
        }

        if ($('body').hasClass('archive-template') || $('body').hasClass('home-template')) {
            $('.post-in-list').each(function() {
                var _this = $(this);
                if (_this.isOnScreenVisible() == true && _this.hasClass('already-visible') != true) {
                    _this.addClass('fadeInUpBig animated')
                }
            })
        }

        // $('.single-post-inner p:has(img)').each(function() {
        //     var _this = $(this);
        //     if (_this.isOnScreenVisible() == true && _this.hasClass('already-visible') != true) {
        //         setTimeout(function() {
        //             _this.addClass('with-img');
        //         }, 200)

        //     }
        // })



    })

})
