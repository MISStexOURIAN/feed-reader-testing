/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function () {
        // allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // defined and present URL
        it('url present', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // name defined and not empty
        it('name present', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function () {
        const button = $('.menu-icon-link');


        // menu is hidden by default
        it('hidden menu default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // menu appears on click and disappears on second click
        it('toggle menu open/closed on click', function () {
            button.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            button.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function () {

        // at least 1 entry in feed container after loadFeed is called
        // *asynchronous*
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('feed containes at least one entry', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        const feed = $('.feed');
        let feed1;

        // when a new feed is loaded, make sure it's different from any others
        // *asynchronous*

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed1 = feed.html();
                loadFeed(1, done);
            });
        });

        it('new feed contains different info', function (done) {
            expect(feed.html()).not.toBe(feed1);
            done();
        });

    })
}());
