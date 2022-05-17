function checkAll(otherElement: string, allElement: string) {
  let notAll = document.querySelectorAll(`${otherElement}:not(${allElement})`);
  notAll.forEach(item => {
    (item as HTMLInputElement).checked = false;
  });

  let all = document.querySelector(allElement);
  (all as HTMLInputElement).checked = true;
}

function checkOthers(otherElement: string, allElement: string) {
  let all = document.querySelector(allElement);
  (all as HTMLInputElement).checked = false;

  let notAll = document.querySelectorAll(`${otherElement}:not(${allElement}):checked`);
  if (notAll.length === 0) {
    (all as HTMLInputElement).checked = true;
  }
}

export { checkAll, checkOthers };