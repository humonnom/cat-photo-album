export default function BreadCrumb({ $target, initialState, onClick }) {
  this.$element = document.createElement("nav");
  this.$element.className = "BreadCrumb";
  $target.appendChild(this.$element);

  this.state = initialState;

  const setEvent = () => {
    this.$element.addEventListener("click", ({ target }) => {
      if (target.matches(".Breadcrumb > div")) onClick(target.dataset.dir);
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
    const { dirs } = this.state;
    if (dirs && dirs.length > 0) {
      this.$element.innerHTML = `
                ${dirs
                  .map((dir) => {
                    return `<div data-dir="${dir}">${dir}</div>`;
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
