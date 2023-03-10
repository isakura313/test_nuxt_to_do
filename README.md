# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

# Readme.md

- [x]  1.  Создать проект на Nuxt Использовать TypeScript и стейт-менеджер Pinia;
- [x]  1.  Сверстать страницы и разработать адаптивность под мобильные устройства;  *сделал только на iphone*
- [x]  Добавить валидацию в форме создания задачи со следующими условиями:
    1. Заголовок – обязательное поле;
    2. Текст – обязательное поле, минимум 3 символа;
    3. Дата окончания – обязательное поле, проверять корректность введенной даты, маска DD.MM.YYYY;  ***Здесь не стал делать проверку на года вниз***
- [x]  Все данные о задачах получаем/сохраняем в **[mockAPI](https://mockapi.io/); Есть -**

[](https://64037721302b5d671c502ee9.mockapi.io/api/deals)

- [x]  1.  На странице «О задаче» заголовок задачи подтягиваем в тег <title>, описание задачи в тег <meta>. Все должно отрабатывать на стороне сервера. Использовать  SSR.

***SSR  я включил***

Будет плюсом:

1. Возможность добавления даты окончания задачи через всплывающий календарь;
2. Возможность редактирования каждой задачи.

это имеется, но календарь неадаптивный. Но я его немного кастомизировал под стиль

Чтобы добавил, может быть поменял -

1) Добавил бы больше анимаций

2)  Не использовал бы асинхронные action, а запрашивал данные еще в компонентах - это могло быть дать выйгрыш в серверных запросов, надо посмотреть.