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

  /* This is our first test - it tests to make sure that the
   * allFeeds variable has been defined and that it is not
   * empty.
   */
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });



    /* This test loops through each feed in the allFeeds object
     * Ensures they each have a URL defined and that it is not empty
     */
    it('has an URL and the URL is not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.constructor).toBe(String);
        expect(feed.url.length).not.toBe(0);
      }
    });


    /* This test loops through each feed in the allFeeds object
     * and ensures it has a name defined and is not empty
     */
    it('has a name and the name is not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  /* Test suite for the menu */
  describe('The menu', function() {

    /* This test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it('is hidden by default', function() {
      let isHidden = document.body.classList.contains('menu-hidden');
      expect(isHidden).toBe(true);
    });

    /* This test simulates a click and ensures that when the menu icons
     * is clicked it toggles between being hidden and visible.
     */

    it('toggles view when icon is clicked', function() {
      let menuIcon = document.querySelector('a.menu-icon-link');
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });



  /* Test suite for Initial Entries */

  describe('Initial Entries', function() {

    /* This test ensures that when teh loadFeed function is called it runs
     * and that there is at least a single .entry element in the .feed container
     */

    beforeEach(function(done) {
      loadFeed(1, done);
    });

    it('has entries in feed container', function() {
      let feedContainer = document.querySelector('div.feed');
      let entries = feedContainer.querySelectorAll('article.entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  });



  /* Test suite named New Feed Selection */
  describe('New Feed Selection', function() {

    /* This test ensures that when a new feed is loaded by the loadFeed
     * function, the content actually changes
     */

    let firstFeed, secondFeed;

    beforeEach(function(done) {
      loadFeed(3, function() {
        firstFeed = document.querySelector('div.feed').innerHTML;
        loadFeed(2, function() {
          secondFeed = document.querySelector('div.feed').innerHTML;
          done();
        });
      });
    });


    it('loads new feeds', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });
  });


}());
