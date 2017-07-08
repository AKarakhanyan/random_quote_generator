var appendDiv = document.getElementById("quoteInsertion");

var requestQuote = function() {
  $.ajax({
    url:
      "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1", // The URL to the API. You can get this in the API page of the API you intend to consume
    type: "GET", // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: "json",
    success: function(data) {
      appendQuote(data);
    },
    error: function(err) {
      alert(err);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "X-Mashape-Authorization",
        "6LEbBj3BCXmshwcWjoGi339hNFILp1ZKwW2jsnkN9vpjeH4oxd"
      ); // Enter here your Mashape key
    }
  });
};

var appendQuote = function(data) {
  //remove pervious quotes
  while (appendDiv.firstChild) {
    appendDiv.removeChild(appendDiv.firstChild);
  }
  //append an empty h1 element for quote and author
  var h1Qt = document.createElement("h1");
  h1Qt.setAttribute("id", "h1Quote");
  appendDiv.append(h1Qt);
  var h1Au = document.createElement("h1");
  h1Au.setAttribute("id", "h1Author");
  appendDiv.append(h1Au);
  //append a random quote
  var randomQuote = data.quote;
  var randomQuoteAuthor = data.author;
  h1Qt.append("' " + randomQuote + " '");
  h1Au.append("- " + randomQuoteAuthor);
  //add random background color and text color
  addRandomColor();
  //remake twitter button that will include new quote data-text attribute
  $("#tweetBtn iframe").remove();
  var tweetBtn = $("<a></a>")
    .addClass("twitter-share-button")
    .attr("href", "http://twitter.com/share")
    .attr("data-url", "http://cdpn.io/yXBveQ")
    .attr("data-size", "large")
    .attr("data-text", randomQuote + " - " + randomQuoteAuthor);

  $("#tweetBtn").append(tweetBtn);
  twttr.widgets.load();
};

var addRandomColor = function() {
  var color = randomColor();
  //add random background color

  $("body").css({
    backgroundColor: color
  });
  //add same color to quote button
  $("#newQuoteButton").css({
    backgroundColor: color
  });

  //make text same color
  $("#h1Quote").animate(
    {
      color: color
    },
    1000
  );
  $("#h1Quote").css({
    color: color
  });

  $("#h1Author").animate(
    {
      color: color
    },
    1000
  );
  $("#h1Author").css({
    color: color
  });
  //make twitter button same color
  $("#tweetBtn").css("color", color);
};