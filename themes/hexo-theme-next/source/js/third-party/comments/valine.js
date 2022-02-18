/* global NexT, CONFIG, LivereTower */

document.addEventListener('page:loaded', () => {
    // if (!CONFIG.page.comments) return;
    NexT.utils.getScript('https://unpkg.com/valine/dist/Valine.min.js', {})
    .then(() => {
        var GUEST = ['nick', 'mail', 'link'];
        var guest = '{{ theme.valine.guest_info }}';
        guest = guest.split(',').filter(function(item) {
            return GUEST.indexOf(item) > -1;
        });
        new Valine({
            el: '#comments',
            appId: CONFIG.valine.appid,
            appKey: CONFIG.valine.appkey,
            placeholder: CONFIG.valine.placeholder,
            avatar: CONFIG.valine.avatar,
            meta: guest,
            pageSize: CONFIG.valine.pageSize || 10,
            visitor: CONFIG.valine.visitor,
            recordIP: CONFIG.valine.recordIP
        });
    });
});
  