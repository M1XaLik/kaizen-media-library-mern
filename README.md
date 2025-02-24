# KAIZEN MERN VideoLibrary

## v1.3 - 19.02.2025

### English:

-   **Implemented loader**: A loader has been integrated to display an animated indicator during page transitions and data fetching. This enhancement helps ensure a smooth user experience by preventing layout shifts and visual glitches caused by unstyled or incomplete content.
-   **Fixed bugs and restricted navbar visibility on specific pages**: Resolved various bugs affecting the application's functionality. Additionally, the navbar is now hidden on designated pages to enhance user experience and maintain a cleaner interface where necessary.
-   **Expanded admin privileges**: Administrators now have extended permissions, allowing them to delete all elements within the system. This improvement provides greater control over content management and system maintenance.

### Українська:

-   **Імплементовано loader**: До системи інтегровано лоадер, що відображає анімований індикатор під час завантаження сторінок та даних. Це покращення сприяє плавному користувацькому досвіду, запобігаючи зсувам макету та візуальним збоєм через неповний або неоформлений контент.
-   **Виправлено баги та обмежено відображення Navbar на певних сторінках**: Усунуто різні помилки, що впливали на роботу застосунку. Крім того, Navbar тепер приховується на визначених сторінках для покращення користувацького досвіду та збереження чистого інтерфейсу там, де це потрібно.
-   **Розширено права адміністратора**: Адміністратори отримали розширені дозволи, що дозволяють видаляти всі елементи в системі. Це покращення надає більше контролю над управлінням контентом і обслуговуванням системи.

---

## v1.2 - 09.02.2025

### English:

-   **Modified the system for adding new entries**: When a user submits a new entry through a special page, it is marked with a specific parameter that prevents this information from being publicly displayed until an administrator approves the entry.
-   **Implemented admin panel**: An admin user can now delete entries from the database and also confirm the addition of new entries.

### Українська:

-   **Змінено систему додавання нових записів**: коли користувач додає новий запис через спеціальну сторінку, він позначається певним параметром, що не дозволяє опублікувати цей запис, доки адміністратор не підтвердить його.
-   **Реалізовано адмінпанель**: користувач-адміністратор тепер може видаляти записи з бази даних, а також підтверджувати додавання нових записів.

---

## v1.1.5 - 26.01.2025

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
