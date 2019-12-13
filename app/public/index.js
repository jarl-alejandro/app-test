(function() {
  const api = document.getElementById('api').value
  const ioURL = document.getElementById('io').value

  const $list = document.getElementById('listTasks')
  const $button = document.getElementById('button')
  const $name = document.getElementById('name')

  $button.addEventListener('click', onNewTask)
  $name.addEventListener('keyup', onEnterName)
  fetchTask()

  const socket = window.io(ioURL)
  socket.on('created::task', data => {
    renderTask(data)
    $name.value = ''
  })

  function onEnterName (event) {
    if (event.keyCode === 13) {
      if (!$name.value) return false

      const object = { name: $name.value }
      socket.emit('created::task', object)
    }
  }

  function onNewTask () {
    if (!$name.value) return false

    const object = { name: $name.value }
    socket.emit('created::task', object)
  }

  function fetchTask () {
    window.fetch(`${api}/tasks`)
    .then(response => response.json())
    .then(json => renderAll(json))
  }

  function renderAll (tasks) {
    tasks.forEach(task => renderTask(task))
  }

  function renderTask (task) {
    const li = document.createElement('li')
    li.innerText = task.name
    $list.appendChild(li)
  }

})()