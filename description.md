<h1>Проект FIT-FRIENDS<h1>

<h2>Запуск проекта<h2>
<ol>
  <li>Папка environment содержит все env-example файлы для поднятия переменных окружения</li>
  <li>Docker: В корне каждого микросервиса файл docker-compose (docker-compose up -d)</li>
  <li>После того как подняли docker образы, команда для старта проекта npm run start</li>
  <li>В корне каждого микросерсиса находится файл для отправки запросов с заготовками [service-name].http</li>
  <li>Спецификация по сервису: http://localhost:[service-port]/spec/</li>
</ol>
✨✨✨
------------------------------------------------------------------------------------------------
<h3>Список ресурсов</h3>
<ol>
  <li>User: http://localhost:3338/</li>
  <li>Comment: http://localhost:3333/</li>
  <li>Gym: http://localhost:3334/</li>
  <li>Order: http://localhost:3336/</li>
  <li>Personal-training: http://localhost:3337/</li>
  <li>Workout: http://localhost:3339/</li>
  <li>RabbitMQ: http://localhost:1084/</li>
  <li>Fake SMTP: http://localhost:1085/</li>
</ol>

✨✨✨