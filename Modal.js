export default function Modal({ $target, initialState, onClose }) {
  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  //event
  const setEvent = () => {
    window.addEventListener("keyup", ({ key }) => {
      if (key === "Escape") onClose();
    });
    this.$element.addEventListener(
      "click",
      ({ target, currentTarget }) => {
        if (target === currentTarget) onClose();
      },
      true
    );
  };

  this.render = () => {
    const { display, selectedFilePath } = this.state;
    if (display && selectedFilePath) {
      this.$element.style.display = "block";
      const imgSrc = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${selectedFilePath}`;
      console.log(imgSrc);
      this.$element.innerHTML = `
                <div class="content">
                    <img src=${imgSrc}>
                </div>
            `;
    } else {
      this.$element.style.display = "none";
    }
    setEvent();
  };
  this.render();
}
{
  /* <div class="Modal ImageViewer">
<div class="content">
  <img src="./assets/sample_image.jpg">
</div> */
}
