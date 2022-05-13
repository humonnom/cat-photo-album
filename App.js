import BreadCrumb from "./Nav.js";
import Nodes from "./Nodes.js";
import Modal from "./Modal.js";
import Loading from "./Loading.js";
import { getData } from "./api.js";

export default function App({ $target }) {
  const DIR = "DIRECTORY";
  const FILE = "FILE";
  this.state = {
    dirs: ["root"],
    pageId: -1,
    nodeList: [],
    display: false,
    selectedFilePath: -1,
  };

  const renewData = async (id) => {
    loading.setState({ display: true });
    const data = await getData(id);
    console.log(data);
    this.setState({ nodeList: data });
    loading.setState({ display: false });
  };

  // 컴포넌트 생성
  const nav = new BreadCrumb({
    $target,
    initialState: { dirs: this.state.dirs },
  });
  const nodes = new Nodes({
    $target,
    initialState: {
      nodeList: this.state.nodeList,
      isRoot: this.state.dirs.length <= 1,
    },
    onClick: (node) => {
      const { dirs } = this.state;
      if (node.type === DIR) {
        dirs.push(node.name);
        this.setState({ dirs });
        renewData(node.id);
      } else {
        this.setState({ display: true });
        this.setState({ selectedFilePath: node.filePath });
      }
    },
    goBack: () => {
      const { dirs } = this.state;
      dirs.pop();
      this.setState({ dirs });
    },
  });

  //
  const modal = new Modal({
    $target,
    initialState: {
      display: false,
      selectedFilePath: "",
    },
    onClose: () => {
      this.setState({ display: false });
    },
  });
  const loading = new Loading({
    $target,
    initialState: {
      display: true,
    },
  });

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    console.log(this.state.dirs);
    nav.setState({ dirs: this.state.dirs });
    console.log(this.state.dirs.length <= 1);
    nodes.setState({
      nodeList: this.state.nodeList,
      isRoot: this.state.dirs.length <= 1,
    });
    modal.setState({
      display: this.state.display,
      selectedFilePath: this.state.selectedFilePath,
    });
  };
  renewData();
}
