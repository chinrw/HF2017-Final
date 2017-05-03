$(document).ready(function() {
  let filename = $('body').attr('data-file');

  // Fetch data file
  $.getJSON(filename, function(data) {

    // Set the page title
    $('#page-title').text(data.title);

    if (data.details) {
      setupDetails(data.details);
    }

    if (data.images) {
      setupCarousel(data.images);
    }

    if (data.sections) {
      setupSections(data.sections);
    }
  });
});

function setupDetails(details) {
  $.each(details, function(key, val) {
    $('#details').append('<p><b>' + key + ':</b> ' + val + '</p>')
  })
}

function setupCarousel(images) {
  $.each(images, function(key, val) {
    // Create new carousel item
    let item = $('<div class="carousel-item"></div>')
    if (key == 0) {
      item.addClass('active')
    }

    // Add image to
    switch (val.fit) {
      case 'cover':
        {
          item.append('<img class="cover" src="images/' + val.filename + '">')
          break;
        }
      case 'contain':
      default:
        {
          item.append('<img src="images/' + val.filename + '">')
          break;
        }
    }

    // If there is a caption add that too
    if (val.caption) {
      item.append('<p class="caption">' + val.caption + '</p>')
    }

    $('#carousel').append(item)
  })

  // Initialize carousel
  $('#carousel').carousel({
    fullWidth: true
  })
}

function setupSections(sections) {
  $.each(sections, function(key, val) {
    // Create section
    let section = $('<div class="section" id="' + val.tag.trim() + '"></section>')
    if (key == 0) {
      section.addClass('active')
    }

    // Add section title and divider
    section.append('<h5>' + val.title + '</h5>')
    section.append('<div class="divider"></div>')

    $.each(val.body, function(key, val) {
      section.append('<p>' + val + '</p')
    })

    // Add section to page
    $('#sections').append(section)

    // Add the section to the navigation
    let navElem = $('<li class="tab"><a class="active" href="#' + val.tag.trim() + '">' + val.title + '</a></li>')
    if (key == 0) {
      navElem.find('a').addClass('active')
    }

    // Add section to navigation
    $('#page-nav').append(navElem)
  })

  // Initialize tabs
  $('#page-nav.tabs').tabs()
}
