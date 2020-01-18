$( document ).ready(function() {
    const $youtube_iframe = $(".media.youtube iframe");
    const $soundcloud_iframe = $(".media.soundcloud iframe");
    const youtube_iframe_src = "https://www.youtube.com/embed/9XjjFLAchb0";
    const soundcloud_iframe_src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/448310646&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";

    $youtube_iframe.attr('src', youtube_iframe_src);
    $soundcloud_iframe.attr('src', soundcloud_iframe_src);
});