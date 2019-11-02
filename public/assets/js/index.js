var uniqueBurgersArr = [];

$(document).ready(function () {
  getBurgers();
  getUniqueBurgers();

  $('#buttonCreateBurger').on('click', function() {
    if ($('#inputCreateBurger').val().trim().length !== 0) {
      var newBurger = $('#inputCreateBurger').val().toLowerCase().trim();
      createBurger(newBurger);
      // if (uniqueBurgersArr.indexOf(newBurger) < 0) {
      //   console.log('unique');
      // } else {
      //   console.log('not unique')
      // }
    }
  });
  $('#buttonDelivered').on('click', function () {
    $('#burgersDeliveredHeading').removeClass('d-none');
    $('#burgersDelivered').removeClass('d-none');
    $('#burgersEatenHeading').addClass('d-none');
    $('#burgersEaten').addClass('d-none');
  });
  $('#buttonEaten').on('click', function () {
    $('#burgersDeliveredHeading').addClass('d-none');
    $('#burgersDelivered').addClass('d-none');
    $('#burgersEatenHeading').removeClass('d-none');
    $('#burgersEaten').removeClass('d-none');
  });
});

function getBurgers() {
  $.ajax({
    type: 'get',
    url: '/api/burger'
  }).done(results => {
    $('#burgersDelivered').empty();
    $('#burgersEaten').empty();
    results.forEach(curr => {
      if (!curr.devoured) {
        var burger = $(`
          <div class="col-12 col-md-6 col-lg-4 col-xl-3 pb-3">
              <div class="card p-3 overflow-hidden shadow-sm">
                  <h5>${formatName(curr.burger_name)}</h5>
                  <p class="small text-muted text-truncate">Made on ${new moment(curr.updated_at).format("MMM D, YYYY, HH:mm:ss")}</p>
                  <button class="btn btn-secondary text-truncate" data-id="${curr.id}">EAT</button>
              </div>
          </div>
        `);
        burger.find('button').on('click', function() {
          updateBurger(Number($(this).attr('data-id')));
        });
        $('#burgersDelivered').append(burger);
      } else {
        var burger = $(`
          <div class="col-12 col-md-6 col-lg-4 col-xl-3 pb-3">
              <div class="card p-3 overflow-hidden shadow-sm">
                  <h5>${formatName(curr.burger_name)}</h5>
                  <p class="small text-muted text-truncate">Eaten on ${new moment(curr.updated_at).format("MMM D, YYYY, HH:mm:ss")}</p>
              </div>
          </div>
        `);
        $('#burgersEaten').append(burger);
      }
    });
  });
}
function getUniqueBurgers() {
  $.ajax({
    type: 'get',
    url: '/api/burger/names'
  }).done(results => {
    $('#listBurgers').empty();
    $('#burgerButtons').empty();
    uniqueBurgersArr = [];
    results.forEach(curr => {
      uniqueBurgersArr.push(curr.burger_name);

      
      $('#listBurgers').append(`<option value="${formatName(curr.burger_name)}">`);

      var button = $(`<button class="list-group-item list-group-item-action py-2 px-3" data-name="${curr.burger_name}">${formatName(curr.burger_name)}</button>`);
      button.on('click', function () {
        createBurger($(this).attr('data-name'));
      });
      $('#burgerButtons').append(button);

    });
  });
}

function createBurger(name, cb) {
  $.ajax({
    type: 'post',
    url: '/api/burger',
    data: { name: name }
  }).done(results => {
    getUniqueBurgers();
    getBurgers();
  });
}

function updateBurger(id) {
  $.ajax({
    type: 'put',
    url: '/api/burger',
    data: { id: id }
  }).done(results => {
    getBurgers();
  });
}

function formatName(str) {
  strArr = str.split(' ');
  var formattedStr = '';
  strArr.forEach((curr, i) => {
    strArr[i] = curr[0].toUpperCase() + curr.substr(1);
    formattedStr += strArr[i] + (i !== strArr.length - 1 ? ' ':'');
  });

  return formattedStr;
}