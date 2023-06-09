let chapters = []
let flag = true
const fileContentDiv = document.getElementById('file-content');
let page = 1;
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  // 添加卷起高度
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var menu = document.getElementById("custom-menu");
  menu.style.display = 'block';
  menu.style.left = e.clientX + 'px';
  menu.style.top = scrollTop + e.clientY + 'px';

});

document.addEventListener('click', function (e) {
  if (['menu_input', 'menu'].includes(e.target.className)) return
  var menu = document.getElementById("custom-menu");
  menu.style.display = 'none';
});
window.addEventListener('scroll', function () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  localStorage.setItem('read_book_page', page)
  if (scrollTop + clientHeight >= scrollHeight && flag) {
    fileContentDiv.innerText += `第${++page}章 /n${chapters[page]}`
  }
})
let menu_input = document.getElementById('menu_input')
let menu_input_font_size = document.getElementById('menu_input_font_size')

function debounce(func, delay) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }
}
// 添加 input 事件监听器并绑定防抖函数
menu_input.addEventListener('input', debounce(function (e) {
  page = parseInt(e.target.value);
  flag = false
  fileContentDiv.innerText = ''
  setTimeout(() => {
    document.documentElement.scrollTop = 0
    fileContentDiv.innerText = `第${page}章/n` + chapters[page];
    flag = true
  }, 200)
}, 500));
menu_input_font_size.addEventListener('input', debounce(function (e) {
  fileContentDiv.style.fontSize = e.target.value + 'px';
}, 500));
const fileInput = document.getElementById('file-input');
const init_tools = document.querySelector('.init_tools');

function handleFileSelect() {

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    localStorage.setItem('read_book_page', page)
    const contents = event.target.result;
    const regex = /第\d+章/g;
    chapters = contents.split(regex);
    localStorage.setItem('chapters', JSON.stringify(chapters))
    init_tools.style.display = 'none'
    fileContentDiv.innerText = `第${page}章/n` + chapters[page];
  };
  reader.readAsText(file);
}
window.onload = function () {
  if (localStorage.getItem('chapters')) {
    chapters = JSON.parse(localStorage.getItem('chapters'))
    page = localStorage.getItem('read_book_page')
    init_tools.style.display = 'none'
    fileContentDiv.innerText = ''
    setTimeout(() => {
      fileContentDiv.innerText = `第${page}章/n` + chapters[page];
    })
  } else {
    init_tools.style.display = 'block'
  }

  let timerId;
  let body = document.querySelector('body')
  body.addEventListener('dblclick', () => {
    body.classList.add('drag')
    setTimeout(() => {
      body.classList.remove('drag')
    }, 2000);
  });

}
