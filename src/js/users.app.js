//  ../src/js/users.app.js
var usersApp = (function() {

  function viewUsers(){

    let uri = `${window.location.origin}/api/users`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    // once the request for all users is back from the API
    //  set them up for display
    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let users = data.users;
      let table = '';
      let rows = '';

      //Loop each user record into it's own HTML table row, each user should
      //have a link a user view
      for (let i=0; i<users.length; i++) {
        rows = rows + `<tr>
          <td>
            <a href="#view-${users[i]['_id']}">${users[i]['last_name']}, ${users[i]['first_name']}</a>
          </td>
          <td>${users[i]['username']}</td>
          <td>${users[i]['email']}</td>
        </tr>`;
      }

      //Create a users panel, add a table to the panel, inject the rows into the
      //table
      table = `<div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">Users</h2>
          <div class="float-right">
            <a href="#create" class="btn btn-primary">New User</a>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;

      //Append the HTML to the #app
      app.innerHTML = table;
    }  // end xhr.onload
  }  // end viewUsers

  function createUser(){
    var app = document.getElementById('app');

    var form =  `
        <div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Create a New User</h2>
            <div class="float-right">
              <a href="#" class="btn btn-primary">Cancel</a>
            </div>
          </div>
          <div class="card-body">
            <form id="createUser" class="card-body">
              <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="first_name">First Name</label>
                  <input type="text" id="first_name" name="first_name" class="form-control" required>
                </div>

                <div class="form-group col-md-6">
                  <label for="last_name">Last Name</label>
                  <input type="text" id="last_name" name="last_name" class="form-control" required>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="username">Username</label>
                  <input type="text" id="username" name="username" class="form-control" required>
                </div>

                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" class="form-control" required>
                </div>
              </div>

              <div class="text-right">
                <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
              </div>
            </form>
          </div>
        </div>
    `;

    app.innerHTML=form;
    processRequest('createUser', '/api/users', 'POST');
  }  // end createUser

  function viewUser(id){

    let uri = `${window.location.origin}/api/users/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';

      card = `<div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">${data.user.first_name} ${data.user.last_name}</h2>
          <div class="float-right">
            <a href="#edit-${data.user._id}" class="btn btn-primary">Edit</a>
          </div>
        </div>
        <div class="card-body">
          <div>${data.user.username}</div>
          <div>${data.user.email}</div>
        </div>
      </div>`;

      app.innerHTML = card;
    }
  }  // end viewUser

  function editUser(id){

    let uri = `${window.location.origin}/api/users/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);

      var form =  `
        <div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Edit</h2>
            <div class="float-right">
              <a href="#" class="btn btn-primary">Cancel</a>
            </div>
          </div>
          <div class="card-body">
            <form id="editUser" class="card-body">
              <input type="hidden" id="_id" name="_id" value="${data.user._id}">
              <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="first_name">First Name</label>
                  <input type="text" id="first_name" name="first_name" class="form-control" value="${data.user.first_name}" required>
                </div>

                <div class="form-group col-md-6">
                  <label for="last_name">Last Name</label>
                  <input type="text" id="last_name" name="last_name" class="form-control" value="${data.user.last_name}" required>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="username">Username</label>
                  <input type="text" id="username" name="username" class="form-control" value="${data.user.username}" required>
                </div>

                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" class="form-control" value="${data.user.email}" required>
                </div>
              </div>

              <div class="text-right">
                <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
              </div>
            </form>
          </div>
        </div>
        <div>
          <a href="#delete-${data.user._id}" class="btn text-danger">Delete</a>
        </div>
      `;

      app.innerHTML=form;

      processRequest('editUser', '/api/users', 'PUT');
    }
  }   // end editUser

  function deleteView(id){

    let uri = `${window.location.origin}/api/users/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';

      card = `<div class="card bg-transparent border-danger text-danger bg-danger">
        <div class="card-header bg-transparent border-danger">
          <h2 class="h3 text-center">You Are About to Delete a User</h2>
        </div>
        <div class="card-body text-center">
          <div>
            Are you sure you want to delete
            <strong>${data.user.first_name} ${data.user.last_name}</strong>?
          </div>

          <div>Username: <strong>${data.user.username}</strong></div>
          <div>Email: <strong>${data.user.email}</strong></div>

          <div class="text-center">
            <br>
            <a onclick=extends ../layout

            block content
              h1 Create an Article
              form(method='post' action='/users/articles')
                div
                  label(for='title') Title
                  input(type='text' name='title' id='title')
                div
                  label(for='slug') Slug
                  input(type='text' name='slug' id='slug')
                div
                  label(for='keywords') Keywords
                  input(type='text' name='keywords' id='keywords')
                div
                  label(for='description') Description
                  input(type='text' name='description' id='description')
                div
                  label(for='body') Body
                  input(type='text' name='body' id='body')
                div
                  label(for='created') Created
                  input(type='text' name='created' id='created')
                div
                  label(for='modified') Modified
                  input(type='text' name='modified' id='modified')
                div
                  label(for='published') Published
                  input(type='text' name='published' id='published')
                div
                  input(type='submit' value='submit') href="#delOne-${data.user._id}" class="btn btn-lg btn-danger text-white">
              Yes delete ${data.user.username}
            </a>

            <br><br><br>
            <a class="btn text-muted" href="#users">cancel</a>
          </div>

        </div>
      </div>`;
//  input(type='submit' value='submit') href="/app.deleteUser('${data.user._id}');" class="btn btn-lg btn-danger text-white">
      app.innerHTML = card;
    }
  }    // end deleteView

  function deleteUser(id){

    let uri = `${window.location.origin}/api/users/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function(){
      let data = JSON.parse(xhr.response);
      if(data.success === true){
        window.location.hash = '#';
      }else{
        alert('Unknown error, the user could not be deleted');
      }

    }

  }    // end deleteUser

  /**
   * process the user processing based upon the url
   * and method passed to this function
   * @param {*} formId 
   * @param {*} url 
   * @param {*} method 
   */
  function processRequest(formId, url, method){
    let form = document.getElementById(formId);
    form.addEventListener('submit', function(e){
      e.preventDefault();

      let formData = new FormData(form);
      let uri = `${window.location.origin}${url}`;
      let xhr = new XMLHttpRequest();
      xhr.open(method, uri);

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      let object = {};
      formData.forEach(function(value, key){
        object[key]=value;
      });

      xhr.send(JSON.stringify(object));

      xhr.onload = function(){
        let data = JSON.parse(xhr.response);
     //   alert(data.success);
        if(data.success===true){
          window.location.href = '#';
        }else{
          document.getElementById('formMsg').style.display='block';
        }
      }

    });  // end addEventListener in the processRequest
    
  }   // end processRequest

  return {

    deleteUser: function(id){
      deleteUser(id);
    },
    /**
     * Upon load of the form - determine which
     * proces should be invoked based on the hash # code
     * following the /user/app 
     * e.g. /user/app#view-1231234
     *      /user/app#create
     */
    load: function(){
      let hash = window.location.hash;
      let hashArray = hash.split('-');

      switch(hashArray[0]){
        case '#create':
          createUser();
          break;

        case '#view':
          viewUser(hashArray[1]);
          break;

        case '#edit':
          editUser(hashArray[1]);
          break;

        case '#delete':
          deleteView(hashArray[1]);
          break;

        case '#delOne':
            deleteUser(hashArray[1]);
            break;

        default:
          viewUsers();
          break;
      }
    }
  }  // end return

})();  // end usersApp

usersApp.load();

window.addEventListener("hashchange", function(){
  usersApp.load();
});