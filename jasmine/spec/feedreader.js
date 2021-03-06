let bodyEle = document.body;
let menuIcon = document.querySelector(".menu-icon-link");
let feed = document.querySelector(".feed");
let feedArr = [];
let feed1;
let feed2;
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* DONE - Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("has a URL defined", function() {
        for (var feedURL in allFeeds) {
          expect(allFeeds[feedURL].url).toBeDefined();
          expect(allFeeds[feedURL].url.length).not.toBe(0);
        }
      });

      /* DONE - Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("has a Name defined", function() {
        for (var feedName in allFeeds) {
          expect(allFeeds[feedName].name).toBeDefined();
          expect(allFeeds[feedName].name.length).not.toBe(0);
        }
      });
    });

    /* DONE: Write a new test suite named "The menu" */
    describe("The menu", function() {
      /* DONE - Write a test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */
      it("is hidden by default", function() {
        expect(bodyEle.classList.contains("menu-hidden")).toBe(true);
      });
      /* DONE - Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it("changes visibility when menu icon is clicked", function() {
        menuIcon.click();
        expect(bodyEle.classList.contains("menu-hidden")).toBe(false);
        menuIcon.click();
        expect(bodyEle.classList.contains("menu-hidden")).toBe(true);
      });
    });
    /* DONE - Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* DONE - Write a test that ensures when the loadFeed
           * function is called and completes its work, there is at least
           * a single .entry element within the .feed container.
           * Remember, loadFeed() is asynchronous so this test will require
           * the use of Jasmine's beforeEach and asynchronous done() function.
           */
      // Wait for loadFeed() to finish it's work before checking if an entry exists
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("contain at least one .entry element within the .feed container", function() {
        //After loadFeed() completes, checks to see if at least 1 .entry is in .feed
        // expect(feed.length).not.toBe(0);
        expect($(".feed .entry").length).not.toBe(0);
      });
    });
    /* DONE - Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      /* DONE - Write a test that ensures when a new feed is loaded
           * by the loadFeed function that the content actually changes.
           * Remember, loadFeed() is asynchronous.
      */
      beforeEach(function(done) {
        // load first entry into feed and push to empty array for comparison
        loadFeed(0, function() {
          feed1 = document.querySelector(".feed .entry").innerHTML;
          feedArr.push(feed1);
          // load second entry into feed and push to empty array for comparison
          loadFeed(1, function() {
            feed2 = document.querySelector(".feed .entry").innerHTML;
            feedArr.push(feed2);
            done();
          });
        });
      });

      it("content changes when new feed is loaded", function() {
        expect(feedArr.length).toBe(2);
        expect(feedArr[0] !== feedArr[1]).toBe(true);
      });
    });
  })()
);
