/*
 * common processing each screen
 */

// key of message resource file
var resourceKey = $.url().param('resource');

// queryに指定があればそれを利用
if (resourceKey == null) {
    if ($.sessionStorage().getItem('resource_key') == null || $.sessionStorage().getItem('resource_key').length == 0) {
        resourceKey = 'ja'; // sessionStorageにも指定もなかったらとりあえずja
    } else {
        resourceKey = $.sessionStorage().getItem('resource_key');
    }
} else {
    // queryから来たものは保存
    $.sessionStorage().setItem('resource_key', resourceKey);
}

$(function() {

    //common sound
    initSound();

    // 電取内ではローディングアイコンを出さない
    if(isWiiU) {
        wiiuBrowser.prohibitLoadingIcon(true);
    }
    
    //localize
    localize(resourceKey);
    localizeOnlyDisplay(resourceKey);
    localizeNoDisplay(resourceKey);
    lazyload('img.lazy');

    // EU言語の時に消す no_EU
    if (resourceKey.match(/^(de|en|en_AU|es|fr|it|nl|pt|ru)$/)!==null) {
        localizeNoDisplay('EU');
    }

    //このページの履歴を残さない
    $('a:not(.btn_close > a)').buttonAClick().click(function(e){
        e.preventDefault();
        location.replace($(this).attr('href'));
    });

    // 閉じるボタンはhistory.back()
    $('.btn_close > a').buttonAClick().click(function(e){
        // 電取から出るときはローディングアイコンを復活させる
        if(isWiiU) {
            wiiuBrowser.prohibitLoadingIcon(false);
        }
        $(this).attr('href', '#');
        e.preventDefault();
        history.back();
    });
});

//history.back時の処理
window.onpageshow = function(e) {
}


// -------------------------------------------------  
// function    
// -------------------------------------------------  

// メッセージ差し込み
function localize(resourceKey) {
    $.ajax({
      type : 'GET',
      url : './message/messages-' + resourceKey + '.xml',
      dataType : 'xml',
      async: false,
      success : function(data) {
        $('entry', data).each(function() {
          $('[data-message="' + $(this).attr('key') + '"]', document).html($(this).text());
        });
        try{
            localizeStrAssign();
        }catch(e){}
        $('#wrap').show();
      }
    });
}

/**
 * 画像遅延読み込み
 * @method lazyload
 * @param {Object} selector jQueryセレクター
 */
function lazyload(selector) {
    $(selector).on('error', function() {
        $dataPlaceholder = $(this).data('placeholder');
        if ($dataPlaceholder !== undefined) {
            $(this).attr('src', $dataPlaceholder);
        }
    });
    $(selector).each(function() {
        var self = this;
        $dataLoaded = $(self).data('loaded');
        if ($dataLoaded === undefined || $dataLoaded === 'placeholder') {
            setTimeout(function() {
                var old_url = $(self).attr('src');
                var new_url = 'placeholder';
                $dataOriginal = $(self).data('original');
                if ($dataOriginal !== undefined && $dataOriginal !== '') {    
                    new_url = 'image/' + resourceKey + '/' + $dataOriginal;
                    $(self).attr('src', new_url);
                    $(self).data('placeholder', old_url);
                }
                $(self).data('loaded', new_url);
            }, 0);
        } 
    });
}

// xx_only タグをxxの時のみ表示する
function localizeOnlyDisplay(resourceKey) {
    $('.' + resourceKey + '_only').each(function(){
        $(this).show();
    });
}

// no_xx のタグをxxの時のみその要素以下を削除する
function localizeNoDisplay(resourceKey) {
    $('.no_' + resourceKey).each(function(){
        // 非表示にするだけだとid重複時に問題が起きるためDOMから消す
        $(this).remove();
    });
}



// Sound
function initSound(){
    if(isWiiU) {
        wiiuSound.playSoundByName('BGM_WAVE_SETTING', 3);
        $(document).on('click', '.se', function() {
            wiiuSound.playSoundByName($(this).data('se-label'), 1);
            return true;
        }).on('touchstart', function() {
            wiiuSound.playSoundByName('SE_WAVE_DRC_TOUCH_TRG', 1);
            return true;
        });
    }
}