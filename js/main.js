var db = [
  { name: '张三', email: 'zhangsan@gmail.com', age: 15 },
  { name: '李四', email: 'lisi@gmail.com', age: 25 },
  { name: '王五', email: 'wangwu@gmail.com', age: 35 },
];

(function Avatars(db) {
  this.init = function() {
    this.generateList()
    this.enterUser()
  }

  this.generateList = function() {
    var parent = document.querySelector('#parent_avatars')
    var template = ``

    db.forEach((item, index) => {
      template += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-delete" data-card="${index}">x</div>
            <div class="card-block">
              <h3 class="card-title">${item.name}</h3>
              <p class="card-text">
                <strong>邮箱：</strong>${item.email}
              </p>
              <p class="card-text">
                <strong>年龄：</strong>${item.age}
              </p>
            </div>
          </div>
        </div>
      `
    })

    parent.innerHTML = template
    deleteCard()
  }

  this.enterUser = function() {

    function grabUser() {
      var name = document.querySelector('#user_name').value
      var email = document.querySelector('#user_email').value
      var age = document.querySelector('#user_age').value

      var elements = [name, email, age]

      if (validateUser(elements)) {
        document.querySelector('#myForm').reset()

        db.push({
          name: name,
          email: email,
          age: age
        })
        generateList()
      } else {
        document.querySelector('#error').style.display = 'block'
        setTimeout(() => {
          document.querySelector('#error').style.display = 'none'
        }, 2000);
      }
    }

    document.querySelector('#myForm').addEventListener('submit', function(e) {
      e.preventDefault()
      grabUser()
    })
  }

  this.validateUser = function(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === '') {
        return false
      }
    }

    return true
  }

  this.deleteCard = function() {
    var buttons = document.querySelectorAll('.card-delete')

    function deleteThis(element) {
      var obj = element.getAttribute('data-card')
      db.splice(obj, 1)
      generateList()
    }

    for (let i = 0; i < buttons.length; i++) {
      var button = buttons[i]
      button.addEventListener('click', function(e) {
        deleteThis(this)
      })
    }
  }

  this.init()
})(db);
