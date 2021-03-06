// Регулярные выражения

// const regexp = new RegExp('шаблон', 'gim') // Способ 1
// const regexp = /шаблон/gim // Способ 2

// Флаги:
// i - не учитывает регистр
// g - поиск всех совпадений
// m - многострочный поиск

// const str =
//   'Мы будем javascript использовать браузер в качестве окружения, но основное внимание будет уделяться именно самому языку JavaScript.';

// const regexp = /javascript/gim;

// const matches = str.match(regexp); // возвращает массив совпадений по шаблону
// const newStr = str.replace(regexp, 'C++').replace(/c\+\+/gim, 'JavaScript'); // - заменяет совпадения в str новое значение 2-м аргументом

// console.log(regexp.test(str)); // возвращает true если есть совпадение, в обратном случае - false
// console.log(newStr);

// Символьные классы
// \w - буква из латинского алфавита
// \W - любой символ кроме буквы латинского алфавита
// \d - цифра 0-9
// \D - не цифра
// \s - пробел, таб, новые строки
// \S - все, кроме \s
// \n - перенос строки
// . - любой

// const str1 = "sdv sa dv fbrg 45 dfgbfg 456 4 gh 60 gnh 5";
// const regexp1 = /\s\D\D\s/gim;

// console.log(str1.match(regexp1));

// Начало ^ и конец $ строки
// const str2 = "sd v sa dv fbrg 45 df gbfg 4 gh 60 gnh 5 RE";
// const regexp2 = /\s\D\D$/gim;

// console.log(str2.match(regexp2));

// Наборы []
// [...] - любой символ, который находится в [] (условно между ними оператор "или")
// [^...] - любой символ, кроме тех, которые находятся в []
// [а-яА-Я] -любой символ из кириллицы
// [0-9] == \d
// [^0-9] == \D
// [.+,] - любой из символов

// Скобочные группы (...)
// Позволяет поместить часть совпадений в отдельный элемент массива
// Позволяет применять квантификатор ко всей группе

// Квантификаторы
// {n} - добавляется к символу (/5{3}/gim == /555/gim)
// [01]{1} - только один, 0 или 1
// \s{0,1} - символ должен быть хотя бы 1
// [а-яА-Я]{1,6} - символы в количестве от 1 до 6

// {0,1} == ?
// {1,} == +
// {0,} == *

// const nums = "54 7 -89 5.45 -0.13";

// const regexp3 = /-?\d+(\.\d+)?/gim;

// console.log(nums.match(regexp3)); // [54, 7, -89, 5.45, -0.13]

// const str3 = "Номер телефона +375336638567"; // +375 (33) 663-85-67

// const regexpPhone = /(\+375){1}(\d{2})(\d{3})(\d{2})(\d{2})/gim;

// console.log(str3.replace(regexpPhone, "$1 ($2) $3-$4-$5"));
