/*
Credits: this script is shamelessly borrowed from
https://github.com/kitian616/jekyll-TeXt-theme
*/
(function() {
    console.log('tags函数运行了')

    //得出url中所有搜索词数组对象
    function queryString() {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var i = 0, queryObj = {}, pair;
      var queryStr = window.location.search.substring(1);
      var queryArr = queryStr.split('&');
      for (i = 0; i < queryArr.length; i++) {
        pair = queryArr[i].split('=');

        // If first entry with this name
        if (typeof queryObj[pair[0]] === 'undefined') {
          queryObj[pair[0]] = pair[1];

          // If second entry with this name
        } else if (typeof queryObj[pair[0]] === 'string') {
          queryObj[pair[0]] = [queryObj[pair[0]], pair[1]];

          // If third or later entry with this name
        } else {
          queryObj[pair[0]].push(pair[1]);
        }
      }
      return queryObj;
    }
  
    var setUrlQuery = (function() {
      var baseUrl =  window.location.href.split('?')[0];
      return function(query) {
        if (typeof query === 'string') {
          window.history.replaceState(null, '', baseUrl + query);
        } else {
          window.history.replaceState(null, '', baseUrl);
        }
      };
    })();
  
    $(document).ready(function() {

      var $tags = $('.js-tags');//词云区
      var $articleTags = $tags.find('.tag-button');//tag按钮
      var $tagShowAll = $tags.find('.tag-button-all');//show all 按钮
      var $result = $('.js-result');//文章结果展示区
      var $sections = $result.find('section');//年份分区
      var sectionArticles = []//初始文章
      var $lastFocusButton = null;
      var sectionTopArticleIndex = [];
      var hasInit = false;
  
      //初始文章为所有分区的所有文章[[...,...],[...,...]]
      $sections.each(function() {
        sectionArticles.push($(this).find('.item'));
      });
  
      function init() {
        var i, index = 0;
        for (i = 0; i < $sections.length; i++) {
          sectionTopArticleIndex.push(index);
          index += $sections.eq(i).find('.item').length;
        }
        sectionTopArticleIndex.push(index);
      }
  
      function searchButtonsByTag(_tag/*raw tag*/) {
        if (!_tag) {
          return $tagShowAll;
        }
        var _buttons = $articleTags.filter('[data-encode="' + _tag + '"]');
        if (_buttons.length === 0) {
          return $tagShowAll;
        }
        return _buttons;
      }
  
      function buttonFocus(target) {
        if (target) {
          target.addClass('focus');
          $lastFocusButton && !$lastFocusButton.is(target) && $lastFocusButton.removeClass('focus');
          $lastFocusButton = target;
        }
      }

      //用obj记录命中tag的分区文章
    function tagSelect (tag/*raw tag*/, target) {
        var result = {}, $articles;
        var i, j, k, _tag;
  
        for (i = 0; i < sectionArticles.length; i++) {
          $articles = sectionArticles[i];
          for (j = 0; j < $articles.length; j++) {
            if (tag === '' || tag === undefined) {
              result[i] || (result[i] = {});
              result[i][j] = true;
            } else {
              var tags = $articles.eq(j).data('tags').split(',');
              for (k = 0; k < tags.length; k++) {
                if (tags[k] == tag) {
                  result[i] || (result[i] = {});
                  result[i][j] = true; 
                  //文章的一个tag命中即可，文章的其他tag不需要再继续比对
                  break;
                }
              }
            }
          }
        }
  
        //根据tag匹配结果修改classname
        for (i = 0; i < sectionArticles.length; i++) {
          result[i] && $sections.eq(i).removeClass('d-none');
          result[i] || $sections.eq(i).addClass('d-none');
          for (j = 0; j < sectionArticles[i].length; j++) {
            if (result[i] && result[i][j]) {
              sectionArticles[i].eq(j).removeClass('d-none');
            } else {
              sectionArticles[i].eq(j).addClass('d-none');
            }
          }
        }
  
        //初始化结果修改
        hasInit || ($result.removeClass('d-none'), hasInit = true);
  
  
        if(target){
            //如果本次按钮与上一次按钮不同
            if($lastFocusButton.attr('data-encode') != target.attr('data-encode')){
                buttonFocus(target);
                //获取按钮名称
                _tag = target.attr('data-encode');
                if(_tag === '' || typeof _tag !== 'string'){
                    setUrlQuery();
                }else{
                    setUrlQuery('?tag=' + _tag);
                }
            }else{
                //如果本次按钮与上一次按钮相同
                $lastFocusButton.removeClass('focus');
                $tagShowAll.addClass('focus');
                $lastFocusButton = $tagShowAll;
                //所有文章重新出现
                for (i = 0; i < sectionArticles.length; i++) {
                    $sections.eq(i).removeClass('d-none');
                    for (j = 0; j < sectionArticles[i].length; j++) {
                        sectionArticles[i].eq(j).removeClass('d-none');
                    } 
                }
                hasInit = false;
                var baseUrl =  window.location.href.split('?')[0];
                window.history.replaceState(null, '', baseUrl);
            }
        }else{
          buttonFocus(searchButtonsByTag(tag));
        }
    }
  
        var query = queryString(), 
            _tag = query.tag;
  
        init(); 
        tagSelect(_tag);

        //因为tags.onClick一直在监听,所以主函数运行一次后，后续所有点击事件都能被监听到
        $tags.on('click', 'a', function() {   /* only change */
            tagSelect($(this).data('encode'), $(this));
        });
  
    });
  })();

