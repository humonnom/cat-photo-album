export default function BreadCrumb({ $target, initialState, onClick }) {
  this.$element = document.createElement("nav");
  this.$element.className = "BreadCrumb";
  $target.appendChild(this.$element);

  this.state = initialState;

  const setEvent = () => {
    this.$element.addEventListener("click", ({ target }) => {
      if (target.matches(".Breadcrumb > div"))
        onClick({
          id: target.dataset.id,
          label: target.dataset.label,
        });
    });
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { dirList } = this.state;
    if (dirList && dirList.length > 0) {
      this.$element.innerHTML = `
                ${dirList
                  .map((dir) => {
                    return `<div data-id="${dir.id}" data-label="${dir.label}">${dir.label}</div>`;
                  })
                  .join("")}
            `;
    }
    setEvent();
  };

  this.render();
}

//TODO:  렌더링 된 경로 목록의 특정 아이템을 클릭하면, 해당 경로로 이동하도록 처리합니다.
{
  /* <nav class="Breadcrumb">
  <div>root</div>
  <div>노란고양이</div>
</nav> */
}
