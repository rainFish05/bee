require.config({
	paths: {
        jquery: '/javascripts/lib/jquery',
        performance: '/javascripts/performance',
        comment: '/javascripts/comment',
        contact: '/javascripts/contact'
    }
});
 
require(['jquery','performance', 'comment', 'contact'], function($, performance, comment, contact) {
	performance.sliding();
	performance.videoPlay();
});