<h1>Проект FIT-FRIENDS<h1>

<h2>Запуск проекта<h2>
<ol>
  <li>Папка environment содержит все env-example файлы для поднятия переменных окружения</li>
  <li>Docker: В корне каждого микросервиса сервиса файл docker-compose (docker-compose up -d)</li>
  <li>После того как подняли docker образы, комманда для старта всех серисов npm run start</li>
  <li>В корне каждого микросерсиса находится файл для отправки запросов с заготовками [service-name].http</li>
  <li>Спецификация по сервису: http://localhost:[service-port]/spec/</li>
</ol>