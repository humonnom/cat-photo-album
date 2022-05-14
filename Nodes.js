export default function Nodes({ $target, initialState, onClick, goBack }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  const handleClick = ({ target }) => {
    const { nodeList } = this.state;
    const node = target.closest(".Node");
    if (!node) return;
    const { nodeId, type } = node.dataset;
    if (type === "backButton") goBack();
    else if (nodeId) onClick(nodeList.find((node) => node.id === nodeId));
  };

  this.render = () => {
    const { nodeList, isRoot } = this.state;
    if (nodeList) {
      const contents = `
            ${nodeList
              .map((node) => {
                const imgSrc =
                  node.type === "DIRECTORY"
                    ? "./assets/directory.png"
                    : "./assets/file.png";
                return `
                <div class="Node" data-node-id=${node.id}>
                    <img src=${imgSrc}>
                    <div>${node.name}</div>
                </div>
                `;
              })
              .join("")}
            `;
      const backButton = !isRoot
        ? `
             <div class="Node" data-type="backButton">
               <img src="./assets/prev.png">
             </div>
            `
        : "";
      this.$element.innerHTML = backButton + contents;
    }
  };
  this.$element.addEventListener("click", handleClick);
  this.render();
}
