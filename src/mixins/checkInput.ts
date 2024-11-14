function checkAll(otherElement: string, allElement: string) {
  const notAll = document.querySelectorAll(`${otherElement}:not(${allElement})`);
  notAll.forEach(item => {
    (item as HTMLInputElement).checked = false;
  });

  const all = document.querySelector(allElement);
  (all as HTMLInputElement).checked = true;
}

function checkOthers(otherElement: string, allElement: string) {
  const all = document.querySelector(allElement);
  (all as HTMLInputElement).checked = false;

  const notAll = document.querySelectorAll(`${otherElement}:not(${allElement}):checked`);
  if (notAll.length === 0) {
    (all as HTMLInputElement).checked = true;
  }
}

export { checkAll, checkOthers };