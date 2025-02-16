# KAIZEN MERN VideoLibrary

## v1.2 - 09.02.2025

### English:

-   **Modified the system for adding new entries**: When a user submits a new entry through a special page, it is marked with a specific parameter that prevents this information from being publicly displayed until an administrator approves the entry.
-   **Implemented admin panel**: An admin user can now delete entries from the database and also confirm the addition of new entries.

### Українська:

-   **Змінено систему додавання нових записів**: коли користувач додає новий запис через спеціальну сторінку, він позначається певним параметром, що не дозволяє опублікувати цей запис, доки адміністратор не підтвердить його.
-   **Реалізовано адмінпанель**: користувач-адміністратор тепер може видаляти записи з бази даних, а також підтверджувати додавання нових записів.

---

## v1.1 - 26.01.2025

### English:

-   **Implemented authentication system**: Now users can register and log in to the website.
-   **Implemented server-side logger**: A logger is now being used on the server, providing structured and efficient log storage for diagnostics and monitoring.
-   **Added component animations**: Animation for certain components has been implemented, enhancing user experience and giving the website a more dynamic look.

### Українська:

-   **Імплементовано систему аутентифікації**: тепер користувач може зареєструватись а також увійти до вебсайту.
-   **Використання логера на серверній частині**: тепер на сервері використовується логер, який забезпечує структуроване та ефективне збереження логів для діагностики та моніторингу.
-   **Додано анімацію компонентів**: реалізовано анімацію для деяких компонентів, що покращує користувацький досвід і надає вебсайту більш динамічного вигляду.

---

## v1.1 - 12.01.2025

### English:

-   **Controller removed**: Its functions are now handled by the router. This simplifies the code, as the multer library calls for file uploads can now be placed in the router instead of the controller.
-   **IP addresses in .env**: Server and client IP addresses are now stored in .env files and used in the code as needed. This allows for easy address configuration by changing just a few variables.
-   **UI redesigned**: The user interface design of the site has been completely rewritten, considering some previous requirements.
-   **Unnecessary elements removed**: Elements that are no longer used or do not meet the requirements have been removed.
-   **Added CHALK module**: A library for coloring strings and characters in the console.

### Українська:

-   **Контролер видалено**: Його функції тепер виконує роутер. Це спростило код, адже виклики бібліотеки multer для завантаження файлів тепер можуть знаходитися в роутері, а не в контролері.
-   **IP-адреси у .env**: IP-адреси сервера та клієнта тепер зберігаються у файлах .env і використовуються у коді при необхідності. Це дозволяє легко змінювати адресацію шляхом зміни лише декількох змінних.
-   **UI переписано**: Дизайн користувацького інтерфейсу сайту був повністю переписаний з урахуванням деяких попередніх вимог.
-   **Видалено непотрібні елементи**: Були видалені елементи, які більше не використовуються або не відповідають вимогам.
-   **Додано модуль CHALK**: Бібліотека для можливості фарбувати рядки та символи у консолі.

---

## v1.0 [stable] - 13.05.2024

### English:

**'KAIZEN' birthdate**
First stable version of the Music (Media) Library that works somelike a YouTube Music (i mean you can find a song by its author and title, and music is in the form of video)
but still lacks the authentication.
