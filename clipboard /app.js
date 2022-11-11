let copyText = document.querySelector('.copy-text');

copyText.querySelector('button').addEventListener('click', async function () {
  let input = copyText.querySelector('input.text');

  await navigator.clipboard.writeText(input.value);
  copyText.classList.add('active');

  setTimeout(async function () {
    // await 처리 안하면 text에 값이 담기지 않는다..
    const text = await navigator.clipboard.readText();
    alert(`${text}가 복사되었어요.`);
    copyText.classList.remove('active');
  }, 2500);
})