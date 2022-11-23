









export default function init () {
  function Component() {
    const ele = document.createElement('h1');
    ele.textContent = 'Cook it!';
    document.body.appendChild(ele);
  }
  
  
  Component();
}