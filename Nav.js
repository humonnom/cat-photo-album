export default function BreadCrumb({ $target, initialState }) {
  this.$element = document.createElement("nav");
  this.$element.className = "BreadCrumb";
  $target.appendChild(this.$element);

  this.state = initialState;

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
                    return `<div>${dir}</div>`;
                  })
                  .join("")}
            `;
    }
  };

  this.render();
}

//TODO:  렌더링 된 경로 목록의 특정 아이템을 클릭하면, 해당 경로로 이동하도록 처리합니다.
