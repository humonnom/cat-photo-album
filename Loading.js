export default function Loading({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Modal Loading";
  $target.appendChild(this.$element);
  this.state = initialState;

  // 컴포넌트 생성

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    `;
    const { display } = this.state;
    if (display === true) {
      this.$element.style.display = "block";
    } else {
      this.$element.style.display = "none";
    }
  };
  this.render();
}
// <!--
// <div class="Modal Loading">
//   <div class="content">
//     <img src="./assets/nyan-cat.gif">
//   </div>
// </div>
