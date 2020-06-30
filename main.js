function formSubmit() {
  $('form').on('submit', function (e) {
    e.preventDefault();
    $('section ul li').remove();
    $('h2').removeClass('hidden');
    gitAPI();
  });
}
function gitAPI() {
  fetch(`https://api.github.com/users/` + $('#username').val() + `/repos`)
    .then((response) => response.json())
    .then((responseJSON) => displayResults(responseJSON))
    .catch((error) => alert(error));
}
function responseHTML(response) {
  return (
    `<li>Repo name:   ` +
    response.name +
    `<a href="https://github.com` +
    response.full_name +
    `">URL:   ` +
    response.full_name +
    `</a></li>`
  );
}
function displayResults(responseJSON) {
  console.log(responseJSON);
  if (responseJSON.message === 'Not Found') {
    throw responseJSON.message;
  } else
    responseJSON.forEach((response) => {
      $('section ul').append(responseHTML(response));
    });
}
$(formSubmit);
