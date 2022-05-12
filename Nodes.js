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

  //event
  const setEvent = () => {
    const { nodeList } = this.state;
    const $nodeElements = this.$element.querySelectorAll(".Node");
    if ($nodeElements && $nodeElements.length > 0) {
      $nodeElements.forEach(($node) => {
        $node.onclick = (e) => {
          const { nodeId, type } = $node.dataset;
          if (type === "backButton") goBack();
          else if (nodeId) onClick(nodeList.find((node) => node.id === nodeId));
        };
      });
    }
  };

  this.render = () => {
    const { nodeList, isRoot } = this.state;
    if (nodeList && nodeList.length > 0) {
      const contents = `
            ${nodeList
              .map((node) => {
                console.log(node.id);
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
    setEvent();
  };
  this.render();
}
