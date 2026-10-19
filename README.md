# Chat App

Демо работает без регистрации и ключей: после открытия приложения выберите контакт и отправьте сообщение. Данные демо сохраняются только в браузере; кнопка «Сбросить демо» возвращает исходные переписки.

Режим Green API доступен по ссылке «Подключить Green API». Для него нужны собственные `IdInstance` и `ApiTokenInstance`; данные хранятся в `sessionStorage` до закрытия вкладки. Для обновления GitHub Pages используется `.github/workflows/deploy.yml` из ветки `Redux`.

Опубликованное демо: https://detkovvv.github.io/chat-app/.

<h1 align="center">Инструкция для локального запуска проекта</h1>
Клонируем проект к себе локально с помощью git clone <a href="https://github.com/detkovvv/chat-app.git" target="_blank">"https://github.com/detkovvv/chat-app.git"</a>,
затем скачиваем все зависимости с помощью команды <b>"yarn install"</b> и запускаем приложение <b>"yarn dev"</b>.

Чтоб задеплоить приложение выполняем <b>yarn deploy</b>.<br/>
Демо доступно по адресу https://detkovvv.github.io/chat-app/.

<h2 align="center">Инструкция для входа в приложение</h2>
Для входа в приложение потребуется <b>IdInstance</b> и <b>ApiTokenInstance</b> - их можно получить <a href="https://green-api.com/" target="_blank">"https://green-api.com/"</a><br/>
Ваш аккаунт должен быть авторизован, всю инструкцию можно посмотреть на сайте <a href="https://green-api.com/" target="_blank">"https://green-api.com/"</a>

В личном кабинете нужно обязательно поставить галочки в Уведомлении <b>"Получать уведомления о входящих сообщениях и файлах"</b>, <b>"Получать уведомления о сообщениях, отправленных с телефона"</b>.
