<h1>Проект FIT-FRIENDS<h1>

<h2>Запуск проекта<h2>
<ul>
  <li>1. Папка environment содержит все env-example файлы для поднятия переменных окружения</li>
  <li>2. Docker: В корне каждого микросервиса файл docker-compose (docker-compose up -d)</li>
  <li>3. После того как подняли docker образы, команда для старта проекта npm run start</li>
  <li>4. В корне каждого микросерсиса находится файл для отправки запросов с заготовками [service-name].http</li>
  <li>5. Спецификация по сервису: http://localhost:[service-port]/spec/</li>
  <li>✨Список ресурсов:</li>
  <li>1. User: http://localhost:3338/api</li>
  <li>2. Comment: http://localhost:3333/api</li>
  <li>3. Gym: http://localhost:3334/api</li>
  <li>4. Order: http://localhost:3336/api</li>
  <li>5. Personal-training: http://localhost:3337/api</li>
  <li>6. Workout: http://localhost:3339/api</li>
  <li>7. RabbitMQ: http://localhost:1084/api</li>
  <li>8. Fake SMTP: http://localhost:1085/api</li>
</ul>

✨✨✨------------------------------------------------------------------------------✨✨✨

